import * as React from 'react';
import { Component } from 'react';
import classnames from 'classnames';
import Popover, { IPositionFunction } from '../../popover';
import Icon from '../../icon';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../../i18n';
import Search from './Search';
import Tags from './Tags';
import { ICascaderItem, ICascaderValue } from '../types';

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
  value: ICascaderValue[] | Array<ICascaderValue[]>;
  displayRender?: (selectedOptions: Item[]) => React.ReactNode;
  onVisibleChange: (open: boolean) => void;
  getPopoverContent: (i18n: II18nLocaleCascader) => React.ReactNode;
  onClear: () => void;
  position: IPositionFunction;
  checkedNodes?: Array<Item[]>;
  onRemove?: (item: ICascaderItem, checked: boolean) => void;
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
}

interface ITriggerState {
  active: boolean;
}

export class CascaderTrigger extends Component<ITriggerProps, ITriggerState> {
  elementRef = React.createRef<HTMLDivElement>();
  popoverRef = React.createRef<Popover>();

  static defaultProps = {
    checkedNodes: [],
  };

  state = {
    active: false,
  };

  onVisibleChange = (open: boolean) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ active: open });
    this.props.onVisibleChange(open);
  };

  getSearchPlaceholder(i18n: II18nLocaleCascader): string {
    const { selectedOptions, value, multiple } = this.props;
    const placeholder = i18n.searchPlaceholder;

    if (multiple || !value?.length) {
      return placeholder;
    }

    return selectedOptions.map(item => item.label).join(' / ');
  }

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

  handleTriggerHover(active: boolean) {
    this.setState({
      active,
    });
  }

  renderTrigger(i18n: II18nLocaleCascader) {
    const {
      className,
      placeholder,
      selectedOptions,
      open,
      searchable,
      displayRender,
      clearable,
      multiple,
      checkedNodes,
      onRemove,
      keyword,
      disabled,
    } = this.props;
    const { active } = this.state;

    const notEmpty = multiple
      ? checkedNodes.length > 0
      : selectedOptions.length > 0;
    const cascaderDisplay: React.ReactNode = notEmpty
      ? displayRender(selectedOptions)
      : searchable
      ? i18n.searchPlaceholder
      : placeholder || i18n.placeholder;

    const cascaderCls = classnames('zent-cascader', className, {
      'zent-cascader--disabled': disabled,
      'zent-cascader--active': open || active,
      'zent-cascader--visible': open,
      'zent-cascader--multiple': multiple,
    });

    const selectTriggerCls = classnames('zent-cascader--value', {
      'zent-cascader--placeholder': !notEmpty,
    });
    const showSearch = open && searchable;
    const showClear = clearable && active && (notEmpty || keyword) && !disabled;
    const showLabels = !showSearch && !(multiple && notEmpty);
    const showTags = multiple && notEmpty;

    return (
      <Popover.Trigger.Click toggle={!searchable}>
        <div
          className={cascaderCls}
          ref={this.elementRef}
          onMouseEnter={() => this.handleTriggerHover(true)}
          onMouseLeave={() => this.handleTriggerHover(false)}
        >
          {showTags && (
            <Tags
              list={checkedNodes}
              displayRender={displayRender}
              onRemove={onRemove}
            />
          )}
          {showLabels && (
            <>
              <span className={selectTriggerCls}>{cascaderDisplay}</span>{' '}
            </>
          )}
          {showSearch && (
            <Search
              placeholder={this.getSearchPlaceholder(i18n)}
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
      </Popover.Trigger.Click>
    );
  }

  render() {
    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          const { popupClassName, position, open } = this.props;

          return (
            <>
              <Popover
                ref={this.popoverRef}
                className={popupClassName}
                position={position}
                visible={open}
                onVisibleChange={this.onVisibleChange}
                cushion={4}
              >
                {this.renderTrigger(i18n)}
                {this.props.getPopoverContent(i18n)}
              </Popover>
            </>
          );
        }}
      </Receiver>
    );
  }
}

export default CascaderTrigger;
