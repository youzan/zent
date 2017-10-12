import React, { Component, PureComponent } from 'react';
import classNames from 'classnames';

export default class NumberSteps extends (PureComponent || Component) {
  render() {
    const props = this.props;
    const { className, prefix, children, current, status } = props;
    const lastIndex = children.length - 1;
    const classString = classNames({
      [`${prefix}-steps`]: true,
      [`${className}`]: true
    });

    return (
      <div className={classString}>
        {React.Children.map(
          children,
          (item, index) => {
            const np = {
              stepNumber: (index + 1).toString(),
              stepLast: index === lastIndex,
              isCurrentStep: index === current - 1,
              isLastFinishStep: status === 'error' && index === current - 2,
              prefix,
              status: 'wait'
            };

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
          },
          this
        )}
      </div>
    );
  }
}
