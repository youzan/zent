import { memo, useCallback } from 'react';
import type { ISelectItem, ISelectCommonProps } from './Select';
import Icon from '../icon';

export interface ISelectTagProps<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
> {
  item: Item;
  onRemove(item: Item): void;
  renderValue?: ISelectCommonProps<Key, Item>['renderValue'];
}

function SelectTag<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
>({ item, onRemove, renderValue }: ISelectTagProps<Key, Item>) {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      onRemove(item);
    },
    [onRemove, item]
  );

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
        onClick={onClick}
      />
    </div>
  );
}

export default memo(SelectTag);
