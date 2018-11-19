import React, { PureComponent } from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';

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
    className: '',
    prefix: 'zent',
    strokeWidth: 10,
  };

  getCurrentColor() {
    const {
      percent,
      status,
      normalColor,
      exceptionColor,
      successColor,
    } = this.props;

    if (percent < 100 && status === 'exception') {
      return exceptionColor || normalColor;
    }
    if (percent >= 100) {
      return successColor;
    }
    return normalColor;
  }

  renderInfo() {
    const { type, percent, status, format } = this.props;

    if (format) {
      return format(percent);
    }

    if (percent >= 100) {
      return (
        <Icon
          type={type === 'circle' ? 'check' : 'check-circle'}
          style={{
            color: this.getCurrentColor(),
          }}
        />
      );
    } else if (status === 'exception') {
      return (
        <Icon
          type={type === 'circle' ? 'close' : 'close-circle'}
          style={{
            color: this.getCurrentColor(),
          }}
        />
      );
    }

    return `${percent}%`;
  }

  renderProgress() {
    const {
      type,
      percent,
      showInfo,
      status,
      prefix,
      strokeWidth,
      width,
      bgColor,
    } = this.props;
    const progressWidth = width || (type === 'circle' ? 132 : 580);
    const statusCls = cx({
      [`${prefix}-progress-inprogress`]:
        percent < 100 && status !== 'exception',
      [`${prefix}-progress-exception`]: percent < 100 && status === 'exception',
      [`${prefix}-progress-success`]: percent >= 100,
    });
    let mid, diameter, radius, circumference;

    switch (type) {
      case 'circle':
        mid = progressWidth / 2;
        diameter = progressWidth - strokeWidth;
        radius = diameter / 2;
        circumference = diameter * Math.PI;

        return (
          <div
            className={statusCls}
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
                  stroke: this.getCurrentColor(),
                  strokeWidth,
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference * (100 - percent) / 100,
                }}
              />
            </svg>
            {showInfo ? (
              <div
                className={`${prefix}-progress-info`}
                style={{ lineHeight: `${progressWidth}px` }}
              >
                {this.renderInfo()}
              </div>
            ) : null}
          </div>
        );

      case 'line': /* fall through */
      default:
        return (
          <div className={statusCls}>
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
                  background: this.getCurrentColor(),
                  width: `${percent}%`,
                  height: strokeWidth,
                  borderRadius: strokeWidth,
                }}
              />
            </div>
            {showInfo ? (
              <div className={`${prefix}-progress-info`}>
                {this.renderInfo()}
              </div>
            ) : null}
          </div>
        );
    }
  }

  render() {
    const { type, className, prefix, style } = this.props;
    const containerCls = cx(
      `${prefix}-progress`,
      `${prefix}-progress-${type}`,
      {
        [className]: !!className,
      }
    );

    return (
      <div className={containerCls} style={style}>
        {this.renderProgress()}
      </div>
    );
  }
}
