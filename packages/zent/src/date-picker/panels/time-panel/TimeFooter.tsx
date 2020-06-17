import * as React from 'react';
import { useMemo, useContext } from 'react';
import PanelFooter from '../../components/PanelFooter';
import I18nLocaleContext from '../../context/I18nLocaleContext';
import Button from '../../../button';
import { formatDate } from '../../utils/index';
import { ITimePanelProps } from '../../types';

const TimePickerFooter: React.FC<ITimePanelProps> = ({
  onSelected,
  selected,
}) => {
  const { i18n } = useContext(I18nLocaleContext);
  const renderToday = useMemo(() => {
    return (
      <a
        onClick={() => {
          onSelected(formatDate(new Date(), 'HH:mm:ss'));
        }}
      >
        {i18n.current.time}
      </a>
    );
  }, [i18n, onSelected]);

  const confirmNode = (
    <Button
      type="primary"
      className="zent-date-picker-panel-footer-btn"
      disabled={!selected}
      onClick={() => onSelected(selected, true)}
    >
      {i18n.confirm}
    </Button>
  );

  return <PanelFooter leftNode={renderToday} rightNode={confirmNode} />;
};
export default TimePickerFooter;
