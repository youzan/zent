import React, { PureComponent } from 'react';
import Icon from 'icon';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Step extends PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    style: PropTypes.object,
    wrapperStyle: PropTypes.object,
    stepLast: PropTypes.bool,
    isCurrentStep: PropTypes.bool,
    isLastFinishStep: PropTypes.bool,
    stepNumber: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.node.isRequired,
    description: PropTypes.node,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    const props = this.props;

    const {
      prefix,
      isCurrentStep,
      status = 'wait',
      isLastFinishStep,
      stepLast,
      stepNumber,
      title,
      description,
      sequence,
    } = props;

    let iconNode;

    if (status === 'finish') {
      iconNode = <Icon type="check-circle" />;
    } else if (status === 'error') {
      iconNode = <Icon type="error-circle" />;
    } else {
      iconNode = (
        <span className={`${prefix}-icon`}>{sequence ? stepNumber : ''}</span>
      );
    }

    const classString = classNames({
      [`${prefix}-steps-item`]: true,
      [`${prefix}-steps-status-${status}`]: true,
      'is-current': isCurrentStep,
      'is-last-finish': isLastFinishStep,
    });

    return (
      <div className={classString}>
        {!stepLast && (
          <div className={`${prefix}-steps-tail`}>
            <i />
          </div>
        )}
        <div className={`${prefix}-steps-step`}>
          <div className={`${prefix}-step-head`}>
            <div className={`${prefix}-step-head-inner`}>{iconNode}</div>
          </div>
          <div className={`${prefix}-step-main`}>
            <div className={`${prefix}-step-title`}>{title}</div>
            {description && (
              <div className={`${prefix}-step-description`}>{description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
