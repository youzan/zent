import * as React from 'react';

import memoize from '../../utils/memorize-one';
import { II18nLocaleCascader } from '../../i18n';
import { BaseTrigger } from './BaseTrigger';
import { ICascaderItem, ICascaderBaseTriggerProps } from '../types';
import { getOptionsLabel } from '../utils';
import { SearchInput } from './Search';

interface ISingleTriggerProps extends ICascaderBaseTriggerProps {}

export class SingleTrigger extends React.Component<ISingleTriggerProps> {
  static defaultProps = {
    selectedPaths: [],
  };

  getSearchPlaceholder = memoize(
    (
      i18n: II18nLocaleCascader,
      selectedPaths: Array<ICascaderItem[]>
    ): string => {
      const placeholder = i18n.searchPlaceholder;

      if (!selectedPaths?.length) {
        return placeholder;
      }

      return getOptionsLabel(selectedPaths[0]);
    }
  );

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
    } = this.props;
    const showSearch = visible && searchable;

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
        hasValue={hasValue}
        placeholder={placeholder}
        searchable={searchable}
      >
        {showSearch && (
          <SearchInput
            placeholder={this.getSearchPlaceholder(i18n, selectedPaths)}
            value={keyword}
            onChange={this.onKeywordChange}
          />
        )}
      </BaseTrigger>
    );
  }
}
