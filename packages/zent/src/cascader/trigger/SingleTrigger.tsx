import * as React from 'react';
import { Component } from 'react';
import BaseTrigger from './BaseTrigger';
import { II18nLocaleCascader } from '../../i18n';
import {
  ICascaderItem,
  CascaderValue,
  ICascaderBaseTriggerProps,
} from '../types';
import memoize from '../../utils/memorize-one';
import { getOptionsLabel } from '../common/utils';
import Search from './Search';

interface ISingleTriggerProps extends ICascaderBaseTriggerProps {
  value: CascaderValue[];
}

export class SingleTrigger extends Component<ISingleTriggerProps> {
  static defaultProps = {
    selectedPaths: [],
  };

  getSearchPlaceholder = memoize(
    (
      i18n: II18nLocaleCascader,
      selectedPaths: Array<ICascaderItem[]>,
      value: CascaderValue[] | Array<CascaderValue[]>
    ): string => {
      const placeholder = i18n.searchPlaceholder;

      if (!value?.length) {
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
      value,
      hasValue,
      searchable,
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
      >
        {showSearch && (
          <Search
            placeholder={this.getSearchPlaceholder(i18n, selectedPaths, value)}
            value={keyword}
            onChange={this.onKeywordChange}
          />
        )}
      </BaseTrigger>
    );
  }
}

export default SingleTrigger;
