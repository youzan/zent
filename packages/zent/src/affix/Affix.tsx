import * as React from 'react';
import { Component, CSSProperties } from 'react';
import cx from 'classnames';
import * as ReactDOM from 'react-dom';

import getViewportSize from '../utils/dom/getViewportSize';
import { WindowResizeHandler } from '../utils/component/WindowResizeHandler';
import { WindowScrollHandler } from '../utils/component/WindowScrollHandler';

export interface IAffixProps {
  offsetTop: number;
  offsetBottom?: number;
  onPin?: () => void;
  onUnpin?: () => void;
  zIndex: number;
  className?: string;
  placeholderClassName?: string;
}

export interface IAffixState {
  position: 'static' | 'fixed';
  width: number | undefined;
  placeholderStyle: CSSProperties;
}

export class Affix extends Component<IAffixProps, IAffixState> {
  static defaultProps = {
    offsetTop: 0,
    zIndex: 10,
  };

  state: IAffixState = {
    position: 'static',
    width: undefined,
    placeholderStyle: {},
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
      width: undefined,
      placeholderStyle: { overflow: 'hidden' },
    });
    onUnpin && onUnpin();
  }

  setWidth() {
    const element = ReactDOM.findDOMNode(this) as HTMLElement;

    if (!element) {
      return;
    }

    this.setState({
      width: element.offsetWidth,
      placeholderStyle: {
        width: '100%',
        height: element.offsetHeight,
      },
    });
  }

  updatePin() {
    const affix = this.affix;
    const props = this.props;
    const element = ReactDOM.findDOMNode(this) as HTMLElement;

    if (!element) {
      return;
    }

    let reallyNum: number, propsNum: number;

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

  redraw = () => {
    this.updatePin();
    this.setWidth();
  };

  reposition = () => {
    this.updatePin();
  };

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
    this.redraw();
  }

  componentDidUpdate(prevProps: IAffixProps) {
    if (
      prevProps.offsetBottom !== this.props.offsetBottom ||
      prevProps.offsetTop !== this.props.offsetTop
    ) {
      this.redraw();
    }
  }

  render() {
    const { className, placeholderClassName, children } = this.props;
    const wrapClass = cx('zent-affix', className);

    return (
      <div className={placeholderClassName} style={this.state.placeholderStyle}>
        <div className={wrapClass} style={{ ...this.getStyleObj() }}>
          {children}
        </div>
        <WindowScrollHandler onScroll={this.reposition} />
        <WindowResizeHandler onResize={this.redraw} />
      </div>
    );
  }
}

export default Affix;
