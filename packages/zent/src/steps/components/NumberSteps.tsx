import * as React from 'react';
import { Component } from 'react';
import classNames from 'classnames';
import { isElement } from 'react-is';
import { IStepsProps } from '../Steps';

export default class NumberSteps extends Component<IStepsProps> {
  render() {
    const props = this.props;
    const {
      className,
      prefix,
      children,
      current,
      status,
      direction,
      sequence,
    } = props;

    const lastIndex = React.Children.count(children) - 1;
    const classString = classNames(
      className,
      `${prefix}-steps`,
      `${prefix}-steps__${direction}`
    );

    return (
      <div className={classString}>
        {React.Children.map(children, (item, index) => {
          const np = {
            sequence,
            stepNumber: (index + 1).toString(),
            stepLast: index === lastIndex,
            isCurrentStep: index === current - 1,
            isLastFinishStep: status === 'error' && index === current - 2,
            prefix,
            status: 'wait',
          };

          if (!isElement(item)) {
            return null;
          }

          if (!item.props.status) {
            if (index === current - 1) {
              np.status = status;
            } else if (index < current - 1) {
              np.status = 'finish';
            } else {
              np.status = 'wait';
            }
          }

          return React.cloneElement(item, np);
        })}
      </div>
    );
  }
}
