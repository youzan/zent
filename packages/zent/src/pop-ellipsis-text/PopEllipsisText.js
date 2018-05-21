import React, { isValidElement, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Pop from 'pop';
import cx from 'classnames';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import map from 'lodash/map';
import omit from 'lodash/omit';
import getWidth from 'utils/getWidth';

export default class PopEllipsisText extends Component {
  state = {
    width: this.props.width,
  };

  static defaultProps = {
    prefix: 'zent',
    width: '100%',
    trigger: 'hover',
    position: 'top-right',
  };

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    count: PropTypes.number,
    className: PropTypes.string,
    popClassName: PropTypes.string,
    text: PropTypes.node.isRequired,
    line: PropTypes.number,
  };

  isPercent(value) {
    return typeof value === 'string' && value.indexOf('%') !== -1;
  }

  calPercentValue(value, percent) {
    const num = +percent.replace('%', '');
    return value * num / 100;
  }

  getFont(style = {}) {
    const fontSize = style.fontSize || '12px';
    const fontFamily = style.fontFamily || 'Helvetica';
    const fontWeight = style.fontWeight || '400';

    return `${fontSize} ${fontFamily} ${fontWeight}`;
  }

  calcWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  getWidth() {
    const { width, line } = this.props;
    if (isNumber(line) && this.isPercent(width)) {
      const { clientWidth } = ReactDOM.findDOMNode(this.textWrapper).parentNode;
      this.setState({
        width: this.calPercentValue(clientWidth, width),
      });
    }
  }

  componentDidMount() {
    this.getWidth();
  }

  getPopContent(children) {
    const { popClassName, content, text } = this.props;

    const omitedProps = [
      'popClassName',
      'content',
      'text',
      'className',
      'style',
      'count',
      'line',
      'type',
    ];

    return (
      <Pop
        {...omit(this.props, omitedProps)}
        className={popClassName}
        content={content || text}
      >
        {children}
      </Pop>
    );
  }

  traverseReactElement(el, pureText = '') {
    if (!isValidElement(el)) {
      return el;
    }
    // ReactElement
    const { children } = el.props;
    if (!(children instanceof Array)) {
      if (isValidElement(children)) {
        this.traverseReactElement(children.props.children, pureText);
      } else if (isString(children)) {
        return pureText + children;
      }
    } else {
      const childTextArr = map(children, child =>
        this.traverseReactElement(child)
      );
      return pureText + childTextArr.join('');
    }
  }

  renderSingleLine(clz) {
    const { text, style } = this.props;
    const { width } = this.state;

    return this.getPopContent(
      <div className={clz} style={{ ...style, ...getWidth(width) }}>
        {text}
      </div>
    );
  }

  renderMutilLine(clz) {
    const { line, text, style } = this.props;
    const { width } = this.state;

    return this.getPopContent(
      <div
        className={clz}
        style={{ WebkitLineClamp: line, ...style, ...getWidth(width) }}
      >
        {text}
      </div>
    );
  }

  renderFixedCount(clz) {
    const { text, style, count } = this.props;

    return this.getPopContent(
      <div style={style} className={clz}>
        {text.slice(0, count)}...
      </div>
    );
  }

  renderPureText(clz) {
    const { text, style } = this.props;

    return (
      <div
        style={style}
        className={clz}
        ref={textWrapper => (this.textWrapper = textWrapper)}
      >
        {text}
      </div>
    );
  }

  render() {
    const { prefix, line, text, style, count, className } = this.props;
    const { width } = this.state;

    // 如果传递ReactElement 拼装text
    const pureText = this.traverseReactElement(text);
    const textWidth = this.calcWidth(pureText, this.getFont(style));

    const clz = cx(`${prefix}-pop-ellipsis`, className);
    const clzEllipsis = cx(clz, `${prefix}-pop-ellipsis-common`, {
      [`${prefix}-pop-ellipsis-multi`]: isNumber(line),
      [`${prefix}-pop-ellipsis-single`]: !isNumber(line),
    });

    if (isNumber(line) && isNumber(width) && line * width < textWidth) {
      return this.renderMutilLine(clzEllipsis);
    }

    if (isNumber(width) && width < textWidth) {
      return this.renderSingleLine(clzEllipsis);
    }

    if (isNumber(count) && count < text.length) {
      return this.renderFixedCount(clz);
    }

    return this.renderPureText(clz);
  }
}
