import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import PanelHeader from '../../components/PanelHeader';
import YearPanelBody from './YearBody';

import { ISingleDatePanelProps } from '../../types';

const YearPickerPanel: React.FC<ISingleDatePanelProps> = props => {
  const { defaultPanelDate } = props;
  const tempYear = defaultPanelDate.getFullYear();
  const [page, setPage] = useState<number>(Math.floor((tempYear - 1840) / 12));
  const firstYear = useMemo(() => 1840 + page * 12, [page]);

  return (
    <>
      <PanelHeader
        titleNode={`${firstYear} - ${firstYear + 11}`}
        onPrev={useCallback(() => setPage(page - 1), [page])}
        onNext={useCallback(() => setPage(page + 1), [page])}
      />
      <YearPanelBody firstYear={firstYear} {...props} />
    </>
  );
};
export default YearPickerPanel;
