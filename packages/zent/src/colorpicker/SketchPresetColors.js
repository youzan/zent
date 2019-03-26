import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from './helpers/reactcss';
import { Swatch } from './common';

const SketchPresetColors = ({ colors, onClick, prefix, type }) => {
  const styles = reactCSS(
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
      <div className={`${prefix}-colorpicker-colors-select`}>
        {colors.map(color => (
          <div
            key={color}
            className={`${prefix}-colorpicker-colors-select__preview`}
            style={{ backgroundColor: color }}
            onClick={() => onClick(color)}
            title={color}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.colors} className={`${prefix}-colorpicker-colors`}>
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

SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        title: PropTypes.string,
      }),
    ])
  ),
};

export default SketchPresetColors;
