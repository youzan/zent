import * as React from 'react';
import { ICascaderItem } from '../types';
import Icon from '../../icon';

interface ITagsTriggerProps<Item = ICascaderItem> {
  list: Array<Item[]>;
  displayRender?: (items: Item[]) => React.ReactNode;
  onRemove: (item: ICascaderItem, checked: boolean) => void;
}

class TagsTrigger extends React.Component<ITagsTriggerProps> {
  renderTag(item: ICascaderItem[]) {
    const { displayRender, onRemove } = this.props;

    return (
      <div
        className="zent-cascader--tag"
        key={item.map(li => li.value).join('-')}
      >
        {displayRender(item)}
        <Icon
          type="close"
          className="zent-cascader--tag-close"
          onClick={e => {
            e.stopPropagation();
            // 最后一项取消选中
            onRemove(item[item.length - 1], false);
          }}
        />
      </div>
    );
  }

  render() {
    const { list } = this.props;

    return list.map(items => this.renderTag(items));
  }
}

export default TagsTrigger;
