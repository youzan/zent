import React, { Component } from 'react';
import Popover from 'popover';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import ColorPicker from './Sketch';
import colorTransfer from './helpers/color';

class PopColorPicker extends Component {
  state = {
    popVisible: false
  };

  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: '',
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
          <ColorPicker color={color} onChange={this.handleChange} />
        </Popover.Content>
      </Popover>
    );
  }
}

export { ColorPicker, PopColorPicker };

export default PopColorPicker;
