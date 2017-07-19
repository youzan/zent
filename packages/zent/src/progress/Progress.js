import React, { Component, PureComponent } from 'react';
import Icon from 'icon';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class Progress extends (PureComponent || Component) {
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
    style: PropTypes.object
  };

  static defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    className: '',
    prefix: 'zent',
    strokeWidth: 10,
    width: 132
  };

  render() {
    const {
      type,
      percent,
      showInfo,
      status,
      className,
      prefix,
      format,
      strokeWidth,
      width,
      style
    } = this.props;

    const containerCls = cx(
      `${prefix}-progress`,
      `${prefix}-progress-${type}`,
      {
        [className]: !!className
      }
    );

    const statusCls = cx({
      [`${prefix}-progress-inprogress`]: percent < 100 &&
        status !== 'exception',
      [`${prefix}-progress-exception`]: percent < 100 && status === 'exception',
      [`${prefix}-progress-success`]: percent >= 100
    });

    const renderInfoCont = () => {
      let infoCont;
      if (format) {
        infoCont = format(percent);
      } else {
        infoCont = `${percent}%`;
        if (percent >= 100) {
          infoCont = (
            <Icon type={type === 'circle' ? 'check' : 'check-circle'} />
          );
        } else if (status === 'exception') {
          infoCont = (
            <Icon type={type === 'circle' ? 'close' : 'close-circle'} />
          );
        }
      }
      return infoCont;
    };

    const renderProgressCont = () => {
      let progressCont;
      switch (type) {
        case 'circle':
          progressCont = (
            <div
              className={statusCls}
              style={{
                width,
                height: width
              }}
            >
              <div
                className={`${prefix}-progress-wrapper`}
                style={{
                  borderRadius: width,
                  borderWidth: strokeWidth
                }}
              />
              <svg className={`${prefix}-progress-inner`}>
                <circle
                  className={`${prefix}-progress-inner-path`}
                  cx={width / 2}
                  cy={width / 2}
                  r={(width - strokeWidth) / 2}
                  style={{
                    strokeWidth,
                    strokeDasharray: Math.PI * (width - strokeWidth),
                    strokeDashoffset: Math.PI *
                      (width - strokeWidth) *
                      (100 - percent) /
                      100
                  }}
                />
              </svg>
              {showInfo
                ? <div
                    className={`${prefix}-progress-info`}
                    style={{ lineHeight: `${width}px` }}
                  >
                    {renderInfoCont()}
                  </div>
                : null}
            </div>
          );
          break;
        case 'line':
        default:
          progressCont = (
            <div className={statusCls}>
              <div
                className={`${prefix}-progress-wrapper`}
                style={{
                  height: strokeWidth,
                  borderRadius: strokeWidth
                }}
              >
                <div
                  className={`${prefix}-progress-inner`}
                  style={{
                    width: `${percent}%`,
                    height: strokeWidth,
                    borderRadius: strokeWidth
                  }}
                />
              </div>
              {showInfo
                ? <div className={`${prefix}-progress-info`}>
                    {renderInfoCont()}
                  </div>
                : null}
            </div>
          );
          break;
      }
      return progressCont;
    };

    return (
      <div className={containerCls} style={style}>
        {renderProgressCont()}
      </div>
    );
  }
}
