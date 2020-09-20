import * as React from 'react';
import Pagination from '../../pagination';
import {
  IGridPageInfo,
  GridPaginationType,
  IGridBatchRender,
  IGridOnChangeConfig,
  IGridChangeHandler,
} from '../types';

interface IGridFooterProps {
  prefix: string;
  pageInfo: IGridPageInfo;
  paginationType: GridPaginationType;
  batchRender: IGridBatchRender;
  onChange: IGridChangeHandler;
}

const defaultPageInfo = {
  current: 1,
  pageSize: 10,
};

function Footer(props: IGridFooterProps) {
  const { prefix, pageInfo } = props;

  const onChange = (conf: IGridOnChangeConfig) => {
    props.onChange(conf);
  };

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
    <div className={`${prefix}-grid-tfoot`}>
      {currentPageInfo && (
        <div className={`${prefix}-grid-page`}>
          <Pagination {...currentPageInfo} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

export default Footer;
