import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PageShopList from './pages/shop/list';
import PageShopCreate from './pages/shop/create';
import PageShopEdit from './pages/shop/edit';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch className="zent-demo-layout">
          <Route exact path="/paper" component={PageShopList} />
          <Route exact path="/paper/create" component={PageShopCreate} />
          <Route exact path="/paper/edit/:id" component={PageShopEdit} />
        </Switch>
      </Router>
    );
  }
}
