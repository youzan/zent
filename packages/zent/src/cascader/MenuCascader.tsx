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
  appendNodeInTree,
  flattenTree,
} from './common/utils';
import {
  ICascaderItem,
  CascaderHandler,
  CascaderValue,
  IMenuCascaderProps,
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

const defaultFilter = (keyword: string, items: ICascaderItem[]): boolean => {
  return items.some(item =>
    item.label.toLowerCase().includes(keyword.toLowerCase())
  );
};

const defaultHighlight = (
  keyword: string,
  items: ICascaderItem[]
): React.ReactNode => {
  return items.map((item, index) => {
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
};

interface ICascaderState {
  value: CascaderValue[] | Array<CascaderValue[]>;
  activeValue: CascaderValue[];
  // 多选时所有选中节点的数据
  multipleSelected: Array<ICascaderItem[]>;
  visible: boolean;
  prevProps: IMenuCascaderProps;
  scrollMore: boolean;
  keyword: string;
  isSearching: boolean;
  searchList: Array<ICascaderItem[]>;
  loading: boolean;
}

export class MenuCascader extends Component<
  IMenuCascaderProps,
  ICascaderState
> {
  constructor(props) {
    super(props);
    const value = props.value || [];
    const { multiple, options, scrollable } = props;

    if (multiple) {
      linkChildrenNode(options);
    }

    const activeValue = multiple && value.length > 0 ? value[0] : value;
    const multipleSelected = multiple
      ? updateTreeState(options, value as Array<CascaderValue[]>)
      : [];

    this.state = {
      value,
      activeValue,
      visible: false,
      prevProps: props,
      scrollMore: scrollable,
      multipleSelected,
      keyword: '',
      isSearching: false,
      searchList: [],
      loading: false,
    };
  }

  static defaultProps = {
    ...commonProps,
    multiple: false,
    expandTrigger: 'click',
    scrollable: false,
    searchable: false,
    async: false,
    limit: 50,
    filter: defaultFilter,
    highlight: defaultHighlight,
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
    const { multiple } = nextProps;

    if (prevProps.options !== nextProps.options) {
      if (multiple) {
        linkChildrenNode(nextProps.options);
      }
    }

    if (!shallowEqual(prevProps.value, nextProps.value)) {
      const newValue = nextProps.value || [];
      newState.value = newValue;

      if (multiple) {
        newState.multipleSelected = updateTreeState(
          nextProps.options,
          newValue as Array<CascaderValue[]>
        );
      } else {
        newState.activeValue = newValue as CascaderValue[];
      }
    }

    return newState;
  }

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  onVisibleChange = (visible: boolean) => {
    const { keyword } = this.state;
    if (this.disabled) {
      return;
    }

    this.setState({
      visible,
      keyword: visible === false ? '' : keyword,
    });
  };

  onKeywordChange = (keyword: string) => {
    this.setState({ keyword }, this.filterOptions);
  };

  filterOptions = debounce(() => {
    const { keyword } = this.state;
    const { async, options, loadOptions, filter } = this.props;

    if (keyword) {
      if (async) {
        this.setState({ isSearching: true });

        loadOptions(null, { keyword, action: CascaderLoadAction.Search })
          .then((searchList: Array<ICascaderItem[]>) => {
            this.setSearchState(searchList);
          })
          .finally(() => {
            this.setState({ isSearching: false });
          });
      } else {
        const searchList = flattenTree(options).filter(items =>
          filter(keyword, items)
        );
        this.setSearchState(searchList);
      }
    }
  }, FILTER_TIMEOUT);

  setSearchState = (searchList: Array<ICascaderItem[]>) => {
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
    const { loadOptions, changeOnSelect, options, multiple } = this.props;
    const { activeValue } = this.state;
    const needLoading =
      item.isLeaf === false &&
      loadOptions &&
      (!item.children || item.children.length === 0);

    let needClose = false;

    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    newValue.push(item.value);
    const selectedOptions = getPathInTree(newValue, options);

    const newState: Partial<ICascaderState> = {
      activeValue: newValue,
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
      newState.value = [...newValue];
    }

    this.setState(newState as ICascaderState, () => {
      if (!multiple) {
        if (needLoading) {
          item.loading = true;
          this.setState({ loading: true });

          loadOptions(selectedOptions, {
            action: CascaderLoadAction.Next,
          }).finally(() => {
            item.loading = false;
            this.setState({ loading: false });
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
        visible: false,
        multipleSelected: [],
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
    const currentHasMore = parent ? parent.hasMore : this.state.scrollMore;
    if (currentHasMore === false) {
      return Promise.resolve();
    }

    const { activeValue } = this.state;
    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    const selectedOptions = getPathInTree(newValue, options);

    return loadOptions(selectedOptions, {
      action: CascaderLoadAction.Scroll,
    }).then((hasMore: boolean) => {
      let { scrollMore } = this.state;

      if (parent) {
        parent.hasMore = hasMore;
      } else {
        scrollMore = hasMore;
      }

      this.setState({ scrollMore });
      closeLoading && closeLoading();
    });
  };

  handleChecked = (item: ICascaderItem, checked: boolean) => {
    const { options } = this.props;
    const multipleSelected = checkTreeNode(options, item, checked);
    const value = multipleSelected.map(list => list.map(node => node.value));

    this.setState({ multipleSelected }, () => {
      this.props.onChange(value, multipleSelected, {
        action: CascaderChangeAction.Change,
      });
    });
  };

  handleSearchOptionChecked = (items: ICascaderItem[], checked: boolean) => {
    const { options, async } = this.props;

    if (async) {
      // 将节点添加至树中
      appendNodeInTree(options, items);

      linkChildrenNode(options);
    }

    this.setState({ keyword: '' });
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
      highlight,
    } = this.props;
    const {
      activeValue,
      scrollMore,
      visible,
      keyword,
      isSearching,
      searchList,
    } = this.state;
    const showSearch = searchable && visible && keyword;

    return (
      <Popover.Content>
        {showSearch ? (
          <SearchContent
            i18n={i18n}
            multiple={multiple}
            isSearching={isSearching}
            searchList={searchList}
            keyword={keyword}
            highlight={highlight}
            handleSearchOptionChecked={this.handleSearchOptionChecked}
            searchClickHandler={this.searchClickHandler}
          />
        ) : (
          <MenuContent
            value={activeValue}
            options={options}
            expandTrigger={expandTrigger}
            i18n={i18n}
            scrollable={scrollable}
            scrollMore={scrollMore}
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
    const { visible, multipleSelected, activeValue, keyword } = this.state;
    const selectedOptions = getPathInTree(
      multiple ? activeValue : value,
      options
    );

    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          return (
            <Popover
              className={popupClassName}
              position={Popover.Position.AutoBottomLeftSticky}
              visible={visible}
              onVisibleChange={this.onVisibleChange}
              cushion={4}
            >
              <Popover.Trigger.Click toggle={!searchable}>
                <CascaderTrigger
                  className={className}
                  placeholder={placeholder}
                  renderValue={renderValue}
                  disabled={this.disabled}
                  selectedOptions={selectedOptions}
                  visible={visible}
                  clearable={clearable}
                  value={value}
                  i18n={i18n}
                  multiple={multiple}
                  searchable={searchable}
                  multipleSelected={multipleSelected}
                  keyword={keyword}
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
