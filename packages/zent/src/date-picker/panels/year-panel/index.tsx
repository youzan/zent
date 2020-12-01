import { useState, useMemo, useCallback } from 'react';
import PanelHeader from '../../components/PanelHeader';
import YearPanelBody from './YearBody';

import { MAX_YEAR, MIN_YEAR, MAX_PAGE } from '../../constants';
import { ISinglePanelProps } from '../../types';

const YearPickerPanel: React.FC<
  Omit<ISinglePanelProps, 'rangeDate' | 'hoverRangeDate'>
> = props => {
  const { defaultPanelDate } = props;
  const tempYear = defaultPanelDate.getFullYear();
  const [page, setPage] = useState<number>(
    Math.floor((tempYear - MIN_YEAR) / 12)
  );
  const firstYear = useMemo(() => MIN_YEAR + page * 12, [page]);

  const onClickPrev = useCallback(() => page > 0 && setPage(page - 1), [page]);
  const onClickNext = useCallback(() => page < MAX_PAGE && setPage(page + 1), [
    page,
  ]);
  return (
    <>
      <PanelHeader
        titleNode={`${firstYear} - ${
          firstYear + 11 > MAX_YEAR ? MAX_YEAR : firstYear + 11
        }`}
        onPrev={onClickPrev}
        onNext={onClickNext}
      />
      <YearPanelBody firstYear={firstYear} {...props} />
    </>
  );
};
export default YearPickerPanel;
