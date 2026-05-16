import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Phase = 'watch' | 'mimic' | 'recall' | 'recognise' | 'fluent';
export const PHASE_ORDER: Phase[] = ['watch', 'mimic', 'recall', 'recognise', 'fluent'];

export interface CaseMastery {
  phase: Phase;
  successes: number;
  failures: number;
  lastSeen: number; // epoch ms
  /** SM-2-lite: ease factor (default 2.5). */
  ease: number;
  /** SM-2-lite: due-by epoch ms. */
  dueAt: number;
  /** Days interval, used by SM-2-lite. */
  intervalDays: number;
}

interface MasteryState {
  byCase: Record<string, CaseMastery>;
  lessonsCompleted: Record<string, boolean>;
  /** Move a case forward to the next phase (or mark fluent). */
  advance: (caseId: string) => void;
  /** Record a successful drill (correct recognition or fluent execution). */
  success: (caseId: string) => void;
  /** Record a failure. */
  failure: (caseId: string) => void;
  /** Mark a prose lesson done. */
  completeLesson: (lessonId: string) => void;
  /** Reset everything. */
  reset: () => void;
}

const DAY = 24 * 60 * 60 * 1000;

function initial(): CaseMastery {
  return {
    phase: 'watch',
    successes: 0,
    failures: 0,
    lastSeen: 0,
    ease: 2.5,
    dueAt: 0,
    intervalDays: 0,
  };
}

function sm2(m: CaseMastery, ok: boolean): CaseMastery {
  // Simplified SM-2: 3-grade collapse (ok = good; miss = again).
  let { ease, intervalDays } = m;
  if (!ok) {
    intervalDays = 0;
    ease = Math.max(1.3, ease - 0.2);
  } else if (intervalDays === 0) {
    intervalDays = 1;
  } else if (intervalDays === 1) {
    intervalDays = 3;
  } else {
    intervalDays = Math.round(intervalDays * ease);
  }
  return {
    ...m,
    ease,
    intervalDays,
    dueAt: Date.now() + intervalDays * DAY,
    lastSeen: Date.now(),
    successes: m.successes + (ok ? 1 : 0),
    failures: m.failures + (ok ? 0 : 1),
  };
}

export const useMastery = create<MasteryState>()(
  persist(
    (set) => ({
      byCase: {},
      lessonsCompleted: {},
      advance: (caseId) =>
        set((s) => {
          const cur = s.byCase[caseId] ?? initial();
          const idx = PHASE_ORDER.indexOf(cur.phase);
          const next = PHASE_ORDER[Math.min(PHASE_ORDER.length - 1, idx + 1)];
          return { byCase: { ...s.byCase, [caseId]: { ...cur, phase: next, lastSeen: Date.now() } } };
        }),
      success: (caseId) =>
        set((s) => {
          const cur = s.byCase[caseId] ?? initial();
          return { byCase: { ...s.byCase, [caseId]: sm2(cur, true) } };
        }),
      failure: (caseId) =>
        set((s) => {
          const cur = s.byCase[caseId] ?? initial();
          return { byCase: { ...s.byCase, [caseId]: sm2(cur, false) } };
        }),
      completeLesson: (lessonId) =>
        set((s) => ({ lessonsCompleted: { ...s.lessonsCompleted, [lessonId]: true } })),
      reset: () => set({ byCase: {}, lessonsCompleted: {} }),
    }),
    { name: 'scube.mastery' },
  ),
);

export function isLearned(m: CaseMastery | undefined): boolean {
  return !!m && m.phase === 'fluent';
}

export function isDue(m: CaseMastery | undefined): boolean {
  if (!m) return false;
  return m.dueAt > 0 && m.dueAt <= Date.now() && m.phase !== 'watch';
}
