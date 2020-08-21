import * as React from 'react';
import { ICascaderItem } from '../types';
import Icon from '../../icon';

export interface ICascaderTagProps<Item extends ICascaderItem> {
  items: Item[];
  onRemove(item: Item): void;
  renderValue?: (items: Item[]) => React.ReactNode;
}

function CascaderTag(props: ICascaderTagProps<ICascaderItem>) {
  const { items, renderValue, onRemove } = props;

  return (
    <div className="zent-cascader--tag">
      {renderValue(items)}
      <Icon
        type="close"
        className="zent-cascader--tag-close"
        onClick={e => {
          e.stopPropagation();
          // 即移除最后一级叶子节点的选中状态
          onRemove(items[items.length - 1]);
        }}
      />
    </div>
  );
}

export default React.memo(CascaderTag);
