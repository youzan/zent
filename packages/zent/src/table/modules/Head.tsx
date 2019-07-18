import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import throttle from 'lodash-es/throttle';
import cx from 'classnames';

import helper from '../helper';
import Checkbox from '../../checkbox';
import { ITableChangeConfig } from '../Table';

const stickRowClass = 'stickrow';
const fixRowClass = 'fixrow';

export default class Head extends PureComponent<any, any> {
  relativeTop: number;
  mounted: boolean;
  rect: any;
  throttleSetHeadStyle: any;

  constructor(props) {
    super(props);

    this.state = {
      isShowFixRow: false,
    };
    this.relativeTop = 0;
    this.mounted = false;
    this.rect = {};
  }

  componentDidMount() {
    this.mounted = true;

    if (this.props.autoStick) {
      this.throttleSetHeadStyle = throttle(this.setHeadStyle, 100, {
        leading: true,
      });

      window.addEventListener('scroll', this.throttleSetHeadStyle, true);
      window.addEventListener('resize', this.throttleSetHeadStyle, true);
    }
  }

  componentWillUnmount() {
    this.mounted = false;

    if (this.props.autoStick) {
      window.removeEventListener('scroll', this.throttleSetHeadStyle, true);
      window.removeEventListener('resize', this.throttleSetHeadStyle, true);
    }
  }

  getRect() {
    // clientrect can't be clone
    const node = ReactDOM.findDOMNode(this) as Element | null;
    if (!node) {
      return;
    }

    const tmpRect = node.getBoundingClientRect();
    this.rect = {
      top: tmpRect.top,
      height: tmpRect.height - 1,
      width: tmpRect.width,
    };
    this.relativeTop =
      this.rect.top - document.documentElement.getBoundingClientRect().top;
  }

  setHeadStyle = () => {
    if (!this.mounted) {
      return;
    }

    this.getRect();
    if (window.scrollY > this.relativeTop) {
      this.setState({
        isShowFixRow: true,
        fixStyle: {
          position: 'fixed',
          top: 0,
          left: `${this.rect.left}px`,
          height: `${this.rect.height}px`,
          width: `${this.rect.width}px`,
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
        <div
          onClick={() => this.sort(item)}
          className={cx('sort-col', { 'sort-col--active': isActiveCol })}
        >
          <span className="sort-col-title">{item.title}</span>
          <span className="sort-col-icon">
            <span
              className={cx('caret-up', {
                'sort-active': isActiveCol && sortType === 'asc',
              })}
            />
            <span
              className={cx('caret-down', {
                'sort-active': isActiveCol && sortType === 'desc',
              })}
            />
          </span>
        </div>
      );
    }
    return item.title;
  }

  sort = item => {
    const name = item.name;
    const { sortBy, sortType, defaultSortType = 'desc' } = this.props;
    let newSortType: ITableChangeConfig['sortType'];

    if (name === sortBy) {
      if (sortType === undefined) {
        newSortType = defaultSortType;
      } else if (sortType === defaultSortType) {
        newSortType = defaultSortType === 'asc' ? 'desc' : 'asc';
      } else {
        newSortType = undefined;
      }
    }

    if (name !== sortBy) {
      newSortType = defaultSortType;
    }

    this.props.onSort({
      sortBy: name,
      sortType: newSortType,
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
    const { canSelectAll, needSelect, isSingleSelection } = selection;
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
    const { selection, needExpand } = this.props;
    const { needSelect } = selection;
    const className = isFixTr ? fixRowClass : stickRowClass;
    const tds = [];

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
    const { style } = this.props;
    const { isShowFixRow, fixStyle } = this.state;

    return (
      <div className="thead" style={style}>
        {this.renderTr(false)}
        {isShowFixRow && this.renderTr(true, fixStyle)}
      </div>
    );
  }
}
