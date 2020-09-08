import * as React from 'react';
import cx from 'classnames';

import Popover from '../popover';
import { I18nReceiver as Receiver, II18nLocaleCascader } from '../i18n';
import MenuContent from './components/MenuContent';
import {
  getPathInTree,
  checkTreeNode,
  linkChildrenNode,
  uncheckAll,
  updateTreeState,
  appendNodeInTree,
  flattenTree,
  getOptionsValue,
  getOptionsLabel,
} from './utils';
import {
  ICascaderItem,
  CascaderHandler,
  CascaderValue,
  CascaderSearchClickHandler,
  CascaderChangeAction,
  CascaderLoadAction,
  ICascaderBaseProps,
  ICascaderChangeMeta,
  ICascaderLoadMeta,
} from './types';
import SearchContent from './components/SearchContent';
import debounce from '../utils/debounce';
import TextMark from '../text-mark';
import { DisabledContext, IDisabledContext } from '../disabled';
import shallowEqual from '../utils/shallowEqual';
import { TagsTrigger } from './trigger/TagsTrigger';
import { SingleTrigger } from './trigger/SingleTrigger';

export interface IMenuCascaderCommonProps extends ICascaderBaseProps {
  loadOptions?: (
    selectedOptions: ICascaderItem[] | null,
    meta: ICascaderLoadMeta
  ) => Promise<void | boolean>;
  expandTrigger?: 'click' | 'hover';
  scrollable?: boolean;
  searchable?: boolean;
  async?: boolean;
  asyncFilter?: (keyword: string) => Promise<Array<ICascaderItem[]>>;
  filter?: (keyword: string, items: ICascaderItem[]) => boolean;
  highlight?: (keyword: string, items: ICascaderItem[]) => React.ReactNode;
  limit?: number | false;
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
  value: CascaderValue[] | Array<CascaderValue[]>;
  activeValue: CascaderValue[];
  selectedPaths: Array<ICascaderItem[]>;
  visible: boolean;
  prevProps: IMenuCascaderProps;
  firstLevelHasMore: boolean;
  keyword: string;
  isSearching: boolean;
  searchList: Array<ICascaderItem[]>;
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
      <span key={getOptionsValue(items.slice(0, index + 1))}>
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
    searchable: false,
    async: false,
    limit: 50,
    renderValue: getOptionsLabel,
    filter: defaultFilter,
    highlight: defaultHighlight,
  };

  constructor(props: IMenuCascaderProps) {
    super(props);

    if (isMultiple(props)) {
      linkChildrenNode(props.options);
    }

    let activeValue: CascaderValue[] = [];
    if (isMultiple(props) && props.value.length > 0) {
      activeValue = props.value[0];
    }
    if (isSingle(props)) {
      activeValue = props.value;
    }

    const selectedPaths =
      (props.value.length > 0 &&
        updateTreeState(
          props.options,
          isMultiple(props) ? props.value : [props.value]
        )) ||
      [];

    this.state = {
      value: props.value,
      activeValue,
      visible: false,
      prevProps: props,
      firstLevelHasMore: props.scrollable,
      selectedPaths,
      keyword: '',
      isSearching: false,
      searchList: [],
    };
  }

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

      newState.selectedPaths =
        (newValue.length > 0 &&
          updateTreeState(
            nextProps.options,
            (multiple ? newValue : [newValue]) as Array<CascaderValue[]>
          )) ||
        [];

      const activeValue =
        multiple && newValue.length > 0 ? newValue[0] : newValue;
      newState.activeValue = activeValue as CascaderValue[];
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
    const { async, options, asyncFilter, filter } = this.props;

    if (keyword) {
      if (async) {
        this.setState({ isSearching: true });

        asyncFilter(keyword)
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
  }, FILTER_DEBOUNCE_TIME);

  setSearchState = (searchList: Array<ICascaderItem[]>) => {
    const { limit } = this.props;

    this.setState({
      searchList: limit === false ? searchList : searchList.slice(0, limit),
    });
  };

  onMenuOptionClick: CascaderHandler = (
    item: ICascaderItem,
    level: number,
    closePopup,
    triggerType = 'click'
  ) => {
    const { loadOptions, changeOnSelect, options, multiple } = this.props;
    const { activeValue } = this.state;
    const hasChildren = item.children && item.children.length > 0;
    const needLoading = item.isLeaf === false && !hasChildren && loadOptions;

    let needClose = false;

    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    newValue.push(item.value);
    const selectedOptions = getPathInTree(options, newValue);

    const newState: Partial<ICascaderState> = {
      activeValue: newValue,
      keyword: '',
    };

    if (
      !(hasChildren || item.isLeaf === false) &&
      triggerType === 'click' &&
      !multiple
    ) {
      needClose = true;
    }

    // 是否需要触发 props.onChange，选择即改变时最后一级需要点击触发浮层关闭
    const needTriggerChange =
      needClose || (changeOnSelect && triggerType === 'click');

    if (needTriggerChange && !multiple) {
      newState.value = [...newValue];
    }

    this.setState(newState as ICascaderState, () => {
      if (isSingle(this.props)) {
        if (needLoading) {
          item.loading = true;

          loadOptions(selectedOptions, {
            action: CascaderLoadAction.LoadChildren,
          }).finally(() => {
            item.loading = false;
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

      if (needClose) {
        closePopup();
      }
    });
  };

  onSearchOptionClick: CascaderSearchClickHandler = (
    items: ICascaderItem[],
    closePopup
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
      this.onMenuOptionClick(items[level - 1], level, closePopup);
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
        selectedPaths: [],
      },
      () => {
        this.props.onChange([], [], { action: CascaderChangeAction.Clear });
      }
    );
  };

  scrollLoad = (parent: ICascaderItem | null, level: number) => {
    const { loadOptions, options } = this.props;
    // 判断是否要加载更多
    const currentHasMore = parent
      ? parent.hasMore
      : this.state.firstLevelHasMore;
    if (currentHasMore === false) {
      return Promise.resolve();
    }

    const { activeValue } = this.state;
    const newValue = activeValue.slice(0, level - 1) as CascaderValue[];
    const selectedOptions = getPathInTree(options, newValue);

    return loadOptions(selectedOptions, {
      action: CascaderLoadAction.Scroll,
    }).then((hasMore: boolean) => {
      let { firstLevelHasMore } = this.state;

      if (parent) {
        parent.hasMore = hasMore;
      } else {
        firstLevelHasMore = hasMore;
      }

      this.setState({ firstLevelHasMore });
    });
  };

  /**
   * 复选框勾选/取消勾选才会触发，所以仅适用于多选场景
   */
  toggleMenuOption = (item: ICascaderItem, checked: boolean) => {
    if (isMultiple(this.props)) {
      const { options, onChange } = this.props;
      const selectedPaths = checkTreeNode(options, item, checked);
      const value = selectedPaths.map(list => list.map(node => node.value));

      this.setState({ selectedPaths }, () => {
        onChange(value, selectedPaths, {
          action: CascaderChangeAction.Change,
        });
      });
    }
  };

  toggleSearchOption = (items: ICascaderItem[], checked: boolean) => {
    const { options, async } = this.props;

    if (async) {
      // 将节点添加至树中
      appendNodeInTree(options, items);

      linkChildrenNode(options);
    }

    this.toggleMenuOption(items[items.length - 1], checked);
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
      options,
      expandTrigger,
      scrollable,
      multiple,
      searchable,
      highlight,
    } = this.props;
    const {
      activeValue,
      firstLevelHasMore,
      visible,
      keyword,
      isSearching,
      searchList,
    } = this.state;

    if (searchable && visible && keyword) {
      return (
        <SearchContent
          i18n={i18n}
          multiple={multiple}
          isSearching={isSearching}
          searchList={searchList}
          keyword={keyword}
          highlight={highlight}
          onOptionToggle={this.toggleSearchOption}
          onOptionClick={this.onSearchOptionClick}
        />
      );
    }

    return (
      <MenuContent
        value={activeValue}
        options={options}
        expandTrigger={expandTrigger}
        i18n={i18n}
        scrollable={scrollable}
        firstLevelHasMore={firstLevelHasMore}
        multiple={multiple}
        onClick={this.onMenuOptionClick}
        scrollLoad={this.scrollLoad}
        onOptionToggle={this.toggleMenuOption}
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
