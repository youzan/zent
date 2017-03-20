import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Layout from './layout';

const BasicExample = () => (
  <Router>
    <Route exact path="/" component={Layout} />
  </Router>
);

const container = document.querySelector('.app');
ReactDOM.render(<BasicExample />, container);
