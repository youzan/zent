import cx from 'classnames';
import { Component, createRef } from 'react';

import Popover from '../popover';
import TagList from './TagList';
import Option from './Option';
import Search from './Search';
import { DisabledContext, IDisabledContext } from '../disabled';
import WindowEventHandler from '../utils/component/WindowEventHandler';
import Icon from '../icon';
import { TextMark } from '../text-mark';
import { BlockLoading } from '../loading/BlockLoading';
import { Pop } from '../pop';
import { I18nReceiver as Receiver, II18nLocaleSelect } from '../i18n';
import memoize from '../utils/memorize-one';
import uniqueId from '../utils/uniqueId';

export interface ISelectItem<Key extends string | number = string | number> {
  key: Key;
  text: React.ReactNode;
  type?: 'header' | 'divider';
  disabled?: boolean;
}

export interface IOptionRenderer<Item extends ISelectItem> {
  (item: Item, index: number): React.ReactNode;
}

export interface ISelectCommonProps<Item extends ISelectItem> {
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
  options: Item[];
  isEqual: (a: Item, b: Item) => boolean;
  placeholder?: string;
  notFoundContent?: string;
  inline?: boolean;
  width: React.CSSProperties['width'];
  popupWidth?: React.CSSProperties['width'];
  filter?: ((keyword: string, item: Item) => boolean) | false;
  highlight?: (keyword: string, item: Item) => Item;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderOptionList<Item extends ISelectItem>(
    options: Item[],
    renderOption: IOptionRenderer<Item>
  ): React.ReactNode;
  renderValue?: (value: Item) => React.ReactNode;
  renderOptionContent?: (value: Item) => React.ReactNode;
  clearable?: boolean;
  loading?: boolean;
  creatable?: boolean;
  onCreate?: (text: string) => Promise<void>;
  isValidNewOption?: (keyword: string, options: Item[]) => boolean;
  collapsable?: boolean;
  collapseAt?: number;
  hideCollapsePop?: boolean;
  className?: string;
  disableSearch?: boolean;
}

export interface ISelectSingleProps<Item extends ISelectItem>
  extends ISelectCommonProps<Item> {
  value?: Item | null;
  multiple: false;
  onChange?: (value: Item | null) => void;
}

export interface ISelectMultiProps<Item extends ISelectItem>
  extends ISelectCommonProps<Item> {
  value?: Item[];
  multiple: true;
  onChange?: (value: Item[]) => void;
}

export type ISelectProps<Item extends ISelectItem = ISelectItem> =
  | ISelectSingleProps<Item>
  | ISelectMultiProps<Item>;

export interface ISelectState<Item extends ISelectItem> {
  open: boolean;
  active: boolean;
  keyword: string;
  value: null | Item | Item[];
  activeIndex: null | number;
  prevOptions: Item[];
  creating: boolean;
}

function defaultIsEqual<Item extends ISelectItem>(a: Item, b: Item) {
  return a.key === b.key;
}

function defaultFilter<Item extends ISelectItem>(
  keyword: string,
  option: Item
): boolean {
  if (typeof option.text !== 'string') {
    return true;
  }
  return option.text.toLowerCase().includes(keyword.toLowerCase());
}

function defaultRenderOptionList<Item extends ISelectItem>(
  options: Item[],
  renderOption: IOptionRenderer<Item>
) {
  return options.map(renderOption);
}

function isSelectable<Item extends ISelectItem>(item: Item) {
  return !!item && !item.disabled && !item.type;
}

function findNextSelectableOption<Item extends ISelectItem>(
  options: Item[],
  start: number
): number | null {
  for (let i = start; i < options.length; i += 1) {
    if (isSelectable(options[i])) {
      return i;
    }
  }
  return null;
}

function findPrevSelectableOption<Item extends ISelectItem>(
  options: Item[],
  start: number
) {
  for (let i = start; i >= 0; i -= 1) {
    if (isSelectable(options[i])) {
      return i;
    }
  }
  return null;
}

function defaultHighlight<Item extends ISelectItem>(
  keyword: string,
  option: Item
): React.ReactNode {
  if (typeof option.text !== 'string') {
    return option.text;
  }

  return (
    <TextMark
      searchWords={[keyword]}
      textToHighlight={option.text}
      highlightStyle={{ backgroundColor: 'initial', color: '#155bd4' }}
    />
  );
}

const DEFAULT_LOADING = (
  <div className="zent-select-v2-popup-loading">
    <BlockLoading
      loading
      icon="circle"
      height={96}
      iconSize={24}
      iconText="加载中"
    />
  </div>
);

function defaultIsValidNewOption(
  keyword: string,
  options: ISelectItem[]
): boolean {
  return options.every(
    it =>
      (typeof it.text === 'string' ? it.text.toLowerCase() : it.text) !==
      keyword.toLowerCase()
  );
}

// 允许创建的临时 key
const SELECT_CREATABLE_KEY = uniqueId('__ZENT_SELECT_CREATABLE_KEY__');

export class Select<Item extends ISelectItem = ISelectItem> extends Component<
  ISelectProps<Item>,
  ISelectState<Item>
> {
  static defaultProps = {
    isEqual: defaultIsEqual,
    renderOptionList: defaultRenderOptionList,
    filter: defaultFilter,
    isValidNewOption: defaultIsValidNewOption,
    highlight: defaultHighlight,
    width: 240,
    multiple: false,
    clearable: false,
    loading: false,
  };

  static contextType = DisabledContext;
  context!: IDisabledContext;

  elementRef = createRef<HTMLDivElement>();
  popoverRef = createRef<Popover>();
  inputRef = createRef<HTMLInputElement>();

  constructor(props: ISelectProps<Item>) {
    super(props);
    let value: null | Item | Item[];
    if (props.multiple) {
      value = props.value || [];
    } else {
      value = props.value || null;
    }
    this.state = {
      keyword: props.keyword || '',
      value,
      open: false,
      active: false,
      activeIndex: null,
      prevOptions: props.options,
      creating: false,
    };
  }

  get disabled() {
    const { disabled = this.context.value } = this.props;
    return disabled;
  }

  onVisibleChange = (open: boolean) => {
    if (this.disabled) {
      return;
    }
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      this.setState({
        open,
        active: open,
        activeIndex: null,
      });
    }

    // 关闭时清空搜索内容
    if (open === false) {
      this.resetKeyword();
    }
  };

  onSelect = (item: Item) => {
    if (!item || item.disabled || item.type || this.disabled) {
      return;
    }
    if (item.key === SELECT_CREATABLE_KEY) {
      this.onCreateClick();
      return;
    }

    if (this.props.multiple === false) {
      this.onVisibleChange(false);
      const { onChange } = this.props;
      if (onChange) {
        onChange(item);
      } else {
        this.setState({
          value: item,
        });
      }
    } else {
      const { onChange, isEqual } = this.props;
      const value = this.state.value as Item[];
      const valueIndex = value.findIndex(it => isEqual(it, item));
      this.focusSearchInput();
      const nextValue =
        valueIndex >= 0
          ? value.filter((_it, index) => index !== valueIndex)
          : value.concat([item]);

      if (onChange) {
        onChange(nextValue);
      } else {
        this.setState({
          value: nextValue,
        });
      }
    }
  };

  onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (this.disabled) {
      return;
    }
    this.resetKeyword(e.target.value);
  };

  resetKeyword(keyword = '') {
    const { onKeywordChange } = this.props;
    if (onKeywordChange) {
      onKeywordChange(keyword);
    } else {
      this.setState({
        keyword,
      });
    }
  }

  onRemove = (item: Item) => {
    if (this.disabled) {
      return;
    }

    const { value } = this.state;
    const { onChange, isEqual } = this.props as ISelectMultiProps<Item>;
    const nextValue = (value as Item[]).filter(it => !isEqual(item, it));
    this.focusSearchInput();
    if (onChange) {
      onChange(nextValue);
    } else {
      this.setState({
        value: nextValue,
      });
    }
  };

  onOptionMouseEnter = (index: number) => {
    if (this.disabled) {
      return;
    }
    this.setState({
      activeIndex: index,
    });
  };

  onOptionMouseLeave = (index: number) => {
    if (this.disabled) {
      return;
    }
    this.setState(state =>
      state.activeIndex === index
        ? {
            activeIndex: null,
          }
        : null
    );
  };

  selectCurrentIndex = () => {
    if (this.disabled) {
      return;
    }
    const { activeIndex, keyword } = this.state;
    const {
      creatable,
      options: _options,
      filter,
      isValidNewOption,
    } = this.props;

    const options = this.filterOptions(
      creatable,
      _options,
      filter,
      keyword,
      isValidNewOption
    );
    if (activeIndex !== null) {
      this.onSelect(options[activeIndex]);
    }
  };

  renderOption: IOptionRenderer<Item> = (option: Item, index: number) => {
    const {
      isEqual,
      multiple,
      renderOptionContent,
      highlight,
      filter,
    } = this.props;
    const { value, activeIndex, creating } = this.state;
    const selected =
      !!value &&
      (multiple
        ? (value as Item[]).findIndex(it => isEqual(it, option)) >= 0
        : isEqual(value as Item, option));

    let optionContent: React.ReactNode = null;
    let loading = false;
    if (option.key === SELECT_CREATABLE_KEY) {
      loading = creating;
      optionContent = (
        <Receiver componentName="Select">
          {(i18n: II18nLocaleSelect) => (
            <span className="zent-select-v2-option-text-highlight">
              {i18n.create}
              {option.text}
            </span>
          )}
        </Receiver>
      );
    } else if (renderOptionContent) {
      optionContent = renderOptionContent(option);
    } else {
      const keyword = this.state.keyword.trim();
      optionContent =
        filter !== false && keyword.length > 0
          ? highlight(keyword, option)
          : option.text;
    }

    return (
      <Option
        key={option.key}
        value={option}
        selected={selected}
        active={index === activeIndex}
        onSelect={this.onSelect}
        index={index}
        onMouseEnter={this.onOptionMouseEnter}
        onMouseLeave={this.onOptionMouseLeave}
        multiple={multiple}
        loading={loading}
      >
        {optionContent}
      </Option>
    );
  };

  globalClick = (e: MouseEvent) => {
    if (
      this.disabled ||
      this.state.open ||
      !this.state.active ||
      !this.elementRef.current ||
      !this.popoverRef.current
    ) {
      return;
    }
    if (!this.elementRef.current.contains(e.target as Element)) {
      this.setState({
        active: false,
      });
    }
  };

  onIndexChange = (delta: 1 | -1) => {
    if (this.disabled) {
      return;
    }
    this.setState(
      (state, { options: _options, creatable, filter, isValidNewOption }) => {
        const options = this.filterOptions(
          creatable,
          _options,
          filter,
          state.keyword,
          isValidNewOption
        );

        let nextIndex: number;
        if (state.activeIndex === null) {
          if (delta < 0) {
            nextIndex = options.length - 1;
          } else {
            nextIndex = 0;
          }
        } else {
          nextIndex = (state.activeIndex + delta) % options.length;
        }
        if (nextIndex >= options.length) {
          nextIndex = options.length - 1;
        }
        if (nextIndex < 0) {
          nextIndex = 0;
        }
        if (!isSelectable(options[nextIndex])) {
          let enabled: number | null;
          if (delta > 0) {
            enabled = findNextSelectableOption(options, nextIndex);
          } else {
            enabled = findPrevSelectableOption(options, nextIndex);
          }
          if (!enabled) {
            return null;
          }
          nextIndex = enabled;
        }
        if (state.activeIndex === nextIndex) {
          return null;
        }
        return {
          activeIndex: nextIndex,
        };
      }
    );
  };

  static getDerivedStateFromProps<Item extends ISelectItem = ISelectItem>(
    props: ISelectProps<Item>,
    state: ISelectState<Item>
  ): Partial<ISelectState<Item>> | null {
    const nextState: Partial<ISelectState<Item>> = {
      prevOptions: props.options,
    };
    if (typeof props.keyword === 'string') {
      nextState.keyword = props.keyword;
    }
    if (typeof props.open === 'boolean') {
      nextState.open = props.open;
      nextState.active = props.open;
    }
    if (props.multiple) {
      if (Array.isArray(props.value)) {
        nextState.value = props.value;
      }
    } else {
      if ('value' in props) {
        nextState.value = props.value;
      }
    }
    if (props.options !== state.prevOptions && state.activeIndex !== null) {
      if (!props.options.length) {
        nextState.activeIndex = null;
      } else {
        if (state.activeIndex >= props.options.length) {
          nextState.activeIndex = props.options.length - 1;
        }
      }
    }
    return nextState;
  }

  renderValue(i18n: II18nLocaleSelect) {
    const { placeholder, renderValue, multiple } = this.props;
    const { open } = this.state;

    if (multiple) {
      const value = this.state.value as Item[];

      if (value?.length > 0) {
        return this.renderTagList(value, i18n);
      }

      if (open) {
        return null;
      }
    } else {
      if (open) {
        return null;
      }
      const value = this.state.value as Item | null;
      if (value) {
        return renderValue ? (
          renderValue(value)
        ) : (
          <span className="zent-select-v2-text">{value.text}</span>
        );
      }
    }

    return <span className="zent-select-v2-placeholder">{placeholder}</span>;
  }

  renderTagCollapsedTrigger(value: Item[]) {
    return (
      <span className="zent-select-v2-tag-collapsed-trigger">
        +{value.length}
      </span>
    );
  }

  renderTagList(value: Item[], i18n: II18nLocaleSelect) {
    const {
      renderValue,
      collapsable,
      hideCollapsePop,
      collapseAt = 1,
    } = this.props;
    const tagsValue = collapsable ? value.slice(0, collapseAt) : value;
    const collapsedValue = value.slice(collapseAt);

    return (
      <>
        <TagList
          list={tagsValue}
          onRemove={this.onRemove}
          renderValue={renderValue}
        />
        {collapsable &&
          collapsedValue.length > 0 &&
          (!hideCollapsePop ? (
            <Pop
              trigger="hover"
              position="auto-top-center"
              cushion={15}
              content={
                <div className="zent-select-v2-tag-collapsed-content">
                  <div>
                    {collapsedValue.map((item, index) => {
                      return (
                        <span key={item.key}>
                          {renderValue ? renderValue(item) : item.text}
                          {index !== collapsedValue.length - 1 &&
                            i18n.tagSeparator}
                        </span>
                      );
                    })}
                  </div>
                </div>
              }
            >
              {this.renderTagCollapsedTrigger(collapsedValue)}
            </Pop>
          ) : (
            this.renderTagCollapsedTrigger(collapsedValue)
          ))}
      </>
    );
  }

  getSearchPlaceholder(): string {
    const { placeholder } = this.props;
    if (this.props.multiple) {
      if ((this.state.value as Item[]).length) {
        return '';
      }
      return placeholder;
    }
    const value = this.state.value as Item | null;
    if (!value || typeof value.text !== 'string') {
      return placeholder;
    }
    return value.text;
  }

  onClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { keyword } = this.state;
    this.focusSearchInput();

    if (keyword) {
      this.resetKeyword();
      return;
    }

    if (this.props.multiple) {
      const { onChange } = this.props as ISelectMultiProps<Item>;
      const value = [];
      if (onChange) {
        onChange(value);
      } else {
        this.setState({
          value,
        });
      }
    } else {
      const { onChange } = this.props as ISelectSingleProps<Item>;
      const value = null;
      if (onChange) {
        onChange(value);
      } else {
        this.setState({
          value,
        });
      }
    }
  };

  onCreateClick = () => {
    const { onCreate, multiple } = this.props;
    const { keyword } = this.state;

    if (onCreate) {
      this.setState({ creating: true });

      onCreate(keyword.trim())
        .then(() => {
          if (multiple) {
            this.focusSearchInput();
          } else {
            this.onVisibleChange(false);
          }
          this.resetKeyword();
        })
        .finally(() => {
          this.setState({ creating: false });
        });
    }
  };

  filterOptions = memoize(
    (
      creatable: boolean,
      options: Item[] = [],
      filter: ((keyword: string, item: Item) => boolean) | false,
      keyword: string,
      isValidNewOption: (keyword: string, options: Item[]) => boolean
    ): Item[] => {
      const filtered =
        filter !== false && keyword
          ? options.filter(it => filter(keyword, it))
          : options;

      const pendingCreateOption =
        creatable && keyword && isValidNewOption(keyword, options)
          ? [
              {
                key: SELECT_CREATABLE_KEY,
                text: keyword,
              },
            ]
          : [];

      return (pendingCreateOption as Item[]).concat(filtered);
    }
  );

  focusSearchInput = () => {
    // 命令式聚焦搜索框
    this.inputRef?.current?.focus();
  };

  renderPopoverContent(i18n: II18nLocaleSelect): React.ReactNode {
    const {
      notFoundContent,
      renderOptionList,
      loading,
      creatable,
      options,
      filter,
      isValidNewOption,
    } = this.props;
    const keyword = this.state.keyword.trim();

    if (loading) {
      return DEFAULT_LOADING;
    }

    const filtered = this.filterOptions(
      creatable,
      options,
      filter,
      keyword,
      isValidNewOption
    );
    return filtered?.length ? (
      renderOptionList(filtered, this.renderOption)
    ) : (
      <div className="zent-select-v2-popup-empty">
        {notFoundContent ?? i18n.empty}
      </div>
    );
  }

  render() {
    const { keyword, open: visible, active, value } = this.state;
    const {
      inline,
      width,
      clearable,
      multiple,
      popupWidth,
      collapsable,
      className,
      disableSearch,
    } = this.props;

    const notEmpty = multiple
      ? Array.isArray(value) && value.length > 0
      : value;
    const showClear = clearable && !this.disabled && (keyword || notEmpty);

    return (
      <>
        <Receiver componentName="Select">
          {(i18n: II18nLocaleSelect) => (
            <Popover
              ref={this.popoverRef}
              position={Popover.Position.AutoBottomLeft}
              visible={visible}
              onVisibleChange={this.onVisibleChange}
              className="zent-select-v2-popup"
              style={{ width: popupWidth ?? width }}
              cushion={4}
            >
              <Popover.Trigger.Click>
                <div
                  ref={this.elementRef}
                  className={cx('zent-select-v2', className, {
                    'zent-select-v2-inline': inline,
                    'zent-select-v2-active': active,
                    'zent-select-v2-visible': visible,
                    'zent-select-v2-disabled': this.disabled,
                    'zent-select-v2-clearable': showClear,
                    'zent-select-v2-multiple': multiple,
                    'zent-select-v2-collapsable': collapsable,
                  })}
                  style={{ width }}
                  onClick={this.focusSearchInput}
                >
                  {this.renderValue(i18n)}
                  {showClear && (
                    <Icon type="close-circle" onClick={this.onClear} />
                  )}
                  {!disableSearch && visible && (
                    <Search
                      placeholder={this.getSearchPlaceholder()}
                      value={keyword}
                      autoWidth={multiple}
                      onChange={this.onKeywordChange}
                      onIndexChange={this.onIndexChange}
                      onEnter={this.selectCurrentIndex}
                      ref={this.inputRef}
                    />
                  )}
                  <Icon type="down" />
                </div>
              </Popover.Trigger.Click>
              <Popover.Content>
                {this.renderPopoverContent(i18n)}
              </Popover.Content>
            </Popover>
          )}
        </Receiver>
        <WindowEventHandler
          eventName="click"
          listener={this.globalClick}
          options={{ capture: true }}
        />
      </>
    );
  }
}

export default Select;
