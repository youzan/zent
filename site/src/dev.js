import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'prismjs/themes/prism.css';
import './docs.pcss';
import './react-docs.pcss';

// import App from './App';
import Button from '../../packages/zent/src/button/README.md';

class App extends Component {
  render() {
    return (
      <div className="dev__container">
        <Button />
      </div>
    );
  }
}

const render = ChildComponent => {
  ReactDOM.render(
    <AppContainer>
      <ChildComponent />
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
