import { useTranslation } from 'react-i18next';
import { FACE_HEX } from '../data/colors';

interface Props {
  topColor: string;
  frontColor: string;
  /** Compact inline mode (no "Hold:" prefix) for use on case cards */
  compact?: boolean;
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0 border border-black/20"
      style={{ backgroundColor: FACE_HEX[color] ?? '#888' }}
    />
  );
}

export function OrientationHint({ topColor, frontColor, compact = false }: Props) {
  const { t } = useTranslation();

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-[10px] text-ink-500">
        <Dot color={topColor} />
        <span>{t('orient.topShort')}</span>
        <span className="text-ink-700">·</span>
        <Dot color={frontColor} />
        <span>{t('orient.frontShort')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs text-ink-500 flex-wrap">
      <span className="text-ink-600">{t('orient.hold')}</span>
      <span className="flex items-center gap-1">
        <Dot color={topColor} />
        <span style={{ color: FACE_HEX[topColor] }}>{t(`colors.${topColor}`)}</span>
        <span>{t('orient.topLabel')}</span>
      </span>
      <span className="text-ink-700">·</span>
      <span className="flex items-center gap-1">
        <Dot color={frontColor} />
        <span style={{ color: FACE_HEX[frontColor] }}>{t(`colors.${frontColor}`)}</span>
        <span>{t('orient.frontLabel')}</span>
      </span>
    </div>
  );
}
