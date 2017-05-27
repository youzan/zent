import React, { Component } from 'react';
import Popover from 'popover';
import PropTypes from 'prop-types';
import ColorBorad from './ColorBorad';

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
    const { onChange, showAlpha } = this.props;
    const colorOut = showAlpha ? color.rgba : color.hex;
    onChange(colorOut);
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
          <ColorBorad
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
