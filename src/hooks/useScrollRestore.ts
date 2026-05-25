import { useEffect, useLayoutEffect } from 'react';

if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const getMain = () => document.querySelector('main') as HTMLElement | null;
const sk = (key: string) => `scroll:${key}`;

// Module-level: survives StrictMode's double mount-unmount-remount cycle and
// component remounts. Unlike a ref, it isn't reset when the component recreates.
const pos: Record<string, number> = {};

/**
 * Why the listener lives in useLayoutEffect (not useEffect):
 *
 * When navigation causes the page content to shrink (e.g. LibraryPage →
 * CasePage), the browser auto-clamps scrollTop and fires a 'scroll' event.
 * That event arrives AFTER useLayoutEffect cleanup but BEFORE useEffect cleanup.
 * Putting the listener + its removal in useLayoutEffect ensures it is detached
 * before that clamping event, so it never overwrites the correct saved value.
 *
 * Why module-level pos (not a ref):
 *
 * React 18 StrictMode fires useLayoutEffect cleanup + setup twice on mount.
 * A ref starts at 0 on each fresh mount, so the StrictMode fake-unmount cleanup
 * would save 0 to sessionStorage before the restore effect has run — corrupting
 * the stored position. A module-level object persists across that cycle: the
 * setup seeds it from sessionStorage once, and subsequent cleanup/setup pairs
 * always see the correct value.
 */
export function useScrollRestore(key: string) {
  useLayoutEffect(() => {
    const main = getMain();
    if (!main) return;

    // Seed from sessionStorage on first encounter (pos[key] not yet set).
    if (pos[key] === undefined) {
      pos[key] = Number(sessionStorage.getItem(sk(key)) ?? 0);
    }

    const onScroll = () => { pos[key] = main.scrollTop; };
    main.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      main.removeEventListener('scroll', onScroll); // detach before auto-clamp
      sessionStorage.setItem(sk(key), String(pos[key]));
    };
  }, [key]);

  // Restore after two rAFs: first waits for React's commit, second for layout.
  useEffect(() => {
    const main = getMain();
    if (!main) return;
    const target = pos[key] ?? Number(sessionStorage.getItem(sk(key)) ?? 0);
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        main.scrollTop = target;
      });
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [key]);
}
