import React, { PureComponent, Component } from 'react';

// import Button from '../../packages/zent/src/button/README.md';

import Button from './sample/DEV.md';

export default class App extends (PureComponent || Component) {
  render() {
    return (
      <div className="dev__container">
        <Button />
      </div>
    );
  }
}
