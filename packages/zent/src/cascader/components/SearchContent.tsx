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

  multiple: boolean;
  onOptionToggle: (items: ICascaderItem[], checked: boolean) => void;
  onOptionClick: CascaderSearchClickHandler;
  isSearching: boolean;
  keyword: string;
  searchList: Array<ICascaderItem[]>;
  highlight: (keyword: string, items: ICascaderItem[]) => React.ReactNode;
  i18n: II18nLocaleCascader;
}

class SearchContent extends React.Component<ISearchContentProps> {
  closePopup = () => this.props.popover?.close();

  onOptionClick(items: ICascaderItem[]) {
    const { onOptionClick: searchClickHandler } = this.props;
    searchClickHandler(items, this.closePopup);
  }

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

  renderPanels() {
    const { searchList, multiple, highlight, keyword } = this.props;

    return (
      <ul className="zent-cascader--search-list">
        {searchList.map(items => {
          const leafNode = items[items.length - 1];
          const searchItemCls = cx('zent-cascader--search-item', {
            'zent-cascader--search-item--multiple': multiple,
          });

          return (
            <li
              key={getOptionsValue(items)}
              className={searchItemCls}
              onClick={
                leafNode.disabled ? undefined : () => this.onOptionClick(items)
              }
            >
              {multiple && (
                <Checkbox
                  value={leafNode.value}
                  onChange={e =>
                    this.props.onOptionToggle(items, e.target.checked)
                  }
                  checked={leafNode.checked}
                  disabled={leafNode.disabled}
                />
              )}
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
