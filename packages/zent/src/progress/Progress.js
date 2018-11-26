import React, { PureComponent } from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';
import AnimatedArc from './AnimatedArc';

const STATE = {
  EXCEPTION: 1,
  SUCCESS: 2,
  ING: 3,
};

const DEFAULT_WIDTH = {
  CIRCLE: 132,
  LINE: 580,
};

export default class Progress extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    type: PropTypes.string,
    percent: PropTypes.number,
    showInfo: PropTypes.bool,
    status: PropTypes.string,
    format: PropTypes.func,
    strokeWidth: PropTypes.number,
    width: PropTypes.number,
    style: PropTypes.object,
    normalColor: PropTypes.string,
    exceptionColor: PropTypes.string,
    successColor: PropTypes.string,
    bgColor: PropTypes.string,
  };

  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    prefix: 'zent',
    strokeWidth: 10,
  };

  getCurrentState() {
    const { percent, status } = this.props;

    if (percent < 100 && status === 'exception') {
      return STATE.EXCEPTION;
    }
    if (percent >= 100) {
      return STATE.SUCCESS;
    }

    return STATE.ING;
  }

  getStateClass() {
    const { prefix } = this.props;
    const state = this.getCurrentState();
    return cx({
      [`${prefix}-progress-inprogress`]: state === STATE.ING,
      [`${prefix}-progress-exception`]: state === STATE.EXCEPTION,
      [`${prefix}-progress-success`]: state === STATE.SUCCESS,
    });
  }

  getCurrentColor() {
    const { normalColor, exceptionColor, successColor } = this.props;
    const state = this.getCurrentState();

    if (state === STATE.EXCEPTION) {
      return exceptionColor || normalColor;
    }
    if (state === STATE.SUCCESS) {
      return successColor;
    }
    return normalColor;
  }

  render() {
    const { type, className, prefix, style } = this.props;
    const containerCls = cx(
      `${prefix}-progress`,
      `${prefix}-progress-${type}`,
      className
    );
    const color = this.getCurrentColor();
    const state = this.getCurrentState();
    const stateCls = this.getStateClass();
    let node;

    switch (type) {
      case 'circle':
        node = (
          <CircleProgress
            {...this.props}
            color={color}
            state={state}
            stateCls={stateCls}
          />
        );
        break;

      case 'line': /* fall through */
      default:
        node = (
          <LineProgress
            {...this.props}
            color={color}
            state={state}
            stateCls={stateCls}
          />
        );
        break;
    }

    return (
      <div className={containerCls} style={style}>
        {node}
      </div>
    );
  }
}

function ProgressInfo(props) {
  const { type, percent, format, state } = props;

  if (format) {
    return format(percent);
  }

  if (state === STATE.SUCCESS) {
    return <Icon type={type === 'circle' ? 'check' : 'check-circle'} />;
  }

  if (state === STATE.EXCEPTION) {
    return <Icon type={type === 'circle' ? 'close' : 'close-circle'} />;
  }

  return `${percent}%`;
}

function LineProgress(props) {
  const {
    type,
    percent,
    showInfo,
    prefix,
    strokeWidth,
    width,
    bgColor,
    format,
    color,
    state,
    stateCls,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.LINE;

  return (
    <div className={stateCls}>
      <div
        className={`${prefix}-progress-wrapper`}
        style={{
          background: bgColor,
          width: progressWidth,
          height: strokeWidth,
          borderRadius: strokeWidth,
        }}
      >
        <div
          className={`${prefix}-progress-inner`}
          style={{
            background: color,
            width: `${percent}%`,
            height: strokeWidth,
            borderRadius: strokeWidth,
          }}
        />
      </div>
      {showInfo && (
        <div className={`${prefix}-progress-info`} style={{ color }}>
          <ProgressInfo
            type={type}
            percent={percent}
            format={format}
            state={state}
          />
        </div>
      )}
    </div>
  );
}

function CircleProgress(props) {
  const {
    percent,
    showInfo,
    prefix,
    type,
    format,
    strokeWidth,
    width,
    bgColor,
    color,
    state,
    stateCls,
  } = props;
  const progressWidth = width || DEFAULT_WIDTH.CIRCLE;
  const mid = progressWidth / 2;
  const diameter = progressWidth - strokeWidth;
  const radius = diameter / 2;
  const circumference = diameter * Math.PI;
  const offset = (circumference * (100 - percent)) / 100;

  return (
    <div
      className={stateCls}
      style={{
        width: progressWidth,
        height: progressWidth,
      }}
    >
      <div
        className={`${prefix}-progress-wrapper`}
        style={{
          borderRadius: progressWidth,
          borderWidth: strokeWidth,
          borderColor: bgColor,
        }}
      />
      <svg className={`${prefix}-progress-inner`}>
        <circle
          className={`${prefix}-progress-inner-path`}
          cx={mid}
          cy={mid}
          r={radius}
          style={{
            stroke: color,
            strokeWidth,
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
        {state === STATE.ING && (
          <AnimatedArc
            className={`${prefix}-progress-path-mask`}
            radius={radius}
            arcLength={circumference - offset}
            strokeWidth={strokeWidth}
          />
        )}
      </svg>
      {showInfo && (
        <div
          className={`${prefix}-progress-info`}
          style={{
            lineHeight: `${progressWidth}px`,
            color,
          }}
        >
          <ProgressInfo
            type={type}
            percent={percent}
            format={format}
            state={state}
          />
        </div>
      )}
    </div>
  );
}
