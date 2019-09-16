import * as React from 'react';
import nextFrame from '../nextFrame';

function applyHeight(el: HTMLDivElement, height: number | string) {
  if (typeof height === 'number') {
    el.style.height = `${height}px`;
  } else {
    el.style.height = height;
  }
}

export interface IAnimationHeightProps {
  appear?: boolean;
  duration: number;
  easing: string;
  className?: string;
  style?: React.CSSProperties;
  overflow: 'hidden' | 'scroll' | 'auto';
  height: number | string;
}

export default class AnimationHeight extends React.Component<
  IAnimationHeightProps
> {
  static defaultProps = {
    duration: 200,
    easing: 'ease',
    overflow: 'hidden',
  };

  private ref = React.createRef<HTMLDivElement>();
  private timer: number | null = null;

  componentDidMount() {
    const { appear, height, duration } = this.props;
    const el = this.ref.current as HTMLDivElement;
    if (appear && height === 'auto') {
      el.style.height = '0px';
      nextFrame(() => {
        if (this.props.height === height) {
          el.style.height = `${el.scrollHeight}px`;
          this.timer = window.setTimeout(() => {
            this.timer = null;
            if (this.props.height === height) {
              el.style.height = 'auto';
            }
          }, duration);
        }
      });
    } else {
      applyHeight(el, height);
    }
  }

  componentDidUpdate(prevProps: IAnimationHeightProps) {
    const { height, duration } = this.props;
    if (prevProps.height === height) {
      return;
    }
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const el = this.ref.current as HTMLDivElement;
    if (prevProps.height === 'auto') {
      el.style.height = `${el.scrollHeight}px`;
      nextFrame(() => {
        if (this.props.height === height) {
          applyHeight(el, height);
        }
      });
    } else if (height === 'auto') {
      el.style.height = `${el.scrollHeight}px`;
      this.timer = window.setTimeout(() => {
        this.timer = null;
        el.style.height = 'auto';
      }, duration);
    } else {
      applyHeight(el, height);
    }
  }

  render() {
    const {
      duration,
      className,
      style,
      easing,
      overflow,
      children,
    } = this.props;

    return (
      <div
        ref={this.ref}
        className={className}
        style={{
          ...style,
          transition: `height ${duration}ms ${easing}`,
          overflow,
        }}
      >
        {children}
      </div>
    );
  }
}
