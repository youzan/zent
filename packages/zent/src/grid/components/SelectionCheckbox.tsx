import * as React from 'react';
import { TableToggleRowsSelectedProps } from 'react-table';
import Checkbox from '../../checkbox';
import Pop from '../../pop';

interface IGridInnerSelection<Data> extends TableToggleRowsSelectedProps {
  disabled?: boolean;
  reason?: React.ReactNode;
  selectionComp?: React.ReactNode;
  onChange?: (e: any) => void;
}

export default function SelectionCheckbox<Data>(
  props: IGridInnerSelection<Data>
) {
  const { disabled, reason, selectionComp } = props;
  if (selectionComp) {
    return <>{selectionComp}</>;
  }
  if (disabled && reason) {
    return (
      <Pop trigger="hover" position="top-left" centerArrow content={reason}>
        <Checkbox disabled />
      </Pop>
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <Checkbox {...props} />;
}
