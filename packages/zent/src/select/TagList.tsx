import * as React from 'react';
import { ISelectItem } from './Select';
import Tag from './Tag';

export interface ISelectTagListProps<Item extends ISelectItem> {
  list: Item[];
  onRemove(item: Item): void;
}

function SelectTagList<Item extends ISelectItem>({
  list,
  onRemove,
}: ISelectTagListProps<Item>) {
  return (
    <>
      {list.map(it => (
        <Tag key={it.key} item={it} onRemove={onRemove} />
      ))}
    </>
  );
}

export default React.memo(SelectTagList);
