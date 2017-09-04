// import React from 'react';
// import map from 'lodash/map';

export default class Columns {
  _cached = {};

  constructor(props) {
    const { columns } = props;

    this._columns = columns;
  }

  get columns() {
    return this._columns;
  }
}
