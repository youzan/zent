import * as React from 'react';
import classnames from 'classnames';

import Icon from '../../icon';
import { ICascaderBaseTriggerProps } from '../types';

interface ITriggerState {
  active: boolean;
}

export class BaseTrigger extends React.Component<
  ICascaderBaseTriggerProps,
  ITriggerState
> {
  state = {
    active: false,
  };

  onClearClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.props.keyword) {
      this.setState({ active: false });
      this.props.onClear();
    } else {
      this.props.onKeywordChange('');
    }
  };

  onMouseEnter = () => {
    this.setState({ active: true });
  };

  onMouseLeave = () => {
    this.setState({ active: false });
  };

  render() {
    const {
      className,
      visible,
      clearable,
      multiple,
      selectedPaths,
      keyword,
      disabled,
      children,
      onClick,
      renderValue,
      searchable,
      i18n,
      placeholder,
      showLabels,
      hasValue,
    } = this.props;
    const { active } = this.state;

    const cascaderCls = classnames('zent-cascader', className, {
      'zent-cascader--disabled': disabled,
      'zent-cascader--active': visible || active,
      'zent-cascader--visible': visible,
      'zent-cascader--multiple': multiple,
    });

    const triggerTextCls = classnames('zent-cascader--text', {
      'zent-cascader--placeholder': !hasValue,
    });
    const triggerText: React.ReactNode = hasValue
      ? renderValue(selectedPaths[0])
      : searchable
      ? i18n.searchPlaceholder
      : placeholder || i18n.placeholder;

    const showClear = clearable && active && (hasValue || keyword) && !disabled;

    return (
      <div
        className={cascaderCls}
        onClick={onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {children}
        {showLabels && <span className={triggerTextCls}>{triggerText}</span>}
        {showClear ? (
          <Icon type="close-circle" onClick={this.onClearClick} />
        ) : (
          <Icon type="caret-down" />
        )}
      </div>
    );
  }
}
