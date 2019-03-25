import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import isNumber from 'lodash-es/isNumber';
import Icon, { IconType } from '../icon';

const NO_STYLE = {};
const HIDDEN_STYLE = {
  opacity: 0,
};

export interface IAvatarProps {
  shape?: 'circle' | 'square';
  size?: 'small' | 'default' | 'large' | number;
  icon?: IconType;
  src?: string;
  children?: string;
  bordered?: boolean;
  style?: React.CSSProperties;
  className?: string;
  prefix?: string;
}

export class Avatar extends Component<IAvatarProps> {
  static defaultProps = {
    shape: 'circle',
    size: 'default',
    bordered: false,
    prefix: 'zent',
  };

  textNode: HTMLSpanElement | null;
  avatarNode: HTMLSpanElement | null;

  state = {
    textScale: 1,
    textReady: false,
  };

  render() {
    const {
      prefix,
      size,
      shape,
      src,
      icon,
      children,
      bordered,
      style,
      className,
    } = this.props;
    const useImage = !!src;
    const useIcon = !!icon;
    const useString = !!children;
    const cls = cx(`${prefix}-avatar`, className, {
      [`${prefix}-avatar--size-large`]: size === 'large',
      [`${prefix}-avatar--size-default`]: size === 'default',
      [`${prefix}-avatar--size-small`]: size === 'small',
      [`${prefix}-avatar--shape-circle`]: shape === 'circle',
      [`${prefix}-avatar--shape-square`]: shape === 'square',
      [`${prefix}-avatar--type-icon`]: useIcon,
      [`${prefix}-avatar--type-image`]: useImage,
      [`${prefix}-avatar--type-string`]: useString,
      [`${prefix}-avatar--bordered`]: bordered,
    });

    if (useImage) {
      return (
        <span style={style} className={cls}>
          <img className={`${prefix}-avatar-image`} src={src} alt="avatar" />
        </span>
      );
    }

    if (useIcon) {
      return (
        <span style={style} className={cls}>
          <Icon type={icon} />
        </span>
      );
    }

    const { textScale, textReady } = this.state;
    const { textNode } = this;
    let textStyle = NO_STYLE;

    if (!textReady) {
      textStyle = HIDDEN_STYLE;
    } else if (textScale === 1) {
      textStyle = NO_STYLE;
    } else {
      const textTransformString = `scale(${textScale})`;
      textStyle = {
        msTransform: textTransformString,
        WebkitTransform: textTransformString,
        MozTransform: textTransformString,
        transform: textTransformString,
        position: 'absolute',
        display: 'inline-block',
        left: `calc(50% - ${Math.floor(textNode.offsetWidth / 2)}px)`,
      };
    }

    const avatarStyle = isNumber(size)
      ? {
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
          ...style,
        }
      : style;

    return (
      <span style={avatarStyle} className={cls} ref={this.saveAvatarNode}>
        <span
          className={`${prefix}-avatar-string`}
          style={textStyle}
          ref={this.saveTextNode}
        >
          {children}
        </span>
      </span>
    );
  }

  componentDidMount() {
    this.updateTextScale();
  }

  componentWillReceiveProps(nextProps) {
    // Hide text when text changes
    if (nextProps.children !== this.props.children) {
      this.setState({
        textReady: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.updateTextScale();
    }
  }

  updateTextScale() {
    const { children } = this.props;

    if (children) {
      const scale = fitText(this.avatarNode, this.textNode);

      // eslint-disable-next-line
      this.setState({
        textScale: scale,
        textReady: true,
      });
    }
  }

  saveAvatarNode = node => {
    this.avatarNode = node;
  };

  saveTextNode = node => {
    this.textNode = node;
  };
}

function fitText(containerNode, textNode) {
  if (!containerNode || !textNode) {
    return 1;
  }

  // When using with transforms, getBoundingClientRect().width and offsetWidth
  // returns different results.
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  const containerWidth = containerNode.getBoundingClientRect().width;
  const textWidth = textNode.offsetWidth;

  // Leave some space
  const visualWidth = containerWidth - 6;

  if (visualWidth > textWidth) {
    return 1;
  }

  return visualWidth / textWidth;
}

export default Avatar;
