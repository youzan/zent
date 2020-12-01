import { Component, createRef } from 'react';
import cx from 'classnames';
import Icon, { IconType } from '../icon';

const NO_STYLE = {};
const HIDDEN_STYLE = {
  opacity: 0,
};

export interface IAvatarProps {
  shape: 'circle' | 'square';
  size: 'small' | 'default' | 'large' | number;
  icon?: IconType;
  src?: string;
  children?: string;
  bordered: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export interface IAvatarState {
  textScale: number;
  textReady: boolean;
  prevChildren?: string;
}

export class Avatar extends Component<IAvatarProps, IAvatarState> {
  static defaultProps = {
    shape: 'circle',
    size: 'default',
    bordered: false,
  };

  textNodeRef = createRef<HTMLSpanElement>();
  avatarNodeRef = createRef<HTMLSpanElement>();

  state = {
    textScale: 1,
    textReady: false,
  };

  render() {
    const {
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
    const useString = !!children;
    const cls = cx('zent-avatar', className, {
      'zent-avatar--size-large': size === 'large',
      'zent-avatar--size-default': size === 'default',
      'zent-avatar--size-small': size === 'small',
      'zent-avatar--shape-circle': shape === 'circle',
      'zent-avatar--shape-square': shape === 'square',
      'zent-avatar--type-icon': !!icon,
      'zent-avatar--type-image': useImage,
      'zent-avatar--type-string': useString,
      'zent-avatar--bordered': bordered,
    });

    if (useImage) {
      return (
        <span style={style} className={cls}>
          <img className="zent-avatar-image" src={src} alt="avatar" />
        </span>
      );
    }

    if (icon) {
      return (
        <span style={style} className={cls}>
          <Icon type={icon} />
        </span>
      );
    }

    const { textScale, textReady } = this.state;
    const textNode = this.textNodeRef.current;
    let textStyle = NO_STYLE;

    if (!textReady || !textNode) {
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

    const avatarStyle =
      typeof size === 'number'
        ? {
            width: `${size}px`,
            height: `${size}px`,
            lineHeight: `${size}px`,
            ...style,
          }
        : style;

    return (
      <span style={avatarStyle} className={cls} ref={this.avatarNodeRef}>
        <span
          className="zent-avatar-string"
          style={textStyle}
          ref={this.textNodeRef}
        >
          {children}
        </span>
      </span>
    );
  }

  componentDidMount() {
    this.updateTextScale();
  }

  static getDerivedStateFromProps(
    { children }: IAvatarProps,
    { prevChildren }: IAvatarState
  ): Partial<IAvatarState> | null {
    if (children !== prevChildren) {
      return {
        textReady: false,
        prevChildren: children,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: IAvatarProps) {
    if (prevProps.children !== this.props.children) {
      this.updateTextScale();
    }
  }

  updateTextScale() {
    const { children } = this.props;

    if (children) {
      const scale = fitText(
        this.avatarNodeRef.current,
        this.textNodeRef.current
      );

      this.setState({
        textScale: scale,
        textReady: true,
      });
    }
  }
}

function fitText(
  containerNode: HTMLSpanElement | null,
  textNode: HTMLSpanElement | null
) {
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
