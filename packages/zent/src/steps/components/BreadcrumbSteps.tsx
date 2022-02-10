import { Children, Component } from 'react';
import cx from 'classnames';
import { IStepProps } from './Step';
import { IStepsProps } from '../Steps';
import Icon, { IconType } from '../../icon';
import { isElement } from 'react-is';

export default class BreadcrumbSteps extends Component<IStepsProps> {
  onStepChange = id => {
    const { onStepChange } = this.props;
    onStepChange && onStepChange(id);
  };

  renderStepTitle = (itemProps: IStepProps, index: number) => {
    const { sequence, ghost } = this.props;
    const { icon, title } = itemProps;

    if (icon) {
      const iconNode =
        typeof icon === 'string' ? (
          <Icon type={icon as IconType} className="zent-steps-item__icon" />
        ) : (
          icon
        );
      return (
        <>
          {iconNode}
          {title}
        </>
      );
    }

    if (sequence) {
      return (
        <>
          {ghost ? (
            <span className="zent-steps-sequence">{index + 1}</span>
          ) : (
            `${index + 1}. `
          )}
          {title}
        </>
      );
    }

    return title;
  };

  render() {
    const props = this.props;
    const { className, children, current, onStepChange, type, ghost } = props;
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

          const { disabled } = item.props;
          const isDisabled = disabled && isBreadcrumbGhost;
          const stepClassName = cx('zent-steps-item', {
            'zent-steps-item--finished': isBreadcrumb && index <= current - 1,
            'zent-steps-item--current':
              (isCard || isTabs || isBreadcrumbGhost) && index === current - 1,
            'zent-steps-item--clickable': Boolean(onStepChange),
            'zent-steps-item--disabled': isDisabled,
          });

          return (
            <div
              className={stepClassName}
              style={{ width: stepWidth }}
              onClick={() => !isDisabled && this.onStepChange(index + 1)}
            >
              <div className="zent-steps-step">
                {this.renderStepTitle(item.props, index)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
