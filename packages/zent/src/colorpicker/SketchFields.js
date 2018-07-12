import React, { PureComponent } from 'react';
import reactCSS from './helpers/reactcss';
import color from './helpers/color';

import { EditableInput } from './common';

export default class SketchFileds extends PureComponent {
  state = {
    hexColor: this.props.hex.replace('#', ''),
  };

  get styles() {
    const { showAlpha } = this.props;

    return reactCSS(
      {
        default: {
          fields: {
            display: 'flex',
            paddingTop: '4px',
          },
          single: {
            flex: '1',
            paddingLeft: '6px',
          },
          alpha: {
            flex: '1',
            paddingLeft: '6px',
          },
          double: {
            flex: '2',
          },
          input: {
            width: '80%',
            padding: '4px 10% 3px',
            border: 'none',
            boxShadow: 'inset 0 0 0 1px #ccc',
            fontSize: '11px',
          },
          label: {
            display: 'block',
            textAlign: 'center',
            fontSize: '11px',
            color: '#222',
            paddingTop: '3px',
            paddingBottom: '4px',
            textTransform: 'capitalize',
          },
        },
        showAlpha: {
          alpha: {
            display: 'none',
          },
        },
      },
      { showAlpha: !showAlpha }
    );
  }

  confirmHexChange = e => {
    const { onChange } = this.props;
    const { hexColor } = this.state;
    color.isValidHex(hexColor) &&
      onChange(
        {
          hex: hexColor,
          source: 'hex',
        },
        e
      );
  };

  handleHexChange = data => {
    this.setState({
      hexColor: data.hex,
    });
  };

  handleChange = (data, e) => {
    const { rgb, hsl, onChange } = this.props;

    if (data.r || data.g || data.b) {
      onChange(
        {
          r: data.r || rgb.r,
          g: data.g || rgb.g,
          b: data.b || rgb.b,
          a: rgb.a,
          source: 'rgb',
        },
        e
      );
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }

      data.a = data.a / 100;
      onChange(
        {
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: data.a,
          source: 'rgb',
        },
        e
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    const nextHexColor = nextProps.hex.replace('#', '');
    if (this.state.hexColor !== nextHexColor) {
      this.setState({
        hexColor: nextHexColor,
      });
    }
  }

  render() {
    const { prefix, rgb } = this.props;
    const { hexColor } = this.state;
    const styles = this.styles;
    return (
      <div style={styles.fields} className={`${prefix}-colorpicker-input`}>
        <div style={styles.double}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="hex"
            value={hexColor}
            onBlur={this.confirmHexChange}
            onPressEnter={this.confirmHexChange}
            onChange={this.handleHexChange}
          />
        </div>
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="r"
            value={rgb.r}
            onChange={this.handleChange}
            dragMax="255"
          />
        </div>
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="g"
            value={rgb.g}
            onChange={this.handleChange}
            dragMax="255"
          />
        </div>
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="b"
            value={rgb.b}
            onChange={this.handleChange}
            dragMax="255"
          />
        </div>
        <div style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={Math.round(rgb.a * 100)}
            onChange={this.handleChange}
            dragMax="100"
          />
        </div>
      </div>
    );
  }
}
