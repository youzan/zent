import { Component, createRef } from 'react';

import { runInNextFrame } from '../nextFrame';

function applyHeight(el: HTMLDivElement, height: number | string) {
  if (typeof height === 'number') {
    el.style.height = `${height}px`;
  } else {
    el.style.height = height;
  }
}

export interface IAnimateHeightProps {
  height: number | string;
  appear?: boolean;
  duration?: number;
  easing?: string;
  className?: string;
  style?: React.CSSProperties;
  overflow: 'hidden' | 'scroll' | 'auto';
}

export class AnimateHeight extends Component<IAnimateHeightProps> {
  static defaultProps = {
    appear: false,
    duration: 200,
    easing: 'ease',
    overflow: 'hidden',
  };

  private ref = createRef<HTMLDivElement>();
  private timer: number | null = null;

  componentDidMount() {
    const { appear, height, duration } = this.props;
    const el = this.ref.current;
    if (appear && height === 'auto') {
      el.style.height = '0px';
      runInNextFrame(() => {
        if (this.props.height === height) {
          el.style.height = `${el.offsetHeight}px`;
          this.timer = setTimeout(() => {
            this.timer = null;
            if (this.props.height === height) {
              el.style.height = 'auto';
            }
          }, duration) as unknown as number;
        }
      });
    } else {
      applyHeight(el, height);
    }
  }

  componentDidUpdate(prevProps: IAnimateHeightProps) {
    const { height, duration } = this.props;
    if (prevProps.height === height) {
      return;
    }
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const el = this.ref.current;
    if (prevProps.height === 'auto') {
      el.style.height = `${el.offsetHeight}px`;
      runInNextFrame(() => {
        if (this.props.height === height) {
          applyHeight(el, height);
        }
      });
    } else if (height === 'auto') {
      // save current height
      const prevHeight = el.offsetHeight;

      // get target height
      el.style.height = 'auto';
      const newHeight = el.offsetHeight;

      // reset height to current height
      el.style.height = `${prevHeight}px`;
      runInNextFrame(() => {
        // animate to target height('auto')
        el.style.height = `${newHeight}px`;

        // reset height style to 'auto' after animation
        this.timer = setTimeout(() => {
          this.timer = null;
          if (this.props.height === height) {
            el.style.height = height;
          }
        }, duration) as unknown as number;
      });
    } else {
      applyHeight(el, height);
    }
  }

  render() {
    const { duration, className, style, easing, overflow, children } =
      this.props;

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
