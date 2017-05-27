import React, { Component } from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import WindowEventHandler from 'utils/component/WindowEventHandler';
import getViewportSize from 'utils/dom/getViewportSize';
import throttle from 'lodash/throttle';

class Affix extends Component {
  static propTypes = {
    placeHoldClassName: PropTypes.string,
    className: PropTypes.string,
    prefix: PropTypes.string,
    zIndex: PropTypes.number,
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    onPin: PropTypes.func,
    onUnpin: PropTypes.func
  };

  static defaultProps = {
    offsetTop: 0,
    prefix: 'zent',
    zIndex: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      position: 'static',
      width: null,
      placeHoldStyle: {}
    };
  }

  affix = false;

  setFixed() {
    const { onPin } = this.props;

    this.affix = true;
    this.setWidth();
    this.setState({ position: 'fixed' });
    onPin && onPin();
  }

  setonUnpin() {
    const { onUnpin } = this.props;

    this.affix = false;
    this.setState({ position: 'static', width: null, placeHoldStyle: null });
    onUnpin && onUnpin();
  }

  setWidth() {
    const element = ReactDOM.findDOMNode(this);

    this.setState({
      width: element.offsetWidth,
      placeHoldStyle: {
        width: '100%',
        height: element.offsetHeight
      }
    });
  }

  checkFixed() {
    const affix = this.affix;
    const props = this.props;
    const element = ReactDOM.findDOMNode(this);
    let reallyNum, propsNum;

    if (props.offsetBottom !== undefined) {
      reallyNum =
        getViewportSize().height - element.getBoundingClientRect().bottom;
      propsNum = props.offsetBottom;
    } else {
      reallyNum = element.getBoundingClientRect().top;
      propsNum = props.offsetTop;
    }

    if (affix && reallyNum > propsNum) {
      this.setonUnpin();
    }
    if (!affix && reallyNum <= propsNum) {
      this.setFixed();
    }
  }

  handleResize = throttle(() => {
    this.checkFixed();
    this.setWidth();
  }, 20);

  handleScroll = throttle(() => {
    this.checkFixed();
  }, 20);

  getStyleObj() {
    const { zIndex, offsetBottom, offsetTop } = this.props;
    const { position, width } = this.state;
    let styleObj = {};

    if (position === 'fixed') {
      styleObj = { position, zIndex, width };
      offsetBottom !== undefined
        ? (styleObj.bottom = offsetBottom)
        : (styleObj.top = offsetTop);
    } else {
      styleObj = { position };
    }

    return styleObj;
  }

  componentDidMount() {
    this.handleResize();
  }

  render() {
    const { prefix, className, placeHoldClassName } = this.props;
    const wrapClass = cx(`${prefix}-affix`, className);

    return (
      <div className={placeHoldClassName} style={this.state.placeHoldStyle}>
        <div className={wrapClass} style={{ ...this.getStyleObj() }}>
          {this.props.children}
        </div>
        <WindowEventHandler eventName="scroll" callback={this.handleScroll} />
        <WindowEventHandler eventName="resize" callback={this.handleResize} />

      </div>
    );
  }
}

export default Affix;
