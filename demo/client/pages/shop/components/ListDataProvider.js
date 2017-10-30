import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'zent';
import getRequestError from 'common/getRequestError';
import assign from 'lodash/assign';

import * as api from 'api/shop';

function handleError(err) {
  Notify.error(getRequestError(err));
}

const contextTypes = {
  homepage: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    fetch: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    setAsHomepage: PropTypes.func.isRequired
  })
};

export class Provider extends Component {
  state = {
    homepage: {},
    list: [],
    page: {
      current: 1
    }
  };

  static childContextTypes = contextTypes;

  getChildContext() {
    return assign({}, this.state, {
      actions: {
        fetch: this.fetch,
        remove: this.remove,
        copy: this.copy,
        setAsHomepage: this.setAsHomepage
      }
    });
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    return React.Children.only(this.props.children);
  }

  fetch = currentPage => {
    return api
      .list({
        page: currentPage || this.state.page.current
      })
      .then(data => {
        this.setState(data);
      })
      .catch(handleError);
  };

  remove = id => {
    return api
      .remove(id)
      .then(() => {
        Notify.success('删除成功');
        this.fetch();
      })
      .catch(handleError);
  };

  copy = id => {
    return api
      .copy(id)
      .then(() => {
        Notify.success('复制成功');
        this.fetch();
      })
      .catch(handleError);
  };

  setAsHomepage = id => {
    return api
      .setAsHomepage(id)
      .then(() => {
        Notify.success('设置店铺主页成功');
        this.fetch();
      })
      .catch(handleError);
  };
}

export function connect(Base) {
  class DataConnected extends Component {
    static contextTypes = contextTypes;

    render() {
      return <Base {...this.props} store={this.context} />;
    }
  }

  return DataConnected;
}
