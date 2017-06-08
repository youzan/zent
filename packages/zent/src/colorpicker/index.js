/**
 * This component is adapted from https://github.com/casesandberg/react-color.
 * See LICENSE for permissions.
 *
 * It's a modified Sketch color picker.
 */
import React, { Component } from 'react';
import Popover from 'popover';
import PropTypes from 'prop-types';
import ColorBoard from './ColorBoard';

class ColorPicker extends Component {
  state = {
    popVisible: false
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    showAlpha: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    showAlpha: false,
    onChange() {}
  };

  handleChange = color => {
    const { onChange, showAlpha } = this.props;
    const colorOutPut = showAlpha ? color.rgba : color.hex;
    onChange(colorOutPut);
  };

  handleVisibleChange = visible => {
    this.setState({
      popVisible: visible
    });
  };

  render() {
    const { color, showAlpha } = this.props;
    const { popVisible } = this.state;
    const backgroundColor = color;

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
          <div
            className={`zent-color-picker ${popVisible ? 'open' : ''}`}
            tabIndex={0}
          >
            <div className="zent-color-picker__text">
              <div
                className="zent-color-picker__preview"
                style={{ backgroundColor }}
              />
            </div>
          </div>
        </Popover.Trigger.Click>
        <Popover.Content>
          <ColorBoard
            color={color}
            disableAlpha={!showAlpha}
            onChange={this.handleChange}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
