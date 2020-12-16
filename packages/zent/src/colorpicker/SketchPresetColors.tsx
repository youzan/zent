import reactCSS from './helpers/reactcss';
import { Swatch } from './common';
import { PresetColors, ColorPickerType } from '.';

export type SketchPresetColorValue = string | { hex: string; source: string };
const prefixCls = 'zent-color-picker';

export interface ISketchPresetColors {
  colors: PresetColors;
  onClick(
    color: SketchPresetColorValue,
    e?: React.MouseEvent<HTMLElement>
  ): any;
  type: ColorPickerType;
}

const SketchPresetColors = ({ colors, onClick, type }: ISketchPresetColors) => {
  const styles: any = reactCSS(
    {
      default: {
        colors: {
          margin: '0 -10px',
          padding: '10px 0 0 10px',
          borderTop: '1px solid #eee',
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        },
        swatchWrap: {
          width: '16px',
          height: '16px',
          margin: '0 10px 10px 0',
        },
        swatch: {
          borderRadius: '3px',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
        },
      },
      'no-presets': {
        colors: {
          display: 'none',
        },
      },
    },
    {
      'no-presets': !colors || !colors.length,
    }
  );

  const handleClick = (hex, e) => {
    onClick(
      {
        hex,
        source: 'hex',
      },
      e
    );
  };

  if (type === 'simple') {
    return (
      <div className={`${prefixCls}-colors-select`}>
        {colors.map(color => (
          <div
            key={color}
            className={`${prefixCls}-colors-select__preview`}
            style={{ backgroundColor: color }}
            onClick={() => onClick(color)}
            title={color}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.colors}>
      {colors.map(colorObjOrString => {
        const c =
          typeof colorObjOrString === 'string'
            ? { color: colorObjOrString }
            : colorObjOrString;
        return (
          <div key={c.color} style={styles.swatchWrap}>
            <Swatch {...c} style={styles.swatch} onClick={handleClick} />
          </div>
        );
      })}
    </div>
  );
};

export default SketchPresetColors;
