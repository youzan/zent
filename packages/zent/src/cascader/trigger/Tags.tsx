import * as React from 'react';
import { ICascaderItem } from '../types';
import Tag from './Tag';

export interface ICascaderTagListProps<Item extends ICascaderItem> {
  list: Array<Item[]>;
  onRemove(item: Item): void;
  renderValue?: (items: Item[]) => React.ReactNode;
}

function CascaderTagList(props: ICascaderTagListProps<ICascaderItem>) {
  const { list, renderValue, onRemove } = props;

  return (
    <>
      {list.map(items => (
        <Tag
          key={items.map(li => li.value).join('-')}
          items={items}
          onRemove={onRemove}
          renderValue={renderValue}
        />
      ))}
    </>
  );
}

export default React.memo(CascaderTagList);
