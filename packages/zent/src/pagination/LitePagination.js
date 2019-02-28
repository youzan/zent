import createPagination from './impl/createPagination';
import layoutLite from './layout/lite';

const LitePagination = createPagination('lite', layoutLite);

LitePagination.defaultProps = {
  // Don't give a default value
  // total: 0,

  current: 1,
  pageSize: 10,
  buttonBordered: false,
  showQuickJumper: false,
  showSizeChanger: false,
};

export default LitePagination;
