import * as React from 'react';
import PanelFooter from '../../components/PanelFooter';
import Button from '../../../button';
import Pop from '../../../pop';
import PickerContext from '../../context/PickerContext';
import PanelContext from '../../context/PanelContext';
import { ITimePanelProps, RangeTime } from '../../types';

const CombinedTimeFooter: React.FC<
  Pick<ITimePanelProps<RangeTime>, 'selected' | 'onSelected'>
> = ({ onSelected, selected }) => {
  const { i18n } = React.useContext(PickerContext);
  const { confirmStatus } = React.useContext(PanelContext);

  const confirmHandler = React.useCallback(() => onSelected(selected, true), [
    selected,
    onSelected,
  ]);
  const confirmNode = React.useMemo(() => {
    const confirmBtn = (
      <Button
        type="primary"
        onClick={confirmHandler}
        disabled={confirmStatus}
        className="zent-datepicker-panel-footer-btn"
      >
        {i18n.confirm}
      </Button>
    );
    return confirmStatus ? (
      <Pop content={i18n.timeErrorPop} trigger="hover">
        {confirmBtn}
      </Pop>
    ) : (
      confirmBtn
    );
  }, [i18n, confirmStatus, confirmHandler]);

  return <PanelFooter rightNode={confirmNode} />;
};
export default CombinedTimeFooter;
