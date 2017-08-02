import React, { Component, PureComponent } from 'react';
import Icon from 'icon';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Step extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
    tailWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    adjustMarginRight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    stepLast: PropTypes.bool,
    isCurrentStep: PropTypes.bool,
    isLastFinishStep: PropTypes.bool,
    stepNumber: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.node.isRequired,
    description: PropTypes.node
  };

  render() {
    const props = this.props;

    const {
      prefix,
      tailWidth,
      isCurrentStep,
      status = 'wait',
      isLastFinishStep,
      adjustMarginRight,
      stepLast,
      stepNumber,
      title,
      description
    } = props;

    let iconNode;

    if (
      (status === 'finish' || status === 'error') &&
      (isCurrentStep || isLastFinishStep)
    ) {
      if (status === 'finish') {
        iconNode = <Icon type="check-circle" />;
      } else {
        iconNode = <Icon type="error-circle" />;
      }
    } else {
      iconNode = (
        <span className={`${prefix}-icon`}>
          {stepNumber}
        </span>
      );
    }

    const classString = classNames({
      [`${prefix}-steps-item`]: true,
      [`${prefix}-steps-status-finish`]: status === 'finish',
      [`${prefix}-steps-status-error`]: status === 'error',
      'is-current': isCurrentStep,
      'is-last-finish': isLastFinishStep
    });

    return (
      <div
        className={classString}
        style={{ width: tailWidth, marginRight: adjustMarginRight }}
      >
        {stepLast
          ? ''
          : <div className={`${prefix}-steps-tail`}>
              <i />
            </div>}
        <div className={`${prefix}-steps-step`}>
          <div className={`${prefix}-step-head`}>
            <div className={`${prefix}-step-head-inner`}>
              {iconNode}
            </div>
          </div>
          <div className={`${prefix}-step-main`}>
            <div className={`${prefix}-step-title`}>
              {title}
            </div>
            {description
              ? <div className={`${prefix}-step-description`}>
                  {description}
                </div>
              : ''}
          </div>
        </div>
      </div>
    );
  }
}
