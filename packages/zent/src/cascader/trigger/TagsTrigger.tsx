import cx from 'classnames';
import { Component, createRef, CSSProperties } from 'react';

import { CascaderItemSelectionState, ICascaderItem } from '../types';
import { ISearchInputImperativeHandlers, SearchInput } from './Search';
import Tags, { ICascaderTagsProps } from './Tags';
import { BaseTrigger, ICascaderBaseTriggerProps } from './BaseTrigger';

interface ITagsTriggerProps extends ICascaderBaseTriggerProps {
  onRemove: (node: ICascaderItem) => void;

  // 节点选中信息
  selectionMap: Map<string, CascaderItemSelectionState>;

  renderTags?: (
    props: Pick<ICascaderTagsProps, 'list' | 'renderValue' | 'onRemove'>
  ) => React.ReactNode;

  simplifyPaths: boolean;
  maxLine: number | 'unset';
}

export class TagsTrigger extends Component<ITagsTriggerProps> {
  static defaultProps = {
    selectedPaths: [],
  };

  searchInputRef = createRef<ISearchInputImperativeHandlers>();

  onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onKeywordChange(e.target.value);
  };

  focus() {
    this.searchInputRef.current?.focus();
  }

  render() {
    const {
      className,
      visible,
      clearable,
      selectedPaths,
      keyword,
      disabled,
      i18n,
      searchable,
      placeholder,
      onClick,
      onClear,
      onKeywordChange,
      renderValue,
      renderTags,
      onRemove,
      selectionMap,
      simplifyPaths,
      maxLine,
    } = this.props;
    const showTags = selectedPaths.length > 0;
    const showSearch = visible && searchable;
    const maxHeightStyle: CSSProperties = {};
    const tagHeight = 22;
    const containerSize = 14;
    if (maxLine > 1) {
      maxHeightStyle.maxHeight =
        (maxLine as number) * tagHeight + containerSize + 'px';
      maxHeightStyle.overflowY = 'auto';
    }

    return (
      <BaseTrigger
        placeholder={placeholder}
        disabled={disabled}
        className={cx(className, 'zent-cascader-v2--multiple', {
          'zent-cascader-v2--multiple--collapsed': maxLine === 1,
        })}
        style={maxHeightStyle}
        clearable={clearable}
        visible={visible}
        onClear={onClear}
        selectedPaths={selectedPaths}
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        onClick={onClick}
        i18n={i18n}
        renderValue={renderValue}
        searchable={searchable}
        showLabels={!showTags && !showSearch}
      >
        {showTags &&
          // Allow customize rendering of tag list
          (typeof renderTags === 'function' ? (
            renderTags({
              list: selectedPaths,
              renderValue,
              onRemove,
            })
          ) : (
            <Tags
              list={selectedPaths}
              selectionMap={selectionMap}
              simplifyPaths={simplifyPaths}
              renderValue={renderValue}
              collapse={maxLine === 1}
              onRemove={onRemove}
            />
          ))}
        {showSearch && (
          <SearchInput
            placeholder={i18n.searchPlaceholder}
            value={keyword}
            onChange={this.onKeywordChange}
            ref={this.searchInputRef}
          />
        )}
      </BaseTrigger>
    );
  }
}
