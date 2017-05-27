import React, { Component } from 'react';
import Popover from 'popover';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import colorTransfer from './helpers/color';
import ColorBorad from './Sketch';

class ColorPicker extends Component {
  state = {
    popVisible: false
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    className: PropTypes.string,
    showAlpha: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
    showAlpha: false,
    onChange() {}
  };

  handleChange = color => {
    const { onChange } = this.props;
    onChange(color);
  };

  handleVisibleChange = visible => {
    this.setState({
      popVisible: visible
    });
  };

  render() {
    const { color } = this.props;
    const { popVisible } = this.state;
    const backgroundColor = isObject(color)
      ? colorTransfer.toState(color).hex
      : color;

    return (
      <Popover
        className="zent-color-picker-popover"
        position={Popover.Position.BottomLeft}
        display="inline"
        cushion={5}
        visible={popVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Popover.Trigger.Click>
          <div className={`zent-color-picker ${popVisible ? 'open' : ''}`}>
            <div className="zent-color-picker__text">
              <div
                className="zent-color-picker__preview"
                style={{ backgroundColor }}
              />
            </div>
          </div>
        </Popover.Trigger.Click>
        <Popover.Content>
          <ColorBorad color={color} onChange={this.handleChange} />
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
