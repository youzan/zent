import * as React from 'react';

import { ICascaderItem } from '../types';
import Icon from '../../icon';

export interface ICascaderTagProps<Item extends ICascaderItem> {
  items: Item[];
  onRemove(e: React.MouseEvent): void;
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
        onClick={onRemove}
      />
    </div>
  );
}

export default CascaderTag;
