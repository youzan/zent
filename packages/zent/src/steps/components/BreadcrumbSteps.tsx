import { Children, Component } from 'react';
import cx from 'classnames';

import { IStepsProps } from '../Steps';
import { isElement } from 'react-is';

export default class BreadcrumbSteps extends Component<IStepsProps> {
  onStepChange = id => {
    const { onStepChange } = this.props;
    onStepChange && onStepChange(id);
  };

  render() {
    const props = this.props;
    const {
      className,
      children,
      current,
      sequence,
      onStepChange,
      type,
      ghost,
    } = props;
    const stepWidth = `${100 / Children.count(children)}%`;
    const isBreadcrumb = type === 'breadcrumb';
    const isCard = type === 'card';
    const isTabs = type === 'tabs';
    const isBreadcrumbGhost = ghost && isBreadcrumb;
    const stepsCls = cx('zent-steps', className, {
      'zent-steps-breadcrumb': isBreadcrumb,
      'zent-steps-card': isCard,
      'zent-steps-tabs': isTabs,
      'zent-steps-breadcrumb-ghost': isBreadcrumbGhost,
    });

    return (
      <div className={stepsCls}>
        {Children.map(children, (item, index) => {
          if (!isElement(item)) {
            return null;
          }

          const isDisabled = item.props.disabled && isBreadcrumbGhost;
          const stepClassName = cx('zent-steps-item', {
            'zent-steps-item--finished': isBreadcrumb && index <= current - 1,
            'zent-steps-item--current':
              (isCard || isTabs || isBreadcrumbGhost) && index === current - 1,
            'zent-steps-item--clickable': Boolean(onStepChange),
            'zent-steps-item--disabled': isDisabled,
          });

          const itemTitle = item.props.title;

          return (
            <div
              className={stepClassName}
              style={{ width: stepWidth }}
              onClick={() => !isDisabled && this.onStepChange(index + 1)}
            >
              <div className="zent-steps-step">
                {sequence ? `${index + 1}. ${itemTitle}` : itemTitle}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
