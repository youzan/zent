import * as React from 'react';
import { useState, useMemo } from 'react';
import PanelHeader from '../../components/PanelHeader';
import YearPanelBody from './YearBody';

import { ISinglePanelProps } from '../../types';

const YearPickerPanel: React.FC<Omit<
  ISinglePanelProps,
  'rangeDate' | 'hoverRangeDate'
>> = props => {
  const { defaultPanelDate } = props;
  const tempYear = defaultPanelDate.getFullYear();
  const [page, setPage] = useState<number>(Math.floor((tempYear - 1840) / 12));
  const firstYear = useMemo(() => 1840 + page * 12, [page]);

  const onClickPrev = React.useCallback(() => setPage(page - 1), [page]);
  const onClickNext = React.useCallback(() => setPage(page + 1), [page]);
  return (
    <>
      <PanelHeader
        titleNode={`${firstYear} - ${firstYear + 11}`}
        onPrev={onClickPrev}
        onNext={onClickNext}
      />
      <YearPanelBody firstYear={firstYear} {...props} />
    </>
  );
};
export default YearPickerPanel;
