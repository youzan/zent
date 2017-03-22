import React from 'react';
import helper from '../helper';
import Checkbox from 'zent-checkbox';
import assign from 'zent-utils/lodash/assign';

const Td = React.createClass({

  renderText(name, data) {
    return data[name];
  },

  renderContent() {
    let { column, data, pos } = this.props;
    let { name, bodyRender } = column;

    if (typeof bodyRender !== 'undefined') {
      if (typeof bodyRender === 'function') {
        if (bodyRender.prototype && bodyRender.prototype.isReactComponent) {
          let BodyRender = bodyRender;

          return (
            <BodyRender
              data={data}
              name={name}
              pos={pos}
            />
          );
        }
        return typeof bodyRender(data, pos) !== 'undefined' ? bodyRender(data, pos) : '';
      }
      return bodyRender;
    }

    return this.renderText(name, data);
  },

  onSelect(e) {
    let isChecked = e.target.checked;
    let { selection, data, rowKey } = this.props;
    selection.onSelect(data[rowKey], isChecked);
  },

  render() {
    let { column, selection, data, rowKey } = this.props;
    let { textAlign, className = 'cell' } = column;

    let { needSelect, canSelect } = selection;
    let self = this;
    let width = helper.getCalculatedWidth(column.width);

    if (needSelect) {
      className += ' cell--selection';
    }

    if (column.isMoney) {
      className += ' cell--money';
    }

    let styleObj = {};

    if (width) {
      styleObj = {
        width,
        flex: '0 1 auto'
      };
    }

    if (textAlign) {
      if (['left', 'center', 'right'].indexOf(textAlign)) {
        styleObj = assign(styleObj, {
          textAlign
        });
      }
    }

    return (
      <div className={className} style={styleObj}>
        {
          needSelect && (
            <Checkbox
              className="select-check"
              checked={canSelect && selection.selectedRowKeys.indexOf(data[rowKey]) !== -1}
              disabled={!canSelect}
              onChange={self.onSelect}
            />
          )
        }
        {this.renderContent()}
      </div>
    );
  }
});

export default Td;
