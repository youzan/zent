import { useCallback, useContext, useMemo } from 'react';

import PanelFooter from '../../components/PanelFooter';
import Button from '../../../button';
import PickerContext from '../../context/PickerContext';
import PanelContext from '../../context/PanelContext';
import { formatDate } from '../../utils/index';
import { ITimePanelProps } from '../../types';

const TimePickerFooter: React.FC<ITimePanelProps> = ({
  onSelected,
  selected,
  format,
}) => {
  const { i18n } = useContext(PickerContext);
  const { confirmStatus } = useContext(PanelContext);

  const onClickCurrent = useCallback(() => {
    onSelected(formatDate(format, new Date()), true);
  }, [format, onSelected]);

  const renderToday = useMemo(() => {
    return <a onClick={onClickCurrent}>{i18n.current.time}</a>;
  }, [i18n, onClickCurrent]);

  const confirmNode = useMemo(
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

  return <PanelFooter leftNode={renderToday} rightNode={confirmNode} />;
};
export default TimePickerFooter;
