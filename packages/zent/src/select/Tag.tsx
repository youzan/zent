import * as React from 'react';
import { ISelectItem } from './Select';
import Icon from '../icon';

export interface ISelectTagProps<Item extends ISelectItem> {
  item: Item;
  onRemove(item: Item): void;
  renderValue?: (item: Item) => void;
}

function SelectTag<Item extends ISelectItem>({
  item,
  onRemove,
  renderValue,
}: ISelectTagProps<Item>) {
  return (
    <div className="zent-select-tag">
      {renderValue ? (
        renderValue(item)
      ) : (
        <span className="zent-select-tag-inner">{item.text}</span>
      )}
      <Icon
        type="close"
        className="zent-select-tag-close"
        onClick={e => {
          e.stopPropagation();
          onRemove(item);
        }}
      />
    </div>
  );
}

export default React.memo(SelectTag);
