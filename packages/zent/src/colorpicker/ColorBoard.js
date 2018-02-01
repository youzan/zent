import React from 'react';
import cx from 'classnames';
import reactCSS from './helpers/reactcss';
import { ColorWrap, Saturation, Hue, Alpha, Checkboard } from './common';
import SketchFields from './SketchFields';
import SketchPresetColors from './SketchPresetColors';

const Sketch = ({
  width,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  showAlpha,
  presetColors,
  renderers,
  prefix,
  className,
  type,
}) => {
  const styles = reactCSS(
    {
      default: {
        picker: {
          width,
          padding: '10px 10px 0',
          boxSizing: 'initial',
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
        },
        saturation: {
          width: '100%',
          paddingBottom: '75%',
          position: 'relative',
          overflow: 'hidden',
        },
        Saturation: {
          radius: '3px',
          shadow:
            'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
        },
        controls: {
          display: 'flex',
        },
        sliders: {
          padding: '4px 0',
          flex: '1',
        },
        color: {
          width: '24px',
          height: '24px',
          position: 'relative',
          marginTop: '4px',
          marginLeft: '4px',
          borderRadius: '3px',
        },
        activeColor: {
          absolute: '0px 0px 0px 0px',
          borderRadius: '2px',
          background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
          boxShadow:
            'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
        },
        hue: {
          position: 'relative',
          height: '10px',
          overflow: 'hidden',
        },
        Hue: {
          radius: '2px',
          shadow:
            'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
        },
        alpha: {
          position: 'relative',
          height: '10px',
          marginTop: '4px',
          overflow: 'hidden',
        },
        Alpha: {
          radius: '2px',
          shadow:
            'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
        },
      },
      showAlpha: {
        color: {
          height: '10px',
        },
        hue: {
          height: '10px',
        },
        alpha: {
          display: 'none',
        },
      },
    },
    { showAlpha: !showAlpha }
  );

  return (
    <div
      style={styles.picker}
      className={cx(`${prefix}-colorpicker-board`, className)}
    >
      <div style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div style={styles.controls} className="flexbox-fix">
        <div style={styles.sliders}>
          <div style={styles.hue}>
            <Hue style={styles.Hue} hsl={hsl} onChange={onChange} />
          </div>
          <div style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </div>
        </div>
        <div style={styles.color}>
          <Checkboard />
          <div style={styles.activeColor} />
        </div>
      </div>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        showAlpha={showAlpha}
        prefix={prefix}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={onChange}
        prefix={prefix}
        type={type}
      />
    </div>
  );
};

Sketch.defaultProps = {
  presetColors: [
    '#FFFFFF',
    '#F8F8F8',
    '#F2F2F2',
    '#999999',
    '#444444',
    '#FF4444',
    '#FF6500',
    '#FF884D',
    '#FFCD00',
    '#3FBD00',
    '#3FBC87',
    '#00CD98',
    '#5197FF',
    '#BADCFF',
    '#FFEFB8',
  ],
  width: 200,
  showAlpha: false,
  prefix: 'zent',
  className: '',
};

const ColorBoard = ColorWrap(Sketch);

export default ColorBoard;
