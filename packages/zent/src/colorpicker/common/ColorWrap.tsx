import * as React from 'react';
import { Component } from 'react';
import debounce from 'lodash-es/debounce';
import color from '../helpers/color';

export const ColorWrap = Picker => {
  class ColorPicker extends Component<any, any> {
    static defaultProps = {
      color: {
        h: 250,
        s: 0.5,
        l: 0.2,
        a: 1,
      },
    };

    debounce = debounce((fn, data, event) => {
      fn(data, event);
    }, 100);

    constructor(props) {
      super(props);
      this.state = {
        ...color.toState(props.color, 0),
        visible: props.display,
      };
    }

    static getDerivedStateFromProps(props, state) {
      return {
        ...color.toState(props.color, state.oldHue),
        visible: props.display,
      };
    }

    handleChange = (data, event) => {
      const isValidColor = color.simpleCheckForValidColor(data);
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue);
        this.setState(colors);

        // 外部传入回调
        this.props.onChangeComplete &&
          this.debounce(this.props.onChangeComplete, colors, event);
        this.props.onChange && this.props.onChange(colors, event);
      }
    };

    render() {
      return (
        <Picker {...this.props} {...this.state} onChange={this.handleChange} />
      );
    }
  }

  return ColorPicker as React.ComponentClass<any, any>;
};

export default ColorWrap;
