import { CascaderItemSelectionState, ICascaderItem } from '../types';
import Tag from './Tag';
import { getPathValue } from '../path-fns';
import { simplify } from '../simplify';

export interface ICascaderTagsProps {
  list: Array<ICascaderItem[]>;

  // 节点选中信息
  selectionMap: Map<string, CascaderItemSelectionState>;
  simplifyPaths: boolean;

  onRemove(node: ICascaderItem): void;
  renderValue?: (path: ICascaderItem[]) => React.ReactNode;
}

function CascaderTagList(props: ICascaderTagsProps) {
  const { list, renderValue, selectionMap, simplifyPaths, onRemove } = props;
  const paths = simplifyPaths ? simplify(list, selectionMap) : list;

  return (
    <>
      {paths.map(path => {
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
