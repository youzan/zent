import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'prismjs/themes/prism.css';
import './docs.pcss';
import './react-docs.pcss';

import App from './App';

const render = ChildComponent => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <ChildComponent />
    </AppContainer>,
    document.getElementById('app-container') // eslint-disable-line
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
