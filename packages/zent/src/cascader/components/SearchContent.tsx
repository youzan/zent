import * as React from 'react';
import { Component } from 'react';
import Popover from '../../popover';
import {
  ICascaderItem,
  ICascaderSearchItem,
  ICascaderSearchClickHandler,
} from '../types';
import { II18nLocaleCascader } from '../../i18n';
import { Checkbox } from '../../checkbox';
import cx from 'classnames';

const withPopover = Popover.withPopover;

export interface ISearchContentProps {
  popover: Popover;
  i18n: II18nLocaleCascader;
  multiple: boolean;
  handleChecked: (item: ICascaderItem, checked: boolean) => void;
  isSearching: boolean;
  searchList: ICascaderSearchItem[];
  searchClickHandler: ICascaderSearchClickHandler;
}

class SearchContent extends Component<ISearchContentProps> {
  renderSearchingOrEmpty() {
    const { isSearching, i18n } = this.props;
    return (
      <div className="zent-cascader--search-empty">
        {isSearching ? i18n.searching : i18n.searchEmpty}
      </div>
    );
  }

  renderItemCheckbox(items) {
    const { multiple } = this.props;
    const item = items[items.length - 1];

    if (!multiple) {
      return null;
    }

    return (
      <Checkbox
        value={item.value}
        onChange={e => this.props.handleChecked(item, e.target.checked)}
        checked={item.checked}
        disabled={item.disabled}
      ></Checkbox>
    );
  }

  renderPanels() {
    const { popover, searchList, searchClickHandler, multiple } = this.props;

    return (
      <ul className="zent-cascader--search-list">
        {searchList.map((searchItem, index) => {
          const { items, display } = searchItem;
          const searchItemCls = cx('zent-cascader--search-item', {
            'zent-cascader--search-item--multiple': multiple,
          });

          return (
            <li
              key={index}
              className={searchItemCls}
              onClick={() => searchClickHandler(items, popover)}
            >
              {this.renderItemCheckbox(items)}
              {display}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { isSearching, searchList } = this.props;

    return (
      <div className="zent-cascader__popup-inner zent-cascader__popup-inner-search">
        {isSearching || !searchList.length
          ? this.renderSearchingOrEmpty()
          : this.renderPanels()}
      </div>
    );
  }
}

export default withPopover(
  SearchContent as React.ComponentType<ISearchContentProps>
);
