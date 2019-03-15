import * as React from 'react';
import { Component, createRef } from 'react';
import throttle from 'lodash-es/throttle';
import reactCSS from '../helpers/reactcss';
import * as saturation from '../helpers/saturation';

/**
 * 调色盘
 */
export default class Saturation extends Component<any, any> {
  containerRef = createRef<HTMLDivElement>();
  throttle = throttle((fn, data, e) => {
    fn(data, e);
  }, 50);

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e, skip?: boolean) => {
    this.throttle(
      this.props.onChange,
      saturation.calculateChange(
        e,
        skip,
        this.props,
        this.containerRef.current
      ),
      e
    );
  };

  handleMouseDown = e => {
    this.handleChange(e, true);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const { color, white, black, pointer, circle } =
      this.props.style || ({} as any);
    const styles: any = reactCSS(
      {
        default: {
          color: {
            absolute: '0px 0px 0px 0px',
            background: `hsl(${this.props.hsl.h},100%, 50%)`,
            borderRadius: this.props.radius,
          },
          white: {
            absolute: '0px 0px 0px 0px',
            background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
          },
          black: {
            absolute: '0px 0px 0px 0px',
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
            boxShadow: this.props.shadow,
          },
          pointer: {
            position: 'absolute',
            top: `${-(this.props.hsv.v * 100) + 100}%`,
            left: `${this.props.hsv.s * 100}%`,
            cursor: 'default',
          },
          circle: {
            width: '4px',
            height: '4px',
            boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
            borderRadius: '50%',
            cursor: 'hand',
            transform: 'translate(-2px, -2px)',
          },
        },
        custom: {
          color,
          white,
          black,
          pointer,
          circle,
        },
      },
      { custom: !!this.props.style }
    );

    return (
      <div
        style={styles.color}
        ref={this.containerRef}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleChange}
        onTouchStart={this.handleChange}
      >
        <div style={styles.white}>
          <div style={styles.black} />
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.circle} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
