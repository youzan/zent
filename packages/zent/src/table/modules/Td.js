import React, { Component, PureComponent } from 'react';
import Pop from 'pop';
import Checkbox from 'checkbox';
import Radio from 'radio';
import cx from 'classnames';

import helper from '../helper';

export default class Td extends (PureComponent || Component) {
  state = {
    turnPop: false
  };

  renderText(name, data) {
    return !this.state.turnPop
      ? data[name]
      : <Pop
          position="bottom-left"
          trigger="hover"
          content={<span className="table__cell-tooltip">{data[name]}</span>}
        >
          {data[name]}
        </Pop>;
  }

  renderContent() {
    const { column, data, pos } = this.props;
    const { name, bodyRender } = column;
    const isReactComponent = helper.isReactComponent(bodyRender);

    if (typeof bodyRender !== 'undefined') {
      if (typeof bodyRender === 'function') {
        if (isReactComponent) {
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

  renderCheckBox(data, rowKey, selection) {
    const { needSelect, canSelect, isSingleSelection } = selection;
    if (needSelect) {
      if (isSingleSelection) {
        return (
          <Radio
            className="select-check"
            checked={
              canSelect &&
                selection.selectedRowKeys.indexOf(data[rowKey]) !== -1
            }
            disabled={!canSelect}
            onChange={this.onSelect}
          />
        );
      }

      return (
        <Checkbox
          className="select-check"
          checked={
            canSelect && selection.selectedRowKeys.indexOf(data[rowKey]) !== -1
          }
          disabled={!canSelect}
          onChange={this.onSelect}
        />
      );
    }

    return null;
  }

  componentDidMount() {
    // HACK: tremendous ugly code
    setTimeout(() => {
      if (this.props.toolWhenEllip && !this.state.turnPop) {
        const bool = this.container.offsetWidth < this.container.scrollWidth;
        if (bool !== this.state.turnPop) {
          this.setState({
            // eslint-disable-line
            turnPop: true
          });
        }
      }
    }, 100);
  }

  render() {
    const { column, selection, data, rowKey, ellipsis } = this.props;
    const { textAlign, isMoney } = column;
    const { needSelect } = selection;
    const width = helper.getCalculatedWidth(column.width);
    let className = cx('cell', column.className, {
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

    if (helper.getAlignClass(textAlign) !== '') {
      className += ` cell--${helper.getAlignClass(textAlign)}`;
    }

    return (
      <div className={className} style={styleObj}>
        {this.renderCheckBox(data, rowKey, selection)}
        <div
          ref={container => (this.container = container)}
          className={cx('cell__child-container', { ellipsis })}
        >
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
