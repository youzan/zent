import React, { Component } from 'react';

import { Provider, connect } from '../components/ListDataProvider';
import HomePage from '../components/homepage';
import List from '../components/list';

class App extends Component {
  render() {
    const { store } = this.props;
    const { homepage } = store;

    return (
      <div className="paper-list-app">
        <HomePage homepage={homepage} />
        <List store={store} />
      </div>
    );
  }
}

export const ConnectedApp = connect(App);

export default class ListPage extends Component {
  render() {
    return (
      <Provider>
        <ConnectedApp />
      </Provider>
    );
  }
}
