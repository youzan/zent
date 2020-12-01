import { Component } from 'react';

import { BaseTrigger, ICascaderBaseTriggerProps } from './BaseTrigger';
import { ICascaderItem } from '../types';
import { getPathLabel } from '../path-fns';
import { SearchInput } from './Search';

export interface ISingleTriggerProps
  extends Omit<ICascaderBaseTriggerProps, 'selectedPaths'> {
  selectedPath: ICascaderItem[];
}

export class SingleTrigger extends Component<ISingleTriggerProps> {
  static defaultProps = {
    selectedPath: [],
  };

  onKeywordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onKeywordChange(e.target.value);
  };

  render() {
    const {
      className,
      visible,
      clearable,
      selectedPath,
      keyword,
      disabled,
      i18n,
      searchable,
      placeholder,
      onClick,
      onClear,
      onKeywordChange,
      renderValue,
    } = this.props;
    const showSearch = visible && searchable;
    const hasValue = selectedPath.length > 0;
    const inputPlaceholder = hasValue
      ? getPathLabel(selectedPath)
      : i18n.searchPlaceholder;
    const selectedPaths = hasValue ? [selectedPath] : [];

    return (
      <BaseTrigger
        disabled={disabled}
        className={className}
        clearable={clearable}
        visible={visible}
        onClear={onClear}
        selectedPaths={selectedPaths}
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        onClick={onClick}
        i18n={i18n}
        renderValue={renderValue}
        showLabels={!showSearch}
        placeholder={placeholder}
        searchable={searchable}
      >
        {showSearch && (
          <SearchInput
            placeholder={inputPlaceholder}
            value={keyword}
            onChange={this.onKeywordChange}
          />
        )}
      </BaseTrigger>
    );
  }
}
