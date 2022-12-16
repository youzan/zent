import cx from 'classnames';
import { Component, createRef, CSSProperties, PropsWithChildren } from 'react';

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
  maxLine: number | null;
  lineHeight: number;
}

export class TagsTrigger extends Component<
  PropsWithChildren & ITagsTriggerProps
> {
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

  renderTagsContent() {
    const {
      selectedPaths,
      renderValue,
      onRemove,
      selectionMap,
      simplifyPaths,
      maxLine,
      lineHeight,
    } = this.props;
    const tagEl = (
      <Tags
        list={selectedPaths}
        selectionMap={selectionMap}
        simplifyPaths={simplifyPaths}
        renderValue={renderValue}
        collapse={maxLine === 1}
        onRemove={onRemove}
      />
    );
    const maxHeightStyle: CSSProperties = {};
    if (maxLine > 1) {
      maxHeightStyle.maxHeight = maxLine * lineHeight + 'px';
      maxHeightStyle.overflowY = 'auto';
      return (
        <div style={maxHeightStyle} className="zent-cascader-v2-tag__list">
          {tagEl}
        </div>
      );
    }
    return tagEl;
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
      maxLine,
    } = this.props;
    const showTags = selectedPaths.length > 0;
    const showSearch = visible && searchable;

    return (
      <BaseTrigger
        placeholder={placeholder}
        disabled={disabled}
        className={cx(className, 'zent-cascader-v2--multiple', {
          'zent-cascader-v2--multiple--collapsed': maxLine === 1,
        })}
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
          (typeof renderTags === 'function'
            ? renderTags({
                list: selectedPaths,
                renderValue,
                onRemove,
              })
            : this.renderTagsContent())}
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
