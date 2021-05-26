import * as React from 'react';
import { TableToggleRowsSelectedProps } from 'react-table';
import Radio from '../../radio';

interface IGridInnerSelection<Data> extends TableToggleRowsSelectedProps {
  disabled?: boolean;
  reason?: React.ReactNode;
  selectionComp?: React.ReactNode;
}

export default function SelectionCheckbox<Data>(
  props: IGridInnerSelection<Data>
) {
  const { onChange, selectionComp } = props;

  const handleOnSelectionChange = React.useCallback(
    e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onChange(e);
    },
    [onChange]
  );

  if (selectionComp) {
    return <>{selectionComp}</>;
  }

  return <Radio {...props} onChange={handleOnSelectionChange} />;
}
