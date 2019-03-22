import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';

import Icon from '../../icon';

export interface IStepProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  prefix?: string;
  status?: 'wait' | 'finish' | 'error';
  isCurrentStep?: boolean;
  isLastFinishStep?: boolean;
  stepLast?: boolean;
  stepNumber?: string;
  sequence?: boolean;
}

export default class Step extends Component<IStepProps> {
  static defaultProps = {
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
      iconNode = <Icon type="check-circle-o" />;
    } else if (status === 'error') {
      iconNode = <Icon type="error-circle" />;
    } else {
      iconNode = (
        <span className={`${prefix}-icon`}>{sequence ? stepNumber : ''}</span>
      );
    }

    const classString = classNames(
      `${prefix}-steps-item`,
      `${prefix}-steps-status-${status}`,
      {
        'is-current': isCurrentStep,
        'is-last-finish': isLastFinishStep,
      }
    );

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
