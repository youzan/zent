import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import { II18nLocaleCascader } from '../../i18n';
import Search from './Search';
import Tags from './Tags';
import { ICascaderItem, CascaderValue } from '../types';
import memoize from '../../utils/memorize-one';
import { renderOptionsValue } from '../common/utils';

interface ITriggerProps<Item = ICascaderItem> {
  disabled?: boolean;
  className?: string;
  popupClassName?: string;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  open: boolean;
  selectedOptions: Item[];
  value: CascaderValue[] | Array<CascaderValue[]>;
  renderValue?: (selectedOptions: Item[]) => React.ReactNode;
  onClear: () => void;
  checkedNodes?: Array<Item[]>;
  onRemove?: (item: ICascaderItem) => void;
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  i18n: II18nLocaleCascader;
  // 为触发 Popover.Trigger 的 click 事件
  onClick?: (...args: any[]) => void;
}

interface ITriggerState {
  active: boolean;
}

export class CascaderTrigger extends Component<ITriggerProps, ITriggerState> {
  static defaultProps = {
    checkedNodes: [],
  };

  state = {
    active: false,
  };

  getSearchPlaceholder = memoize(
    (
      i18n: II18nLocaleCascader,
      selectedOptions: ICascaderItem[],
      value: CascaderValue[] | Array<CascaderValue[]>,
      multiple: boolean
    ): string => {
      const placeholder = i18n.searchPlaceholder;

      if (multiple || !value?.length) {
        return placeholder;
      }

      return renderOptionsValue(selectedOptions);
    }
  );

  onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onKeywordChange(e.target.value);
  };

  onClearClick = e => {
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
      placeholder,
      selectedOptions,
      open,
      searchable,
      renderValue,
      clearable,
      multiple,
      checkedNodes,
      onRemove,
      keyword,
      disabled,
      i18n,
      value,
      onClick,
    } = this.props;
    const { active } = this.state;

    const notEmpty = multiple
      ? checkedNodes.length > 0
      : selectedOptions.length > 0;
    const cascaderDisplay: React.ReactNode = notEmpty
      ? renderValue(selectedOptions)
      : searchable
      ? i18n.searchPlaceholder
      : placeholder || i18n.placeholder;

    const cascaderCls = classnames('zent-cascader', className, {
      'zent-cascader--disabled': disabled,
      'zent-cascader--active': open || active,
      'zent-cascader--visible': open,
      'zent-cascader--multiple': multiple,
    });

    const selectTriggerCls = classnames('zent-cascader--text', {
      'zent-cascader--placeholder': !notEmpty,
    });
    const showSearch = open && searchable;
    const showClear = clearable && active && (notEmpty || keyword) && !disabled;
    const showLabels = !showSearch && !(multiple && notEmpty);
    const showTags = multiple && notEmpty;

    return (
      <div
        className={cascaderCls}
        onClick={onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {showTags && (
          <Tags
            list={checkedNodes}
            renderValue={renderValue}
            onRemove={onRemove}
          />
        )}
        {showLabels && (
          <span className={selectTriggerCls}>{cascaderDisplay}</span>
        )}
        {showSearch && (
          <Search
            placeholder={this.getSearchPlaceholder(
              i18n,
              selectedOptions,
              value,
              multiple
            )}
            value={keyword}
            onChange={this.onKeywordChange}
          />
        )}
        {showClear ? (
          <Icon type="close-circle" onClick={this.onClearClick} />
        ) : (
          <Icon type="caret-down" />
        )}
      </div>
    );
  }
}

export default CascaderTrigger;
