import createPagination from './impl/createPagination';
import layoutNormal from './layout/normal';

const Pagination = createPagination('normal', layoutNormal);

Pagination.defaultProps = {
  // Don't give a default value
  // total: 0,

  current: 1,
  pageSize: 10,
  buttonBordered: true,
  showQuickJumper: true,
  showSizeChanger: true,
};

export default Pagination;
