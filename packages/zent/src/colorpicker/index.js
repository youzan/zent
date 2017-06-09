/**
 * This component is adapted from https://github.com/casesandberg/react-color.
 * See LICENSE for permissions.
 *
 * It's a modified Sketch color picker.
 */
import React, { Component, PureComponent } from 'react';
import Popover from 'popover';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ColorBoard from './ColorBoard';

class ColorPicker extends (PureComponent || Component) {
  state = {
    popVisible: false
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    showAlpha: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    showAlpha: false,
    onChange() {},
    className: '',
    wrapperClassName: '',
    prefix: 'zent'
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
    const {
      color,
      showAlpha,
      prefix,
      className,
      wrapperClassName
    } = this.props;
    const { popVisible } = this.state;
    const openClassName = popVisible ? 'open' : '';
    const backgroundColor = color;

    return (
      <Popover
        className={cx(`${prefix}-color-picker-popover`, className)}
        position={Popover.Position.AutoBottomLeft}
        display="inline"
        cushion={5}
        visible={popVisible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Popover.Trigger.Click>
          <div
            className={cx(
              `${prefix}-color-picker`,
              wrapperClassName,
              openClassName
            )}
            tabIndex={0}
          >
            <div className={`${prefix}-color-picker__text`}>
              <div
                className={`${prefix}-color-picker__preview`}
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
            prefix={prefix}
          />
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;
