import * as React from 'react';

import { ICascaderItem, ICascaderBaseTriggerProps } from '../types';
import { SearchInput } from './Search';
import Tags from './Tags';
import { BaseTrigger } from './BaseTrigger';

interface IMultipleTriggerProps extends ICascaderBaseTriggerProps {
  onRemove: (item: ICascaderItem) => void;
}

export class MultipleTrigger extends React.Component<IMultipleTriggerProps> {
  static defaultProps = {
    selectedPaths: [],
  };

  onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onKeywordChange(e.target.value);
  };

  render() {
    const {
      className,
      visible,
      clearable,
      selectedPaths,
      keyword,
      disabled,
      i18n,
      hasValue,
      searchable,
      placeholder,
      onClick,
      onClear,
      onKeywordChange,
      renderValue,
      onRemove,
    } = this.props;
    const showTags = hasValue;
    const showSearch = visible && searchable;

    return (
      <BaseTrigger
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        multiple
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
        hasValue={hasValue}
        showLabels={!showTags && !showSearch}
      >
        {showTags && (
          <Tags
            list={selectedPaths}
            renderValue={renderValue}
            onRemove={onRemove}
          />
        )}
        {showSearch && (
          <SearchInput
            placeholder={i18n.searchPlaceholder}
            value={keyword}
            onChange={this.onKeywordChange}
          />
        )}
      </BaseTrigger>
    );
  }
}
