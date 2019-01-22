import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import Checkbox from 'checkbox';
import Icon from 'icon';
import cx from 'classnames';
import helper from '../helper';

let rect;
const stickRowClass = 'stickrow';
const fixRowClass = 'fixrow';

export default class Head extends PureComponent {
  constructor() {
    super();

    this.state = {
      isShowFixRow: false,
    };
    this.relativeTop = 0;
  }

  componentDidMount() {
    if (this.props.autoStick) {
      this.throttleSetHeadStyle = throttle(this.setHeadStyle, 100, {
        leading: true,
      });

      window.addEventListener('scroll', this.throttleSetHeadStyle, true);
      window.addEventListener('resize', this.throttleSetHeadStyle, true);
    }
  }

  componentWillUnmount() {
    if (this.props.autoStick) {
      window.removeEventListener('scroll', this.throttleSetHeadStyle, true);
      window.removeEventListener('resize', this.throttleSetHeadStyle, true);
    }
  }

  getRect() {
    // clientrect can't be clone
    let tmpRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    rect = {
      top: tmpRect.top,
      height: tmpRect.height - 1,
      width: tmpRect.width,
    };
    this.relativeTop =
      rect.top - document.documentElement.getBoundingClientRect().top;
  }

  setHeadStyle = () => {
    this.getRect();
    if (window.scrollY > this.relativeTop) {
      this.setState({
        isShowFixRow: true,
        fixStyle: {
          position: 'fixed',
          top: 0,
          left: `${rect.left}px`,
          height: `${rect.height}px`,
          width: `${rect.width}px`,
          zIndex: 1000,
        },
      });
    } else {
      this.setState({
        isShowFixRow: false,
        fixStyle: {},
      });
    }
  };

  renderTitle(item) {
    const { sortType, sortBy } = this.props;

    if (item.needSort) {
      const isActiveCol = sortBy === item.name;
      return (
        <div className={cx('sort-col', { 'sort-col--active': isActiveCol })}>
          <span className="sort-col-title">{item.title}</span>
          <span className="sort-col-icon">
            <Icon
              type="caret-up"
              className={cx({
                'sort-active': isActiveCol && sortType === 'asc',
              })}
              onClick={() => this.sort(item, 'asc')}
            />
            <Icon
              type="caret-down"
              className={cx({
                'sort-active': isActiveCol && sortType === 'desc',
              })}
              onClick={() => this.sort(item, 'desc')}
            />
          </span>
        </div>
      );
    }
    return item.title;
  }

  sort = (item, sortType) => {
    let name = item.name;

    this.props.onSort({
      sortBy: name,
      sortType,
    });
  };

  onSelect = e => {
    let isChecked = false;
    if (e.target.checked) {
      isChecked = true;
    }

    this.props.selection.onSelectAll(isChecked);
  };

  renderCheckBox(index, selection) {
    let { canSelectAll, needSelect, isSingleSelection } = selection;
    if (needSelect && index === 0 && !isSingleSelection) {
      return (
        <Checkbox
          className="select-check"
          disabled={!canSelectAll}
          onChange={this.onSelect}
          checked={selection.isSelectAll}
          indeterminate={selection.isSelectPart}
        />
      );
    }

    return null;
  }

  renderTr(isFixTr, style = {}) {
    let { selection, needExpand } = this.props;
    let { needSelect } = selection;
    let className = isFixTr ? fixRowClass : stickRowClass;
    let tds = [];

    if (needExpand) {
      tds.push(<div key="-1" className="td expanded-item" />);
    }

    this.props.columns.forEach((item, index) => {
      let cellClass = 'cell';
      let { isMoney, textAlign, width } = item;

      if (index === 0 && needSelect) {
        cellClass += ' cell--selection';
      }

      if (isMoney) {
        cellClass += ' cell--money';
      }

      width = helper.getCalculatedWidth(width);

      let styleObj = {};

      if (width) {
        styleObj = {
          width,
          flex: '0 1 auto',
        };
      }

      if (helper.getAlignClass(textAlign) !== '') {
        cellClass += ` cell--${helper.getAlignClass(textAlign)}`;
      }

      tds.push(
        <div key={index} className={cellClass} style={styleObj}>
          <div className="cell__child-container">
            {this.renderCheckBox(index, selection)}
            {this.renderTitle(item)}
          </div>
        </div>
      );
    });
    return (
      <div
        className={`${className} tr`}
        style={style}
        ref={c => {
          this[className] = c;
        }}
      >
        {tds}
      </div>
    );
  }

  render() {
    let { style } = this.props;
    let { isShowFixRow, fixStyle } = this.state;

    return (
      <div className="thead" style={style}>
        {this.renderTr(false)}
        {isShowFixRow && this.renderTr(true, fixStyle)}
      </div>
    );
  }
}
