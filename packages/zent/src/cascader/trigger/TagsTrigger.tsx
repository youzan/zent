import * as React from 'react';
import cx from 'classnames';

import { ICascaderItem } from '../types';
import { SearchInput } from './Search';
import Tags from './Tags';
import { BaseTrigger, ICascaderBaseTriggerProps } from './BaseTrigger';

interface ITagsTriggerProps extends ICascaderBaseTriggerProps {
  onRemove: (node: ICascaderItem) => void;
}

export class TagsTrigger extends React.Component<ITagsTriggerProps> {
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
      searchable,
      placeholder,
      onClick,
      onClear,
      onKeywordChange,
      renderValue,
      onRemove,
    } = this.props;
    const showTags = selectedPaths.length > 0;
    const showSearch = visible && searchable;

    return (
      <BaseTrigger
        placeholder={placeholder}
        disabled={disabled}
        className={cx(className, 'zent-cascader--multiple')}
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
