import layoutNormal from './layout/normal';
import AbstractPagination from './impl/AbstractPagination';

export class Pagination extends AbstractPagination {
  static defaultProps = {
    // Don't give a default value
    // total: 0,

    current: 1,
    pageSize: 10,
    buttonBordered: true,
    showQuickJumper: true,
    showSizeChanger: true,
  };

  name = 'normal';

  layoutFn = layoutNormal;
}

export default Pagination;
