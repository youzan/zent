import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import isFunction from 'lodash-es/isFunction';
import Icon from '../icon';

// 支持的color style
const colorTypes = ['red', 'green', 'yellow', 'blue', 'darkgreen', 'grey'];

export interface ITagProps {
  color?: string;
  outline?: boolean;
  rounded?: boolean;
  closable?: boolean;
  onClose?: React.MouseEventHandler<HTMLElement>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  borderColor?: string;
  bgColor?: string;
  fontColor?: string;
  closeButtonFontColor?: string;
  style?: React.CSSProperties;
  className?: string;
  prefix?: string;
}

export class Tag extends Component<ITagProps> {
  static defaultProps = {
    color: 'red',
    outline: false,
    rounded: true,
    closable: false,
    className: '',
    prefix: 'zent',
  };

  state = {
    visible: true,
  };

  onClose = e => {
    e.persist();
    const cb = () => {
      // onClose是在*关闭以后*被调用的
      const { onClose } = this.props;
      if (isFunction(onClose)) {
        onClose(e);
      }
    };

    const { onVisibleChange } = this.props;
    if (this.isControlled() && isFunction(onVisibleChange)) {
      onVisibleChange(false);
      cb();
    } else {
      this.setState(
        {
          visible: false,
        },
        cb
      );
    }
  };

  isControlled() {
    const { closable, visible, onVisibleChange } = this.props;
    const isVisibleBoolean = visible === false || visible === true;

    if (closable && isVisibleBoolean && isFunction(onVisibleChange)) {
      return true;
    }

    if (!closable && isVisibleBoolean) {
      return true;
    }
  }

  render() {
    const visible = this.isControlled()
      ? this.props.visible
      : this.state.visible;
    if (!visible) {
      return null;
    }

    const {
      color,
      outline,
      rounded,
      borderColor,
      bgColor,
      fontColor,
      closeButtonFontColor,
      closable,
      children,
      className,
      prefix,
      style,
    } = this.props;
    const colorPart = colorTypes.indexOf(color) >= 0 ? `-${color}` : '';
    const outlinePart = outline ? '-outline' : '';
    const containerCls = cx(
      `${prefix}-tag`,
      `${prefix}-tag-style${colorPart}${outlinePart}`,
      {
        [className]: !!className,
        [`${prefix}-tag-rounded`]: rounded,
        [`${prefix}-tag-closable`]: closable,
      }
    );

    let styles = style || {};
    if (colorTypes.indexOf(color) < 0) {
      styles.borderColor = color;
      outline ? (styles.color = color) : (styles.background = color);
    }
    borderColor && (styles.borderColor = borderColor);
    bgColor && (styles.background = bgColor);
    fontColor && (styles.color = fontColor);
    const closeButtonStyle = closeButtonFontColor
      ? {
          color: closeButtonFontColor,
        }
      : undefined;

    return (
      <div className={containerCls} style={styles}>
        <div className={`${prefix}-tag-content`}>{children}</div>
        {closable && (
          <Icon
            type="close"
            className={`${prefix}-tag-close-btn`}
            onClick={this.onClose}
            style={closeButtonStyle}
          />
        )}
      </div>
    );
  }
}

export default Tag;
