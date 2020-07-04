import * as React from 'react';
import PanelFooter from '../../components/PanelFooter';
import Button from '../../../button';
import PickerContext from '../../context/PickerContext';
import PanelContext from '../../context/PanelContext';
import { ITimePanelProps, RangeTime } from '../../types';

const CombinedTimeFooter: React.FC<Pick<
  ITimePanelProps<RangeTime>,
  'selected' | 'onSelected'
>> = ({ onSelected, selected }) => {
  const { i18n } = React.useContext(PickerContext);
  const { confirmStatus } = React.useContext(PanelContext);

  const confirmNode = React.useMemo(
    () => (
      <Button
        type="primary"
        className="zent-datepicker-panel-footer-btn"
        disabled={confirmStatus}
        onClick={() => onSelected(selected, true)}
      >
        {i18n.confirm}
      </Button>
    ),
    [i18n, confirmStatus, selected, onSelected]
  );

  return <PanelFooter rightNode={confirmNode} />;
};
export default CombinedTimeFooter;
