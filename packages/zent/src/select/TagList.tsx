import { memo } from 'react';
import type { ISelectItem, ISelectCommonProps } from './Select';
import Tag from './Tag';

export interface ISelectTagListProps<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
> {
  list: Item[];
  onRemove(item: Item): void;
  renderValue?: ISelectCommonProps<Key, Item>['renderValue'];
}

function SelectTagList<
  Key extends string | number = string | number,
  Item extends ISelectItem<Key> = ISelectItem<Key>
>({ list, onRemove, renderValue }: ISelectTagListProps<Key, Item>) {
  return (
    <>
      {list.map(it => (
        <Tag
          key={it.key}
          item={it}
          onRemove={onRemove}
          renderValue={renderValue as any}
        />
      ))}
    </>
  );
}

export default memo(SelectTagList);
