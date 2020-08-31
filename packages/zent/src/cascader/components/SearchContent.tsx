import * as React from 'react';
import cx from 'classnames';

import Popover from '../../popover';
import { ICascaderItem, CascaderSearchClickHandler } from '../types';
import { II18nLocaleCascader } from '../../i18n';
import { Checkbox } from '../../checkbox';
import BlockLoading from '../../loading/BlockLoading';
import { getOptionsValue } from '../utils';

const withPopover = Popover.withPopover;

export interface ISearchContentProps {
  // injected by withPopover
  popover: Popover;

  i18n: II18nLocaleCascader;
  multiple: boolean;
  handleSearchOptionChecked: (items: ICascaderItem[], checked: boolean) => void;
  isSearching: boolean;
  keyword: string;
  searchList: Array<ICascaderItem[]>;
  searchClickHandler: CascaderSearchClickHandler;
  highlight: (keyword: string, items: ICascaderItem[]) => React.ReactNode;
}

class SearchContent extends React.Component<ISearchContentProps> {
  closePopup = () => this.props.popover?.close();

  renderSearchingOrEmpty() {
    const { isSearching, i18n } = this.props;
    return (
      <div className="zent-cascader--search-empty">
        {isSearching ? (
          <BlockLoading
            height={32}
            iconSize={18}
            loading
            colorPreset="grey"
            icon="circle"
          />
        ) : (
          i18n.searchEmpty
        )}
      </div>
    );
  }

  renderItemCheckbox(items: ICascaderItem[]) {
    const { multiple } = this.props;
    const item = items[items.length - 1];

    if (!multiple) {
      return null;
    }

    return (
      <Checkbox
        value={item.value}
        onChange={e =>
          this.props.handleSearchOptionChecked(items, e.target.checked)
        }
        checked={item.checked}
        disabled={item.disabled}
      ></Checkbox>
    );
  }

  handleClick(items: ICascaderItem[]) {
    const { searchClickHandler } = this.props;
    searchClickHandler(items, this.closePopup);
  }

  renderPanels() {
    const { searchList, multiple, highlight, keyword } = this.props;

    return (
      <ul className="zent-cascader--search-list">
        {searchList.map(items => {
          const leafNode = items[items.length - 1];
          const searchItemCls = cx('zent-cascader--search-item', {
            'zent-cascader--search-item--multiple': multiple,
          });
          const searchItemProps = leafNode.disabled
            ? {}
            : { onClick: () => this.handleClick(items) };

          return (
            <li
              key={getOptionsValue(items)}
              className={searchItemCls}
              {...searchItemProps}
            >
              {this.renderItemCheckbox(items)}
              {highlight(keyword, items)}
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

export default withPopover(SearchContent);
