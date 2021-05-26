import * as React from 'react';
import Pagination from '../../pagination';
// import BatchOperator from './BatchOperator';
import { defaultPageInfo, clsPrefix } from '../constants';
import {
  IGridPageInfo,
  GridPaginationType,
  IGridChangeHandler,
} from '../types';

interface IGridFooterProps {
  pageInfo: IGridPageInfo;
  paginationType: GridPaginationType;
  batchRender?: () => React.ReactNode;
  onChange: IGridChangeHandler;
}

function Footer(props: IGridFooterProps) {
  const { pageInfo, onChange, batchRender } = props;

  const currentPageInfo = React.useMemo(() => {
    const hasPagination = pageInfo && Object.keys(pageInfo).length > 0;
    return hasPagination
      ? {
          ...pageInfo,
          current: pageInfo.current || defaultPageInfo.current,
          pageSize: pageInfo.pageSize || defaultPageInfo.pageSize,
        }
      : null;
  }, [pageInfo]);

  return (
    <div className={`${clsPrefix}-tfoot`}>
      {batchRender && batchRender()}
      {currentPageInfo && (
        <div className={`${clsPrefix}-page`}>
          <Pagination {...currentPageInfo} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

export default Footer;
