// import React from 'react';
// import map from 'lodash/map';

export default class Columns {
  _cached = {};

  constructor(columns) {
    this._columns = columns;
  }

  // normalizeColumns(columns) {
  //   return map(columns, ({ name, title, className, key }, index) => ({
  //     key: name || key || index,
  //     className: className || '',
  //     children: title
  //   }));
  // }

  get columns() {
    return this._columns;
  }
}
