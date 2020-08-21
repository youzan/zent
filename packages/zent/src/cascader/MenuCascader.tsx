import * as React from 'react';
import { Component } from 'react';
import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import MenuContent from './components/MenuContent';
import { commonProps } from './common/constants';
import CascaderTrigger from './trigger';
import {
  getPathInTree,
  checkTreeNode,
  linkChildrenNode,
  uncheckAll,
  updateTreeState,
  flattenTree,
  appendNodeInTree,
} from './common/utils';
import {
  ICascaderItem,
  CascaderHandler,
  CascaderValue,
  IMenuCascaderProps,
  ICascaderSearchItem,
  CascaderSearchClickHandler,
  CascaderChangeAction,
  CascaderLoadAction,
} from './types';
import SearchContent from './components/SearchContent';
import debounce from '../utils/debounce';
import TextMark from '../text-mark';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';

const FILTER_TIMEOUT = 200; // ms

const defaultSearchFilter = (
  keyword: string,
  options: Array<ICascaderItem[]>
): ICascaderSearchItem[] => {
  const filterOptions = options.filter(items =>
    items.some(item => item.label.indexOf(keyword) !== -1)
  );

  return filterOptions.map(items => {
    const display = items.map((item, index) => {
      return (
        <span key={index}>
          <TextMark
            searchWords={[keyword]}
            textToHighlight={item.label}
            highlightClassName="zent-cascader--highlight"
          />
          {index !== items.length - 1 && ' / '}
        </span>
      );
    });

    return {
      items,
      display,
    };
  });
};

interface ICascaderState {
  value: CascaderValue[] | Array<CascaderValue[]>;
  activeValue: CascaderValue[];
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
    async: false,
    limit: 50,
    filter: defaultSearchFilter,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

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
        linkChildrenNode(nextProps.options);
      }

      if (searchable && !async) {
        newState.flattenOptions = searchable
          ? flattenTree(nextProps.options)
          : [];
      }
    }

    if (!shallowEqual(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value || [];
      newState.value = newValue;

      if (multiple) {
        newState.checkedNodes = updateTreeState(
          nextProps.options,
          newValue as Array<CascaderValue[]>
        );
      } else {
        newState.activeValue = newValue as CascaderValue[];
      }
    }

    return newState;
  }

  constructor(props) {
    super(props);
    const value = props.value || [];
    const { multiple, options, searchable, async } = props;

    if (multiple) {
      linkChildrenNode(options);
    }

    const flattenOptions = searchable && !async ? flattenTree(options) : [];
    const initialActiveValue = multiple && value.length > 0 ? value[0] : value;
    const checkedNodes = multiple
      ? updateTreeState(options, value as Array<CascaderValue[]>)
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

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  rerender() {
    this.setState({});
  }

  onVisibleChange = (open: boolean) => {
    const { keyword } = this.state;
    if (this.disabled) {
      return;
    }

    this.setState({
      open,
      keyword: open === false ? '' : keyword,
    });
  };

  onKeywordChange = (keyword: string) => {
    this.setState({ keyword }, this.filterOptions);
  };

  filterOptions = debounce(() => {
    const { keyword, flattenOptions } = this.state;
    const { async, loadOptions, filter } = this.props;

    if (keyword) {
      if (async) {
        this.setState({ isSearching: true });

        loadOptions(null, { keyword, action: CascaderLoadAction.Search })
          .then((searchList: ICascaderSearchItem[]) => {
            this.setSearchState(searchList);
          })
          .finally(() => {
            this.setState({ isSearching: false });
          });
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
    });
  };

  clickHandler: CascaderHandler<ICascaderItem> = (
    item: ICascaderItem,
    level: number,
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

    const newValues = activeValue.slice(0, level - 1) as CascaderValue[];
    newValues.push(item.value);
    const selectedOptions = getPathInTree(newValues, options);

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

          loadOptions(selectedOptions, {
            action: CascaderLoadAction.Next,
          }).finally(() => {
            item.loading = false;
            this.rerender();
          });
        }

        if (needTriggerChange) {
          this.props.onChange(
            selectedOptions.map(it => it.value),
            selectedOptions,
            { action: CascaderChangeAction.Change }
          );
        }
      }
    });
  };

  searchClickHandler: CascaderSearchClickHandler = (
    items: ICascaderItem[],
    popover
  ) => {
    const { multiple, options, async } = this.props;

    if (multiple) {
      return;
    }

    if (async) {
      // 将节点添加至树中
      appendNodeInTree(options, items);
    }

    const activeValue = items.map(item => item.value);
    const level = items.length;

    this.setState({ activeValue }, () => {
      this.clickHandler(items[level - 1], level, popover);
    });
  };

  onClear = () => {
    const { multiple, options } = this.props;

    if (multiple) {
      uncheckAll(options);
    }

    this.setState(
      {
        value: [],
        activeValue: [],
        open: false,
        checkedNodes: [],
      },
      () => {
        this.props.onChange([], [], { action: CascaderChangeAction.Clear });
      }
    );
  };

  scrollLoadMore = (
    closeLoading: () => void,
    parent: ICascaderItem | null,
    level: number
  ) => {
    const { loadOptions, options } = this.props;
    // 判断是否要加载更多
    const currentHasMore = parent ? parent.hasMore : this.state.scrollHasMore;
    if (currentHasMore === false) {
      return Promise.resolve();
    }

    const { activeValue } = this.state;
    const newValues = activeValue.slice(0, level - 1) as CascaderValue[];
    const selectedOptions = getPathInTree(newValues, options);

    return loadOptions(selectedOptions, {
      action: CascaderLoadAction.Scroll,
    }).then((hasMore: boolean) => {
      let { scrollHasMore } = this.state;

      if (parent) {
        parent.hasMore = hasMore;
      } else {
        scrollHasMore = hasMore;
      }

      this.setState({ scrollHasMore });
      closeLoading && closeLoading();
    });
  };

  handleChecked = (item: ICascaderItem, checked: boolean) => {
    const { options } = this.props;
    const checkedNodes = checkTreeNode(options, item, checked);
    const value = checkedNodes.map(list => list.map(node => node.value));

    this.setState({ checkedNodes }, () => {
      this.props.onChange(value, checkedNodes, {
        action: CascaderChangeAction.Change,
      });
    });
  };

  handleSearchChecked = (items: ICascaderItem[], checked: boolean) => {
    const { options, async } = this.props;

    if (async) {
      // 将节点添加至树中
      appendNodeInTree(options, items);

      linkChildrenNode(options);
    }

    this.handleChecked(items[items.length - 1], checked);
  };

  onRemove = (item: ICascaderItem) => {
    if (this.disabled) {
      return;
    }

    // 只有多选情况下才存在移除，即取消叶子节点的选中
    this.handleChecked(item, false);
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
      <Popover.Content>
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
      </Popover.Content>
    );
  };

  render() {
    const {
      className,
      popupClassName,
      placeholder,
      renderValue,
      multiple,
      searchable,
      clearable,
      options,
      value,
    } = this.props;
    const { open, checkedNodes, activeValue, keyword } = this.state;
    const selectedOptions = getPathInTree(
      multiple ? activeValue : value,
      options
    );
    const passProps = {
      className,
      popupClassName,
      placeholder,
      renderValue,
      disabled: this.disabled,
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
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          return (
            <Popover
              className={popupClassName}
              position={Popover.Position.AutoBottomLeftSticky}
              visible={open}
              onVisibleChange={this.onVisibleChange}
              cushion={4}
            >
              <Popover.Trigger.Click toggle={!searchable}>
                <CascaderTrigger
                  {...passProps}
                  i18n={i18n}
                  onClear={this.onClear}
                  onRemove={this.onRemove}
                  onKeywordChange={this.onKeywordChange}
                />
              </Popover.Trigger.Click>
              {this.getPopoverContent(i18n)}
            </Popover>
          );
        }}
      </Receiver>
    );
  }
}

export default MenuCascader;
