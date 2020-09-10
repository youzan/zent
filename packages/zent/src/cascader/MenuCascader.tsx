import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import MenuContent from './components/MenuContent';
import {
  union,
  difference,
  getPathValue,
  getPathLabel,
  getPathToNode,
} from './path-fns';
import { getNodeKey } from './node-fns';
import {
  ICascaderItem,
  CascaderValue,
  CascaderSearchClickHandler,
  CascaderChangeAction,
  CascaderLoadAction,
  ICascaderBaseProps,
  ICascaderChangeMeta,
  ICascaderLoadMeta,
  CascaderMenuClickHandler,
  CascaderMenuHoverHandler,
} from './types';
import SearchContent from './components/SearchContent';
import debounce from '../utils/debounce';
import TextMark from '../text-mark';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';
import { TagsTrigger } from './trigger/TagsTrigger';
import { SingleTrigger } from './trigger/SingleTrigger';
import { Forest } from './forest';
import noop from '../utils/noop';
import memorizeOne from '../utils/memorize-one';

export interface IMenuCascaderCommonProps extends ICascaderBaseProps {
  loadOptions?: (
    selectedOptions: ICascaderItem[] | null,
    meta: ICascaderLoadMeta
  ) => Promise<void>;
  expandTrigger?: 'click' | 'hover';
  scrollable?: boolean;
  /**
   * 滚动加载开启时，指定第一级数据是否还有更多数据
   */
  loadChildrenOnScroll?: boolean;
  searchable?: boolean;
  async?: boolean;
  asyncFilter?: (
    keyword: string,
    limit: number
  ) => Promise<Array<ICascaderItem[]>>;
  filter?: (keyword: string, items: ICascaderItem[]) => boolean;
  highlight?: (keyword: string, items: ICascaderItem[]) => React.ReactNode;
  limit?: number;
}

export interface IMenuCascaderSingleProps extends IMenuCascaderCommonProps {
  multiple?: false;
  value?: CascaderValue[];
  onChange: (
    value: CascaderValue[],
    selectedOptions: ICascaderItem[],
    meta: ICascaderChangeMeta
  ) => void;
}

export interface IMenuCascaderMultipleProps extends IMenuCascaderCommonProps {
  value?: Array<CascaderValue[]>;
  onChange: (
    value: Array<CascaderValue[]>,
    selectedOptions: Array<ICascaderItem[]>,
    meta: ICascaderChangeMeta
  ) => void;
  multiple?: boolean;
}

export type IMenuCascaderProps =
  | IMenuCascaderMultipleProps
  | IMenuCascaderSingleProps;

interface ICascaderState {
  options: Forest;

  activeValue: CascaderValue[];

  // 节点选中状态根据这个数据实时计算
  selectedPaths: Array<ICascaderItem[]>;
  visible: boolean;
  prevProps: IMenuCascaderProps;
  keyword: string;
  isSearching: boolean;
  searchResultList: Array<ICascaderItem[]>;

  // 当前正在加载状态的节点，e.g. 1-11-112
  loading: string[];
}

function isMultiple(
  props: IMenuCascaderProps
): props is IMenuCascaderMultipleProps {
  return props.multiple;
}

function isSingle(
  props: IMenuCascaderProps
): props is IMenuCascaderSingleProps {
  return !props.multiple;
}

const FILTER_DEBOUNCE_TIME = 200; // ms

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
      <span key={getPathValue(items.slice(0, index + 1))}>
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

function getActiveValue(props: IMenuCascaderProps) {
  let activeValue: CascaderValue[] = [];
  if (isMultiple(props) && props.value.length > 0) {
    activeValue = props.value[0];
  }
  if (isSingle(props)) {
    activeValue = props.value;
  }

  return activeValue;
}

function getSelectedPaths(props: IMenuCascaderProps, options: Forest) {
  let selectedPaths = isMultiple(props)
    ? props.value.map(x => options.getPathByValue(x))
    : [options.getPathByValue(props.value)];

  // don't return nested empty array
  if (selectedPaths.length === 1 && selectedPaths[0].length === 0) {
    selectedPaths = [];
  }

  return selectedPaths;
}

function toggleLoading(
  loading: string[],
  val: string,
  isLoading: boolean
): string[] {
  const contains = loading.indexOf(val) !== -1;
  if (isLoading && !contains) {
    return loading.concat(val);
  }

  if (!isLoading && contains) {
    return loading.filter(v => v !== val);
  }

  return loading;
}

export class MenuCascader extends React.Component<
  IMenuCascaderProps,
  ICascaderState
> {
  static defaultProps = {
    value: [],
    options: [],
    changeOnSelect: false,
    clearable: false,
    multiple: false,
    expandTrigger: 'click',
    scrollable: false,
    loadChildrenOnScroll: false,
    searchable: false,
    async: false,
    limit: 50,
    renderValue: getPathLabel,
    filter: defaultFilter,
    highlight: defaultHighlight,
  };

  constructor(props: IMenuCascaderProps) {
    super(props);

    const options = new Forest(props.options);
    this.state = {
      options,
      activeValue: getActiveValue(props),
      visible: false,
      prevProps: props,
      selectedPaths: getSelectedPaths(props, options),
      keyword: '',
      isSearching: false,
      searchResultList: [],
      loading: [],
    };
  }

  static contextType = DisabledContext;
  context!: IDisabledContext;

  static getDerivedStateFromProps(
    nextProps: IMenuCascaderProps,
    { prevProps, options }: ICascaderState
  ) {
    const newState: Partial<ICascaderState> = {
      prevProps: nextProps,
    };
    if (prevProps.options !== nextProps.options) {
      options = new Forest(nextProps.options);
      newState.options = options;
    }

    if (!shallowEqual(prevProps.value, nextProps.value)) {
      newState.selectedPaths = getSelectedPaths(nextProps, options);
    }

    return newState;
  }

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  // 根据选中信息生成所有节点的选中状态表 O(n)
  getSelectionMap = memorizeOne((selectedPaths: Array<ICascaderItem[]>) => {
    return this.state.options.reduceNodeDfs((map, node) => {
      const key = getNodeKey(node);
      const { value } = node;

      // 叶子节点，判断是否在选中的路径中；叶子节点不可能是 partial 状态
      if (node.children.length === 0) {
        const selected = selectedPaths.some(
          path => path[path.length - 1].value === value
        );
        map.set(key, selected ? 'on' : 'off');
      } else {
        // 忽略禁用的选项
        const children = node.children.filter(n => !n.disabled);
        const childrenState = children.reduce(
          (acc, n) => {
            const k = getNodeKey(n);
            const v = map.get(k);

            if (v === 'on') {
              acc.on += 1;
            } else if (v === 'off') {
              acc.off += 1;
            }

            return acc;
          },
          { on: 0, off: 0 }
        );

        const childrenCount = children.length;
        if (childrenState.on === childrenCount && childrenCount > 0) {
          map.set(key, 'on');
        } else if (childrenState.off === childrenCount) {
          map.set(key, 'off');
        } else {
          map.set(key, 'partial');
        }
      }

      return map;
    }, new Map<string, 'on' | 'off' | 'partial'>());
  });

  // 搜索返回的结果列表中可能没有树状结构，这里根据 value 从当前的 options 里换取树结构中的节点
  getSearchResultList = memorizeOne(
    (options: Forest, resultList: Array<ICascaderItem[]>) => {
      return resultList.map(path => {
        const values = path.map(x => x.value);
        return options.getPathByValue(values);
      });
    }
  );

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
    const { keyword, options } = this.state;

    if (!keyword) {
      return;
    }

    const { async, asyncFilter, filter, limit } = this.props;
    if (async) {
      this.setState({ isSearching: true });

      asyncFilter(keyword, limit)
        .then(searchList => {
          this.setSearchState(searchList);
        })
        .finally(() => {
          this.setState({ isSearching: false });
        });
    } else {
      const searchList = options
        .reducePath((acc, path) => {
          acc.push(path);
          return acc;
        }, [])
        .filter(items => filter(keyword, items));
      this.setSearchState(searchList);
    }
  }, FILTER_DEBOUNCE_TIME);

  setSearchState = (searchList: Array<ICascaderItem[]>) => {
    const { limit } = this.props;
    const size = searchList.length;

    this.setState({
      searchResultList: limit <= size ? searchList : searchList.slice(0, limit),
    });
  };

  onMenuOptionHover: CascaderMenuHoverHandler = item => {
    this.onMenuOptionSelect(item, noop, 'hover');
  };

  onMenuOptionClick: CascaderMenuClickHandler = (item, closePopup) => {
    this.onMenuOptionSelect(item, closePopup, 'click');
  };

  onMenuOptionSelect = (
    item: ICascaderItem,
    closePopup: () => void,
    source: 'click' | 'hover'
  ) => {
    const { loadOptions, changeOnSelect, multiple } = this.props;
    const { loading } = this.state;
    const needLoading = item.loadChildrenOnExpand && loadOptions;

    const selectedOptions = getPathToNode(item);
    const newValue = selectedOptions.map(n => n.value);

    const newState: Partial<ICascaderState> = {
      activeValue: newValue,
      keyword: '',
    };

    const hasChildren = item.children && item.children.length > 0;
    const needClose =
      !item.loadChildrenOnExpand &&
      !hasChildren &&
      !multiple &&
      source === 'click';

    const needTriggerChange =
      needClose || (changeOnSelect && source === 'click');

    // 设置 loading 状态
    const itemKey = getNodeKey(item);
    if (needLoading) {
      newState.loading = toggleLoading(loading, itemKey, true);
    }

    this.setState(newState as ICascaderState, () => {
      if (needLoading) {
        loadOptions(selectedOptions, {
          action: CascaderLoadAction.LoadChildren,
        }).finally(() => {
          // 结束 loading 状态
          this.setState(state => {
            return {
              loading: toggleLoading(state.loading, itemKey, false),
            };
          });
        });
      }

      if (isSingle(this.props)) {
        if (needTriggerChange) {
          this.props.onChange(
            selectedOptions.map(it => it.value),
            selectedOptions,
            { action: CascaderChangeAction.Change }
          );
        }
      }

      if (needClose) {
        closePopup();
      }
    });
  };

  /**
   * 复选框勾选/取消勾选才会触发，所以仅适用于多选场景
   */
  toggleMenuOption = (item: ICascaderItem, checked: boolean) => {
    if (isMultiple(this.props)) {
      const { onChange } = this.props;
      const { options, selectedPaths: oldSelectedPaths } = this.state;

      const affectedPaths = options.getPaths(item);
      let selectedPaths = checked
        ? union(oldSelectedPaths, affectedPaths)
        : difference(oldSelectedPaths, affectedPaths);
      selectedPaths = options.sort(selectedPaths);

      const value = selectedPaths.map(list => list.map(node => node.value));

      this.setState({ selectedPaths }, () => {
        onChange(value, selectedPaths, {
          action: CascaderChangeAction.Change,
        });
      });
    }
  };

  onSearchOptionClick: CascaderSearchClickHandler = (items, closePopup) => {
    const activeValue = items.map(item => item.value);

    this.setState({ activeValue }, () => {
      this.onMenuOptionClick(items[items.length - 1], closePopup);
    });
  };

  toggleSearchOption = (items: ICascaderItem[], checked: boolean) => {
    this.toggleMenuOption(items[items.length - 1], checked);
  };

  onClear = () => {
    this.setState(
      {
        activeValue: [],
        selectedPaths: [],
        visible: false,
      },
      () => {
        this.props.onChange([], [], { action: CascaderChangeAction.Clear });
      }
    );
  };

  scrollLoad = (parent: ICascaderItem | null) => {
    const { loadOptions } = this.props;
    // 判断是否要加载更多
    const currentHasMore = parent
      ? parent.loadChildrenOnScroll
      : this.props.loadChildrenOnScroll;

    if (currentHasMore === false) {
      return Promise.resolve();
    }

    const selectedOptions = getPathToNode(parent);
    return loadOptions(selectedOptions, {
      action: CascaderLoadAction.Scroll,
    });
  };

  onRemove = (item: ICascaderItem) => {
    if (this.disabled) {
      return;
    }

    // 只有多选情况下才存在移除，即取消叶子节点的选中
    this.toggleMenuOption(item, false);
  };

  renderPopoverContent = (i18n: II18nLocaleCascader) => {
    const {
      expandTrigger,
      scrollable,
      multiple,
      searchable,
      highlight,
      loadChildrenOnScroll,
    } = this.props;
    const {
      options,
      activeValue,
      visible,
      keyword,
      isSearching,
      searchResultList,
      loading,
      selectedPaths,
    } = this.state;

    if (searchable && visible && keyword) {
      return (
        <SearchContent
          i18n={i18n}
          multiple={multiple}
          isSearching={isSearching}
          searchList={this.getSearchResultList(options, searchResultList)}
          keyword={keyword}
          highlight={highlight}
          onOptionToggle={this.toggleSearchOption}
          onOptionClick={this.onSearchOptionClick}
          selectionMap={this.getSelectionMap(selectedPaths)}
        />
      );
    }

    return (
      <MenuContent
        value={activeValue}
        options={options.getTrees()}
        expandTrigger={expandTrigger}
        i18n={i18n}
        scrollable={scrollable}
        loadChildrenOnScroll={loadChildrenOnScroll}
        multiple={multiple}
        onOptionClick={this.onMenuOptionClick}
        onOptionHover={this.onMenuOptionHover}
        scrollLoad={this.scrollLoad}
        onOptionToggle={this.toggleMenuOption}
        loading={loading}
        selectionMap={this.getSelectionMap(selectedPaths)}
      />
    );
  };

  render() {
    const {
      className,
      popupClassName,
      placeholder,
      multiple,
      searchable,
      clearable,
      renderValue,
    } = this.props;
    const { visible, selectedPaths, keyword } = this.state;
    const hasValue = selectedPaths.length > 0;

    return (
      <Receiver componentName="Cascader">
        {(i18n: II18nLocaleCascader) => {
          const triggerCommonProps = {
            placeholder,
            disabled: this.disabled,
            className,
            clearable,
            visible,
            keyword,
            searchable,
            i18n,
            renderValue,
            onClear: this.onClear,
            onKeywordChange: this.onKeywordChange,
          };

          return (
            <Popover
              className={cx('zent-cascader__popup', popupClassName)}
              position={Popover.Position.AutoBottomLeftInViewport}
              visible={visible}
              onVisibleChange={this.onVisibleChange}
              cushion={4}
            >
              <Popover.Trigger.Click toggle={!searchable}>
                {multiple ? (
                  <TagsTrigger
                    {...triggerCommonProps}
                    selectedPaths={selectedPaths}
                    onRemove={this.onRemove}
                  />
                ) : (
                  <SingleTrigger
                    {...triggerCommonProps}
                    selectedPath={hasValue ? selectedPaths[0] : []}
                  />
                )}
              </Popover.Trigger.Click>
              <Popover.Content>
                {this.renderPopoverContent(i18n)}
              </Popover.Content>
            </Popover>
          );
        }}
      </Receiver>
    );
  }
}

export default MenuCascader;
