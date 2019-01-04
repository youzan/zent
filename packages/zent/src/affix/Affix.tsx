import * as React from 'react';
import { Component, CSSProperties } from 'react';
import cx from 'classnames';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import WindowEventHandler from 'utils/component/WindowEventHandler';
import getViewportSize from 'utils/dom/getViewportSize';
import throttle from 'lodash/throttle';

export interface IAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  onPin?: () => void;
  onUnpin?: () => void;
  zIndex?: number;
  className?: string;
  placeHoldClassName?: string;
  prefix?: string;
}

export interface IAffixState {
  position: 'static' | 'fixed';
  width: number | null;
  placeHoldStyle: CSSProperties;
}

export class Affix extends Component<IAffixProps, IAffixState> {
  static propTypes = {
    placeHoldClassName: PropTypes.string,
    className: PropTypes.string,
    prefix: PropTypes.string,
    zIndex: PropTypes.number,
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    onPin: PropTypes.func,
    onUnpin: PropTypes.func,
  };

  static defaultProps = {
    offsetTop: 0,
    prefix: 'zent',
    zIndex: 10,
  };

  state: IAffixState = {
    position: 'static',
    width: null,
    placeHoldStyle: {},
  };

  affix = false;

  pin() {
    const { onPin } = this.props;

    this.affix = true;
    this.setWidth();
    this.setState({ position: 'fixed' });
    onPin && onPin();
  }

  unpin() {
    const { onUnpin } = this.props;

    this.affix = false;
    this.setState({
      position: 'static',
      width: null,
      placeHoldStyle: { overflow: 'hidden' },
    });
    onUnpin && onUnpin();
  }

  setWidth() {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;

    this.setState({
      width: element.offsetWidth,
      placeHoldStyle: {
        width: '100%',
        height: element.offsetHeight,
      },
    });
  }

  updatePin() {
    const affix = this.affix;
    const props = this.props;
    const element = ReactDOM.findDOMNode(this) as HTMLElement;
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
      this.unpin();
    }
    if (!affix && reallyNum <= propsNum) {
      this.pin();
    }
  }

  handleResize = throttle(() => {
    this.updatePin();
    this.setWidth();
  }, 20);

  handleScroll = throttle(() => {
    this.updatePin();
  }, 20);

  getStyleObj() {
    const { zIndex, offsetBottom, offsetTop } = this.props;
    const { position, width } = this.state;
    let styleObj: CSSProperties = {};

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
    const { prefix, className, placeHoldClassName, children } = this.props;
    const wrapClass = cx(`${prefix}-affix`, className);

    return (
      <div className={placeHoldClassName} style={this.state.placeHoldStyle}>
        <div className={wrapClass} style={{ ...this.getStyleObj() }}>
          {children}
        </div>
        <WindowEventHandler eventName="scroll" callback={this.handleScroll} />
        <WindowEventHandler eventName="resize" callback={this.handleResize} />
      </div>
    );
  }
}

export default Affix;
