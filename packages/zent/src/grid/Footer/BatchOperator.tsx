import * as React from 'react';
import classnames from 'classnames';
import SelectionCheckboxAll from '../ui/SelectionCheckboxAll';
import { IGridBatchRender, IGridSelection } from '../types';
import { clsPrefix } from '../constants';

interface IProps<Data = any> {
  batchRender: IGridBatchRender;
  position: string;
  onSelect: (type: string) => void;
  datasets: Data[];
  selection: IGridSelection;
  rowKey: string;
  selectedRows: Data[];
}

export default function BatchComponents(props: IProps) {
  const batchNeedRenderFixed = false;
  const { selection, batchRender, position, onSelect, selectedRows } = props;
  const styles = {};
  const disabled = false;
  const cls = classnames(
    `${clsPrefix}-batch`,
    `${clsPrefix}-batch__${position}`,
    {
      [`${clsPrefix}-batch--fixed`]:
        batchNeedRenderFixed && position === 'foot',
    }
  );

  const handleOnSelect = React.useCallback(
    e => {
      if (e.target.checked) {
        onSelect('selectAll');
      } else {
        onSelect('removeAll');
      }
    },
    [onSelect]
  );

  if (selection && batchRender) {
    return (
      <div className={cls} style={styles}>
        <SelectionCheckboxAll
          onChange={handleOnSelect}
          disabled={disabled}
          selection={selection}
        />
        {batchRender(selectedRows)}
      </div>
    );
  }
  return null;
}
