// import React from 'react';

export default class Columns {
  _cached = {};

  constructor(columns) {
    this._columns = columns;
  }

  get columns() {
    return this._columns;
  }
}
