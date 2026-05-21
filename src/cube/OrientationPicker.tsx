import { useTranslation } from 'react-i18next';
import { FACE_HEX, ALL_COLORS, sideFaces } from '../data/colors';
import { useSettings } from '../store/settings';

function ColorDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full shrink-0 border border-black/20"
      style={{ backgroundColor: FACE_HEX[color] ?? '#888' }}
    />
  );
}

export function OrientationPicker() {
  const { t } = useTranslation();
  const { topColor, frontColor, setTopColor, setFrontColor } = useSettings();
  const fronts = sideFaces(topColor);
  const validFront = fronts.includes(frontColor) ? frontColor : fronts[0];

  return (
    <div className="flex items-center gap-3 py-2 flex-wrap">
      <span className="text-xs text-ink-500 shrink-0">{t('orient.holdWith')}</span>

      <label className="flex items-center gap-1.5 cursor-pointer">
        <ColorDot color={topColor} />
        <select
          value={topColor}
          onChange={(e) => setTopColor(e.target.value)}
          className="bg-ink-800 border border-ink-700 rounded px-2 py-0.5 text-xs text-ink-200 cursor-pointer"
        >
          {ALL_COLORS.map((c) => (
            <option key={c} value={c}>{t(`colors.${c}`)}</option>
          ))}
        </select>
        <span className="text-[10px] text-ink-500">{t('orient.topLabel')}</span>
      </label>

      <label className="flex items-center gap-1.5 cursor-pointer">
        <ColorDot color={validFront} />
        <select
          value={validFront}
          onChange={(e) => setFrontColor(e.target.value)}
          className="bg-ink-800 border border-ink-700 rounded px-2 py-0.5 text-xs text-ink-200 cursor-pointer"
        >
          {fronts.map((c) => (
            <option key={c} value={c}>{t(`colors.${c}`)}</option>
          ))}
        </select>
        <span className="text-[10px] text-ink-500">{t('orient.frontLabel')}</span>
      </label>
    </div>
  );
}
