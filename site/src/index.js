import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Perf from 'react-addons-perf';

import 'prismjs/themes/prism.css';
import './docs.pcss';
import './react-docs.pcss';

import App from './App';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app-container')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}

window.Perf = Perf;
