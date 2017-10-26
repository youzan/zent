import React, { PureComponent, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Button from './sample/DEV.md';

import zhCN from './components/zh-CN';
import enUS from './components/en-US';

export default class App extends (PureComponent || Component) {
  render() {
    return (
      <Router key={module.hot ? Math.random() : null}>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/zh">zh</Link>
            </li>
            <li>
              <Link to="/en">en</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Button} />
          <Route path="/zh" component={zhCN} />
          <Route path="/en" component={enUS} />
        </div>
      </Router>
    );
  }
}
