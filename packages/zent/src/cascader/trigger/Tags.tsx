import * as React from 'react';

import { ICascaderItem } from '../types';
import Tag from './Tag';
import { getPathValue } from '../path-fns';

export interface ICascaderTagsProps {
  list: Array<ICascaderItem[]>;
  onRemove(item: ICascaderItem): void;
  renderValue?: (items: ICascaderItem[]) => React.ReactNode;
}

function CascaderTagList(props: ICascaderTagsProps) {
  const { list, renderValue, onRemove } = props;

  return (
    <>
      {list.map(items => {
        const removeCallback = (e: React.MouseEvent) => {
          e.stopPropagation();
          // 即移除最后一级叶子节点的选中状态
          onRemove(items[items.length - 1]);
        };

        return (
          <Tag
            key={getPathValue(items)}
            items={items}
            onRemove={removeCallback}
            renderValue={renderValue}
          />
        );
      })}
    </>
  );
}

export default CascaderTagList;
