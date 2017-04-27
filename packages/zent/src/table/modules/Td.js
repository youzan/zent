import React, { Component } from 'react';
import Checkbox from 'checkbox';
import assign from 'lodash/assign';
import cx from 'classnames';

import helper from '../helper';

export default class Td extends Component {
  renderText(name, data) {
    return data[name];
  }

  renderContent() {
    const { column, data, pos } = this.props;
    const { name, bodyRender } = column;

    if (typeof bodyRender !== 'undefined') {
      if (typeof bodyRender === 'function') {
        if (bodyRender.prototype && bodyRender.prototype.isReactComponent) {
          let BodyRender = bodyRender;

          return <BodyRender data={data} name={name} pos={pos} />;
        }
        return typeof bodyRender(data, pos) !== 'undefined'
          ? bodyRender(data, pos)
          : '';
      }
      return bodyRender;
    }

    return this.renderText(name, data);
  }

  onSelect = e => {
    const isChecked = e.target.checked;
    const { selection, data, rowKey } = this.props;

    selection.onSelect(data[rowKey], isChecked);
  };

  render() {
    const { column, selection, data, rowKey } = this.props;
    const { textAlign, isMoney } = column;
    const { needSelect, canSelect } = selection;
    const width = helper.getCalculatedWidth(column.width);
    const className = cx('cell', column.className, {
      'cell--selection': needSelect,
      'cell--money': isMoney
    });

    let styleObj = {};

    if (width) {
      styleObj = {
        width,
        flex: '0 1 auto'
      };
    }

    styleObj = assign(styleObj, helper.getAlignStyle(textAlign));

    return (
      <div className={className} style={styleObj}>
        {needSelect &&
          <Checkbox
            className="select-check"
            checked={
              canSelect &&
                selection.selectedRowKeys.indexOf(data[rowKey]) !== -1
            }
            disabled={!canSelect}
            onChange={this.onSelect}
          />}
        {this.renderContent()}
      </div>
    );
  }
}
