import { Notify } from 'zent';
import getRequestError from 'common/getRequestError';
import { withRouter } from 'react-router-dom';
import * as api from 'api/shop';

import { Create } from '../create';

class PageEdit extends Create {
  componentDidMount() {
    const { match: { params } } = this.props;

    api
      .getDetail(params.id)
      .then(data => {
        this.setState({
          value: data
        });
      })
      .catch(err => Notify.error(getRequestError(err)));
  }
}

export default withRouter(PageEdit);
