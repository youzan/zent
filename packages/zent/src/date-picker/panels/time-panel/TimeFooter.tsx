import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';

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
  const { confirmStatus, isDisabledCurrent } = useContext(PanelContext);

  const onClickCurrent = useCallback(() => {
    if (isDisabledCurrent) return;
    onSelected(formatDate(format, new Date()), true);
  }, [format, isDisabledCurrent, onSelected]);

  const renderToday = useMemo(() => {
    return (
      <Button
        type="text"
        className={cx(
          {
            ['zent-datepicker-panel-footer-current_disabled']:
              isDisabledCurrent,
          },
          'zent-datepicker-panel-footer-current'
        )}
        onClick={onClickCurrent}
      >
        {i18n.current.time}
      </Button>
    );
  }, [i18n, isDisabledCurrent, onClickCurrent]);

  const confirmNode = useMemo(
    () => (
      <Button
        type="primary"
        className="zent-datepicker-panel-footer-btn"
        disabled={confirmStatus}
        onClick={() => onSelected(selected || '00:00:00', true)}
      >
        {i18n.confirm}
      </Button>
    ),
    [i18n, confirmStatus, selected, onSelected]
  );

  return <PanelFooter leftNode={renderToday} rightNode={confirmNode} />;
};
export default TimePickerFooter;
