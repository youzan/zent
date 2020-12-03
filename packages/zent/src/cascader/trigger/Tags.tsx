import { ICascaderItem } from '../types';
import Tag from './Tag';
import { getPathValue } from '../path-fns';

export interface ICascaderTagsProps {
  list: Array<ICascaderItem[]>;
  onRemove(node: ICascaderItem): void;
  renderValue?: (path: ICascaderItem[]) => React.ReactNode;
}

function CascaderTagList(props: ICascaderTagsProps) {
  const { list, renderValue, onRemove } = props;

  return (
    <>
      {list.map(path => {
        const removeCallback = (e: React.MouseEvent) => {
          e.stopPropagation();
          // 即移除最后一级叶子节点的选中状态
          onRemove(path[path.length - 1]);
        };

        return (
          <Tag
            key={getPathValue(path)}
            path={path}
            onRemove={removeCallback}
            renderValue={renderValue}
          />
        );
      })}
    </>
  );
}

export default CascaderTagList;
