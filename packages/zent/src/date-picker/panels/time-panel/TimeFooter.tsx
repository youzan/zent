import * as React from 'react';
import { useMemo, useContext } from 'react';
import PanelFooter from '../../components/PanelFooter';
import PickerContext from '../../context/PickerContext';
import Button from '../../../button';
import { formatDate } from '../../utils/index';
import { ITimePanelProps } from '../../types';

const TimePickerFooter: React.FC<ITimePanelProps> = ({
  onSelected,
  selected,
  format,
}) => {
  const { i18n } = useContext(PickerContext);

  const onClickCurrent = React.useCallback(() => {
    onSelected(formatDate(new Date(), format));
  }, [format, onSelected]);

  const renderToday = useMemo(() => {
    return <a onClick={onClickCurrent}>{i18n.current.time}</a>;
  }, [i18n, onClickCurrent]);

  const confirmNode = (
    <Button
      type="primary"
      className="zent-datepicker-panel-footer-btn"
      disabled={!selected}
      onClick={() => onSelected(selected, true)}
    >
      {i18n.confirm}
    </Button>
  );

  return <PanelFooter leftNode={renderToday} rightNode={confirmNode} />;
};
export default TimePickerFooter;
