import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageShopList from './pages/shop/list';
import PageShopCreate from './pages/shop/create';
import PageShopEdit from './pages/shop/edit';
import PageOrderList from './pages/order/list';
import PageNotFound from './pages/404';

export const prefix =
  process.env.NODE_ENV === 'production' &&
  process.env.ZENT_DEPLOY_DEMO_YOUZAN_PRIVATE
    ? '/zanui/demo/zent'
    : '/';

export default class Routes extends Component {
  render() {
    return (
      <Router basename={prefix}>
        <Switch className="zent-demo-layout">
          <Route path="/paper/create" component={PageShopCreate} />
          <Route path="/paper/edit/:id" component={PageShopEdit} />
          <Route path="/paper" component={PageShopList} />
          <Route path="/order" component={PageOrderList} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}
