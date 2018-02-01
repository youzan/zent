import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import color from '../helpers/color';

export const ColorWrap = Picker => {
  class ColorPicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ...color.toState(props.color, 0),
        visible: props.display,
      };
      this.debounce = debounce((fn, data, event) => {
        fn(data, event);
      }, 100);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        ...color.toState(nextProps.color, this.state.oldHue),
        visible: nextProps.display,
      });
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

  ColorPicker.defaultProps = {
    color: {
      h: 250,
      s: 0.5,
      l: 0.2,
      a: 1,
    },
  };

  return ColorPicker;
};

export default ColorWrap;
