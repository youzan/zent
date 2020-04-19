import * as React from 'react';
import { Component } from 'react';
import Popover from '../popover';
import { II18nLocaleCascader } from '../i18n';
import MenuContent from './components/MenuContent';
import { commonProps } from './common/constants';
import CascaderTrigger from './trigger';
import {
  arrayTreeFilter,
  isEqualArrays,
  checkedTreeNode,
  linkedTreeNode,
  uncheckAllNode,
  initialCheckedNodes,
  flattenTree,
  appendNodeInTree,
} from './common/utils';
import {
  ICascaderItem,
  ICascaderHandler,
  ICascaderValue,
  IMenuCascaderProps,
  ICascaderSearchItem,
  ICascaderSearchClickHandler,
} from './types';
import SearchContent from './components/SearchContent';
import debounce from '../utils/debounce';

const PopoverContent = Popover.Content;
const FILTER_TIMEOUT = 500; // ms

// 默认的搜索方法
const searchFilterFn = (
  keyword: string,
  options: Array<ICascaderItem[]>
): ICascaderSearchItem[] => {
  const result = [] as ICascaderSearchItem[];
  options.forEach(items => {
    const display = items
      .map(item => item.label.replace(keyword, `<em>${keyword}</em>`))
      .join(' / ');

    const isMatch = display.indexOf('<em>') !== -1;
    if (isMatch) {
      result.push({
        items,
        display: <span dangerouslySetInnerHTML={{ __html: display }}></span>,
      });
    }
  });

  return result;
};

interface ICascaderState {
  value: ICascaderValue[] | Array<ICascaderValue[]>;
  activeValue: ICascaderValue[];
  // 多选时各子节点的选中状态
  checkedNodes: Array<ICascaderItem[]>;
  open: boolean;
  prevProps: IMenuCascaderProps;
  scrollHasMore: boolean;
  keyword: string;
  isSearching: boolean;
  flattenOptions: Array<ICascaderItem[]>;
  searchList: ICascaderSearchItem[];
}

export class MenuCascader extends Component<
  IMenuCascaderProps,
  ICascaderState
> {
  static defaultProps = {
    ...commonProps,
    multiple: false,
    expandTrigger: 'click',
    scrollable: false,
    searchable: false,
    limit: 50,
    filter: searchFilterFn,
  };

  static getDerivedStateFromProps(
    nextProps: IMenuCascaderProps,
    { prevProps }: ICascaderState
  ) {
    const newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };
    const { multiple, searchable, async } = nextProps;

    if (prevProps.options !== nextProps.options) {
      if (multiple) {
        linkedTreeNode(nextProps.options);
      }

      if (searchable && !async) {
        newState.flattenOptions = searchable
          ? flattenTree(nextProps.options)
          : [];
      }
    }

    if (!isEqualArrays(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value || [];
      newState.value = newValue;

      if (multiple) {
        newState.checkedNodes = initialCheckedNodes(
          nextProps.options,
          newValue as Array<ICascaderValue[]>
        );
      } else {
        newState.activeValue = newValue as ICascaderValue[];
      }
    }

    return newState;
  }

  constructor(props) {
    super(props);
    const value = props.value || [];
    const { multiple, options, searchable, async } = props;

    if (multiple) {
      linkedTreeNode(options);
    }

    const flattenOptions = searchable && !async ? flattenTree(options) : [];
    const initialActiveValue = multiple && value.length > 0 ? value[0] : value;
    const checkedNodes = multiple
      ? initialCheckedNodes(options, value as Array<ICascaderValue[]>)
      : [];

    this.state = {
      value,
      activeValue: initialActiveValue,
      open: false,
      prevProps: props,
      scrollHasMore: props.scrollable,
      checkedNodes,
      keyword: '',
      isSearching: false,
      flattenOptions,
      searchList: [],
    };
  }

  rerender() {
    this.setState({});
  }

  onVisibleChange = (open: boolean) => {
    const { keyword } = this.state;

    this.setState({
      open,
      keyword: open === false ? '' : keyword,
    });
  };

  onKeywordChange = (keyword: string) => {
    this.setState(
      { keyword, isSearching: keyword.length > 0 },
      this.debounceFilterOptions
    );
  };

  debounceFilterOptions = debounce(() => {
    const { keyword, flattenOptions } = this.state;
    const { async, loadOptions, filter } = this.props;

    if (keyword) {
      if (async) {
        loadOptions(null, { keyword, action: 'search' }).then(
          (searchList: ICascaderSearchItem[]) => {
            this.setSearchState(searchList);
          }
        );
      } else {
        const searchList = filter(keyword, flattenOptions) || [];
        this.setSearchState(searchList);
      }
    }
  }, FILTER_TIMEOUT);

  setSearchState = (searchList: ICascaderSearchItem[]) => {
    const { limit } = this.props;

    this.setState({
      searchList: limit === false ? searchList : searchList.slice(0, limit),
      isSearching: false,
    });
  };

  clickHandler: ICascaderHandler<ICascaderItem> = (
    item: ICascaderItem,
    stage: number,
    popover,
    triggerType = 'click'
  ) => {
    if (item.disabled) {
      return;
    }

    const { loadOptions, changeOnSelect, options, multiple } = this.props;
    const { activeValue } = this.state;
    const needLoading =
      item.isLeaf === false &&
      loadOptions &&
      (!item.children || item.children.length === 0);

    let needClose = false;

    const newValues = activeValue.slice(0, stage - 1) as ICascaderValue[];
    newValues.push(item.value);
    const selectedOptions = arrayTreeFilter(newValues, options);

    const obj: Partial<ICascaderState> = {
      activeValue: newValues,
      keyword: '',
    };

    if (
      !(item.children || item.isLeaf === false) &&
      triggerType === 'click' &&
      !multiple
    ) {
      needClose = true;
      popover.close();
    }

    // 是否需要触发 props.onChange，选择即改变时最后一级需要点击触发浮层关闭
    const needTriggerChange =
      needClose || (changeOnSelect && triggerType === 'click');

    if (needTriggerChange && !multiple) {
      obj.value = [...newValues];
    }

    this.setState(obj as ICascaderState, () => {
      if (!multiple) {
        if (needLoading) {
          item.loading = true;
          this.rerender();

          loadOptions(selectedOptions, { action: 'next' }).finally(() => {
            item.loading = false;
            this.rerender();
          });
        }

        if (needTriggerChange) {
          this.props.onChange(
            selectedOptions.map(it => it.value),
            selectedOptions,
            { action: 'change' }
          );
        }
      }
    });
  };

  searchClickHandler: ICascaderSearchClickHandler = (
    items: ICascaderItem[],
    popover
  ) => {
    const { multiple, options } = this.props;

    if (multiple) {
      return;
    }

    // 将节点添加至树中
    appendNodeInTree(options, items);

    const activeValue = items.map(item => item.value);
    const stage = items.length;

    this.setState({ activeValue }, () => {
      this.clickHandler(items[stage - 1], stage, popover);
    });
  };

  onClear = () => {
    const { multiple, options } = this.props;

    if (multiple) {
      uncheckAllNode(options);
    }

    this.setState(
      {
        value: [],
        activeValue: [],
        open: false,
        checkedNodes: [],
      },
      () => {
        this.props.onChange([], [], { action: 'clear' });
      }
    );
  };

  scrollLoadMore = (
    closeLoading: () => void,
    parent: ICascaderItem | null,
    stage: number
  ) => {
    const { loadOptions, options } = this.props;
    // 判断是否要加载更多
    const currentHasMore = parent ? parent.hasMore : this.state.scrollHasMore;
    if (currentHasMore === false) {
      return Promise.resolve();
    }

    const { activeValue } = this.state;
    const newValues = activeValue.slice(0, stage - 1) as ICascaderValue[];
    const selectedOptions = arrayTreeFilter(newValues, options);

    return loadOptions(selectedOptions, { action: 'scroll' }).then(
      (hasMore: boolean) => {
        let { scrollHasMore } = this.state;

        if (parent) {
          parent.hasMore = hasMore;
        } else {
          scrollHasMore = hasMore;
        }

        this.setState({ scrollHasMore });
        closeLoading && closeLoading();
      }
    );
  };

  handleChecked = (item: ICascaderItem, checked: boolean) => {
    const { options } = this.props;
    const checkedNodes = checkedTreeNode(options, item, checked);
    const value = checkedNodes.map(list => list.map(node => node.value));

    this.setState({ checkedNodes }, () => {
      this.props.onChange(value, checkedNodes, { action: 'change' });
    });
  };

  handleSearchChecked = (items: ICascaderItem[], checked: boolean) => {
    const { options } = this.props;

    // 将节点添加至树中
    appendNodeInTree(options, items);

    linkedTreeNode(options);

    this.handleChecked(items[items.length - 1], checked);
  };

  getPopoverContent = (i18n: II18nLocaleCascader) => {
    const {
      options,
      expandTrigger,
      scrollable,
      multiple,
      searchable,
    } = this.props;
    const {
      activeValue,
      scrollHasMore,
      open,
      keyword,
      isSearching,
      searchList,
    } = this.state;
    const showSearch = searchable && open && keyword;

    return (
      <PopoverContent>
        {showSearch ? (
          <SearchContent
            i18n={i18n}
            multiple={multiple}
            isSearching={isSearching}
            searchList={searchList}
            handleSearchChecked={this.handleSearchChecked}
            searchClickHandler={this.searchClickHandler}
          />
        ) : (
          <MenuContent
            value={activeValue}
            options={options}
            expandTrigger={expandTrigger}
            i18n={i18n}
            scrollable={scrollable}
            scrollHasMore={scrollHasMore}
            multiple={multiple}
            clickHandler={this.clickHandler}
            scrollLoadMore={this.scrollLoadMore}
            handleChecked={this.handleChecked}
          />
        )}
      </PopoverContent>
    );
  };

  render() {
    const {
      className,
      popupClassName,
      placeholder,
      displayRender,
      disabled,
      multiple,
      searchable,
      clearable,
      options,
      value,
    } = this.props;
    const { open, checkedNodes, activeValue, keyword } = this.state;
    const selectedOptions = arrayTreeFilter(
      multiple ? activeValue : value,
      options
    );
    const passProps = {
      className,
      popupClassName,
      placeholder,
      displayRender,
      disabled,
      value,
      selectedOptions,
      open,
      multiple,
      searchable,
      clearable,
      checkedNodes,
      keyword,
    };

    return (
      <CascaderTrigger
        {...passProps}
        onClear={this.onClear}
        onVisibleChange={this.onVisibleChange}
        getPopoverContent={this.getPopoverContent}
        position={Popover.Position.AutoBottomLeftSticky}
        onRemove={this.handleChecked}
        onKeywordChange={this.onKeywordChange}
      />
    );
  }
}

export default MenuCascader;
