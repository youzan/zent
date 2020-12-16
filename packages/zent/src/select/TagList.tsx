import { memo } from 'react';
import type { ISelectItem, ISelectCommonProps } from './Select';
import Tag from './Tag';

export interface ISelectTagListProps<Item extends ISelectItem> {
  list: Item[];
  onRemove(item: Item): void;
  renderValue?: ISelectCommonProps<Item>['renderValue'];
}

function SelectTagList<Item extends ISelectItem>({
  list,
  onRemove,
  renderValue,
}: ISelectTagListProps<Item>) {
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
