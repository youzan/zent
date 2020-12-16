import { memo } from 'react';
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
    <div className="zent-select-v2-tag">
      {renderValue ? (
        renderValue(item)
      ) : (
        <span className="zent-select-v2-tag-text">{item.text}</span>
      )}
      <Icon
        type="close"
        className="zent-select-v2-tag-close"
        onClick={e => {
          e.stopPropagation();
          onRemove(item);
        }}
      />
    </div>
  );
}

export default memo(SelectTag);
