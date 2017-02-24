import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'zent-utils/lodash/throttle';
import helper from '../helper';
import Checkbox from 'zent-checkbox';

let rect;
let relativeTop;
const stickRowClass = 'stickrow';
const fixRowClass = 'fixrow';

const Head = React.createClass({
  getInitialState() {
    return {
      isShowFixRow: false
    };
  },

  componentDidMount() {
    if (this.props.autoStick) {
      this.throttleSetHeadStyle = throttle(this.setHeadStyle, 100, { leading: true });

      window.addEventListener('scroll', this.throttleSetHeadStyle, true);
      window.addEventListener('resize', this.throttleSetHeadStyle, true);
    }
  },

  componentWillUnmount() {
    if (this.props.autoStick) {
      window.removeEventListener('scroll', this.throttleSetHeadStyle, true);
      window.removeEventListener('resize', this.throttleSetHeadStyle, true);
    }
  },

  getRect() {
    // clientrect can't be clone
    let tmpRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    rect = {
      top: tmpRect.top,
      height: tmpRect.height - 1,
      width: tmpRect.width
    };
    relativeTop = rect.top - document.body.getBoundingClientRect().top;
  },

  setHeadStyle() {
    this.getRect();
    if (window.scrollY > relativeTop) {
      this.setState({
        isShowFixRow: true,
        fixStyle: {
          position: 'fixed',
          top: 0,
          left: `${rect.left}px`,
          height: `${rect.height}px`,
          width: `${rect.width}px`,
          zIndex: 1000,
        }
      });
    } else {
      this.setState({
        isShowFixRow: false,
        fixStyle: {}
      });
    }
  },

  getChild(item) {
    if (item.needSort) {
      return (
        <a onClick={this.sort.bind(this, item)}>
          {item.title}
          {item.name === this.props.sortBy && <span className={this.props.sortType} />}
        </a>
      );
    }
    return item.title;
  },

  sort(item) {
    let sortType;
    let name = item.name;

    if (name === this.props.sortBy) {
      sortType = (this.props.sortType === 'desc' ? 'asc' : 'desc');  // toggble current sortType
    } else {
      sortType = 'desc'; // desc sort by default
    }

    this.props.onSort({
      sortBy: name,
      sortType
    });
  },

  onSelect(e) {
    let isChecked = false;
    if (e.target.checked) {
      isChecked = true;
    }

    this.props.selection.onSelectAll(isChecked);
  },

  renderTr(isFixTr, style = {}) {
    let { selection } = this.props;
    let needSelect = selection.needSelect;
    let width;
    let className = isFixTr ? fixRowClass : stickRowClass;

    return (
      <div className={`${className} tr`} style={style} ref={(c) => { this[className] = c }}>
        {this.props.columns.map((item, index) => {
          let cellClass = 'cell';
          if (index === 0 && needSelect) {
            cellClass += ' cell--selection';
          }

          if (item.isMoney) {
            cellClass += ' cell--money';
          }

          width = helper.getCalculatedWidth(item.width);

          let styleObj = {};
          if (width) {
            styleObj = {
              width,
              flex: '0 1 auto'
            };
          }

          return (
            <div
              key={index}
              className={cellClass}
              style={styleObj}
            >
                {
                  index === 0 && needSelect && (
                    <Checkbox
                      className="select-check"
                      onChange={this.onSelect}
                      checked={selection.isSelectAll}
                      indeterminate={selection.isSelectPart}
                    />
                  )
                }
                {this.getChild(item)}
            </div>
          );
        })}
      </div>
    );
  },

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
});

export default Head;
