import * as React from 'react';
import { PureComponent } from 'react';
import uniqueId from 'lodash-es/uniqueId';

const GRADIENT_ID = uniqueId('zentAnimatedArcStrokeGradient');
const STROKE_OFFSET_RATIO = 0.2;
const STROKE_OPACITY = 0.2;
const ANIMATION_DURATION = 400;
const ANIMATION_DELAY = 1000;
const START_ROTATE = 0;
const DEFAULT_TRANSITION = {};
const NO_TRANSITION = {
  WebkitTransition: 'none',
  MozTransition: 'none',
  OTransition: 'none',
  msTransition: 'none',
  transition: 'none',
};

export interface IAnimatedArcProps {
  className?: string;
  radius?: number;
  arcLength?: number;
  strokeWidth?: number;
}

/**
 * Draw an arc then rotate it along the path
 */
export default class AnimatedArc extends PureComponent<IAnimatedArcProps> {
  animationDelayTimerId: number;
  transitionEndTimerId: number;

  state = {
    opacity: 0,
    rotate: START_ROTATE,
    transition: DEFAULT_TRANSITION,
  };

  render() {
    const path = this.getPath();
    const { className, strokeWidth } = this.props;
    const { rotate, transition, opacity } = this.state;

    return (
      <g>
        <defs>
          <linearGradient id={GRADIENT_ID}>
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path
          className={className}
          d={path}
          style={{
            stroke: `url(#${GRADIENT_ID})`,
            strokeOpacity: opacity,
            strokeWidth,
            transform: `rotate(${rotate}rad)`,
            ...transition,
          }}
        />
      </g>
    );
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    clearTimeout(this.animationDelayTimerId);
    clearTimeout(this.transitionEndTimerId);
  }

  getMaskArcLength() {
    const { arcLength } = this.props;
    return arcLength * STROKE_OFFSET_RATIO;
  }

  getMaskTheta() {
    const { radius } = this.props;
    const maskArcLength = this.getMaskArcLength();
    return maskArcLength / radius;
  }

  getArcStartPoint() {
    const { radius, strokeWidth } = this.props;
    const w = strokeWidth / 2;
    return [radius + w, w];
  }

  // 终点只可能在第一象限(圆心为原点的坐标系)
  // 需要转换成左上角的坐标系内位置
  getArcEndPoint() {
    const { radius, strokeWidth } = this.props;
    const R = radius + strokeWidth / 2;
    const theta = this.getMaskTheta();
    const x = R + Math.sin(theta) * radius;
    const y = R - Math.cos(theta) * radius;

    return [x, y];
  }

  getPath() {
    const start = this.getArcStartPoint();
    const end = this.getArcEndPoint();
    const { radius } = this.props;

    // Move to start then draw an arc to end
    return `M${start.join(',')} A${radius},${radius} 0 0 1 ${end.join(',')}`;
  }

  startAnimation = () => {
    if (this.animationDelayTimerId) {
      clearTimeout(this.animationDelayTimerId);
    }

    const { arcLength, radius } = this.props;
    const maskArcLength = this.getMaskArcLength();
    const rotateRadian = (arcLength - maskArcLength) / radius;

    this.setState(
      {
        rotate: rotateRadian,
        transition: DEFAULT_TRANSITION,
        opacity: STROKE_OPACITY,
      },
      this.queueAnimationEnd
    );
  };

  finishAnimation = () => {
    if (this.transitionEndTimerId) {
      clearTimeout(this.transitionEndTimerId);
    }

    this.setState({
      rotate: START_ROTATE,
      transition: NO_TRANSITION,
      opacity: 0,
    });

    this.animationDelayTimerId = (setTimeout(
      this.startAnimation,
      ANIMATION_DELAY
    ) as unknown) as number;
  };

  queueAnimationEnd = () => {
    this.transitionEndTimerId = (setTimeout(
      this.finishAnimation,
      ANIMATION_DURATION
    ) as unknown) as number;
  };
}
