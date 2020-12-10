import { Component } from 'react';
import classNames from 'classnames';

import Icon from '../../icon';

export interface IStepProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
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
        <span className="zent-icon zent-steps-sequence">
          {sequence ? stepNumber : ''}
        </span>
      );
    }

    const classString = classNames(
      'zent-steps-item',
      `zent-steps-status-${status}`,
      {
        'zent-steps-item--current': isCurrentStep,
        'zent-steps-item--last-finished': isLastFinishStep,
      }
    );

    return (
      <div className={classString}>
        {!stepLast && (
          <div className="zent-steps-tail">
            <i />
          </div>
        )}
        <div className="zent-steps-step">
          <div className="zent-step-head">
            <div className="zent-step-head-inner">{iconNode}</div>
          </div>
          <div className="zent-step-main">
            <div className="zent-step-title">{title}</div>
            {description && (
              <div className="zent-step-description">{description}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
