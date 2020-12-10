import classnames from 'classnames';

import { ICascaderItem } from '../types';
import Icon from '../../icon';
import { II18nLocaleCascader } from '../../i18n';
import { Component } from 'react';

interface ITriggerState {
  active: boolean;
}

export interface ICascaderBaseTriggerProps {
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  visible: boolean;
  onClear: () => void;
  selectedPaths?: Array<ICascaderItem[]>;
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  // 为触发 Popover.Trigger 的 click 事件
  onClick?: (...args: any[]) => void;
  children?: React.ReactNode;
  placeholder?: string;
  searchable?: boolean;
  renderValue: (selectedPath: ICascaderItem[]) => React.ReactNode;
  i18n: II18nLocaleCascader;
  showLabels?: boolean;
}

export class BaseTrigger extends Component<
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
    } = this.props;
    const { active } = this.state;
    const hasValue = selectedPaths.length > 0;

    const cascaderCls = classnames('zent-cascader-v2', className, {
      'zent-cascader-v2--disabled': disabled,
      'zent-cascader-v2--active': visible || active,
      'zent-cascader-v2--visible': visible,
    });

    const triggerTextCls = classnames('zent-cascader-v2--text', {
      'zent-cascader-v2--placeholder': !hasValue,
    });

    let triggerText: React.ReactNode;
    if (hasValue) {
      triggerText = renderValue(selectedPaths[0]);
    } else if (searchable) {
      triggerText = i18n.searchPlaceholder;
    } else {
      triggerText = placeholder || i18n.placeholder;
    }

    const showClear =
      clearable && (visible || active) && (hasValue || keyword) && !disabled;

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
          <Icon type="down" />
        )}
      </div>
    );
  }
}
