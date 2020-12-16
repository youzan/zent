import cx from 'classnames';
import { Component } from 'react';

import Popover from '../../popover';
import { ICascaderItem, CascaderSearchClickHandler } from '../types';
import { II18nLocaleCascader } from '../../i18n';
import { Checkbox } from '../../checkbox';
import BlockLoading from '../../loading/BlockLoading';
import { getNodeKey } from '../node-fns';
import { getPathValue } from '../path-fns';

const withPopover = Popover.withPopover;

export interface ISearchContentProps {
  // injected by withPopover
  popover: Popover;

  multiple: boolean;
  onOptionToggle: (path: ICascaderItem[], checked: boolean) => void;
  onOptionClick: CascaderSearchClickHandler;
  isSearching: boolean;
  keyword: string;
  searchList: Array<ICascaderItem[]>;
  highlight: (keyword: string, path: ICascaderItem[]) => React.ReactNode;
  i18n: II18nLocaleCascader;

  selectionMap: Map<string, 'on' | 'off' | 'partial'>;
}

class SearchContent extends Component<ISearchContentProps> {
  closePopup = () => this.props.popover?.close();

  onOptionClick(path: ICascaderItem[]) {
    const { onOptionClick } = this.props;
    onOptionClick(path, this.closePopup);
  }

  renderSearchingOrEmpty() {
    const { isSearching, i18n } = this.props;
    return (
      <div className="zent-cascader-v2--search-empty">
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
    const {
      searchList,
      multiple,
      highlight,
      keyword,
      selectionMap,
    } = this.props;

    return (
      <ul className="zent-cascader-v2--search-list">
        {searchList.map(path => {
          const leafNode = path[path.length - 1];
          const searchItemCls = cx('zent-cascader-v2--search-item', {
            'zent-cascader-v2--search-item--multiple': multiple,
          });

          let checkState: 'on' | 'off' | 'partial' | undefined;
          if (multiple) {
            checkState = selectionMap.get(getNodeKey(leafNode));
          }

          return (
            <li
              key={getPathValue(path)}
              className={searchItemCls}
              onClick={
                leafNode.disabled || multiple
                  ? undefined
                  : () => this.onOptionClick(path)
              }
            >
              {multiple && (
                <Checkbox
                  value={leafNode.value}
                  onChange={e =>
                    this.props.onOptionToggle(path, e.target.checked)
                  }
                  checked={checkState === 'on'}
                  disabled={leafNode.disabled}
                />
              )}
              {highlight(keyword, path)}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { isSearching, searchList } = this.props;

    return (
      <div className="zent-cascader-v2__popup-inner zent-cascader-v2__popup-inner-search">
        {isSearching || !searchList.length
          ? this.renderSearchingOrEmpty()
          : this.renderPanels()}
      </div>
    );
  }
}

export default withPopover(SearchContent);
