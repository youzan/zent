import React, { PureComponent } from 'react';
import cx from 'classnames';

export default class BreadcrumbSteps extends PureComponent {
  onStepChange = id => {
    let { onStepChange } = this.props;
    onStepChange && onStepChange(id);
  };

  render() {
    const props = this.props;
    const {
      className,
      prefix,
      children,
      current,
      sequence,
      onStepChange,
      type,
    } = props;
    const stepWidth = `${100 / children.length}%`;
    const isBreadcrumb = type === 'breadcrumb';
    const isCard = type === 'card';
    const isTabs = type === 'tabs';
    const stepsCls = cx(`${prefix}-steps`, className, {
      [`${prefix}-steps-breadcrumb`]: isBreadcrumb,
      [`${prefix}-steps-card`]: isCard,
      [`${prefix}-steps-tabs`]: isTabs,
    });

    return (
      <div className={stepsCls}>
        {React.Children.map(children, (item, index) => {
          const stepClassName = cx(`${prefix}-steps-item`, {
            'is-finish': isBreadcrumb && index <= current - 1,
            'is-current': (isCard || isTabs) && index === current - 1,
            'is-clicked': Boolean(onStepChange),
          });
          let itemTitle = item.props.title;

          return (
            <div
              className={stepClassName}
              style={{ width: stepWidth }}
              onClick={() => this.onStepChange(index + 1)}
            >
              <div className={`${prefix}-steps-step`}>
                {sequence ? `${index + 1}. ${itemTitle}` : itemTitle}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
