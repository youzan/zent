import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Checkbox from '../../checkbox';
import Radio from '../../radio';
import helper from '../helper';

export default class Td extends PureComponent<any> {
  renderContent() {
    const { column, data, pos } = this.props;
    const { name, bodyRender = data[name] } = column;
    const isReactComponent = helper.isReactComponent(bodyRender);

    if (typeof bodyRender === 'function') {
      const BodyRender = bodyRender;

      return isReactComponent ? (
        <BodyRender data={data} name={name} pos={pos} />
      ) : (
        bodyRender(data, pos, name)
      );
    }
    return bodyRender;
  }

  onSelect = e => {
    const isChecked = e.target.checked;
    const { selection, data, rowKey } = this.props;

    selection.onSelect(data[rowKey], isChecked);
  };

  renderCheckBox(data, rowKey, selection) {
    const { needSelect, canSelect, isSingleSelection } = selection;
    if (needSelect) {
      if (isSingleSelection) {
        return (
          <Radio
            className="select-check"
            checked={selection.selectedRowKeys.indexOf(data[rowKey]) !== -1}
            disabled={!canSelect}
            onChange={this.onSelect}
          />
        );
      }

      return (
        <Checkbox
          className="select-check"
          checked={selection.selectedRowKeys.indexOf(data[rowKey]) !== -1}
          indeterminate={
            selection.indeterminateRowKeys.indexOf(data[rowKey]) !== -1
          }
          disabled={!canSelect}
          onChange={this.onSelect}
        />
      );
    }

    return null;
  }

  render() {
    const { column, selection, data, rowKey } = this.props;
    const { textAlign, isMoney } = column;
    const { needSelect } = selection;
    const width = helper.getCalculatedWidth(column.width);
    let className = cx('cell', column.className, {
      'cell--selection': needSelect,
      'cell--money': isMoney,
    });

    let styleObj = {};

    if (width) {
      styleObj = {
        width,
        flex: '0 1 auto',
      };
    }

    if (helper.getAlignClass(textAlign) !== '') {
      className += ` cell--${helper.getAlignClass(textAlign)}`;
    }

    return (
      <div className={className} style={styleObj}>
        {this.renderCheckBox(data, rowKey, selection)}
        <div className="cell__child-container">{this.renderContent()}</div>
      </div>
    );
  }
}
