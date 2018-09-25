import React, { PureComponent } from 'react';
import cx from 'classnames';
import has from 'lodash/has';

import { getElementLeft, getElementTop } from './getPosition';

export default class Loading extends PureComponent {
  constructor(props) {
    super(props);

    this.showDelayTimer = null;
    this.ifMounted = false;
    this.state = {
      show: false,
    };

    const { showDelay, show } = props;
    this.applyShowDelay(show, showDelay, (s, async) => {
      if (async) {
        this.safeSetState({
          show: s,
        });
      } else {
        this.state.show = s;
      }
    });
  }

  show = info => {
    // Do not add this optimization, setState is an async operation
    // Assume this.state.show is false,
    // show({show: true}); show({show: false})
    // will not set show to false if we add these lines.
    //
    // if (info.show === this.state.show) {
    //   return;
    // }

    this.applyShowDelay(info.show, info.showDelay, show => {
      if (show) {
        let target = this.props.target;
        if (target) {
          this.style = {
            left: getElementLeft(target),
            top: getElementTop(target),
            width: target.offsetWidth,
            height: target.offsetHeight,
          };
        }
      }

      this.safeSetState({
        show,
      });
    });
  };

  applyShowDelay(show, showDelay, callback) {
    if (!show || !showDelay) {
      return callback(show, false);
    }

    clearTimeout(this.showDelayTimer);
    this.showDelayTimer = setTimeout(() => {
      callback(show, true);
    }, showDelay);
  }

  setPosition = () => {
    if (!this.wrapper) {
      return;
    }

    this.wrapper.style.zIndex = this.props.zIndex;

    if (this.style) {
      this.wrapper.style.top = `${this.style.top}px`;
      this.wrapper.style.left = `${this.style.left}px`;
      this.wrapper.style.width = `${this.style.width}px`;
      this.wrapper.style.height = `${this.style.height}px`;
    } else {
      this.wrapper.style.position = 'fixed';
    }
  };

  setWrapperRef = el => {
    this.wrapper = el;
  };

  componentDidMount() {
    this.ifMounted = true;
    this.setPosition();
  }

  componentDidUpdate() {
    this.setPosition();
  }

  componentWillUnmount() {
    this.ifMounted = false;
    clearTimeout(this.showDelayTimer);
    this.showDelayTimer = null;
  }

  componentWillReceiveProps(nextProps) {
    const { show, showDelay } = nextProps;

    if (this.props.show !== show) {
      this.applyShowDelay(show, showDelay, s => {
        this.safeSetState({
          show: s,
        });
      });
    }
  }

  safeSetState(state, cb) {
    if (this.ifMounted) {
      return this.setState(state, cb);
    }
  }

  render() {
    let { prefix, className, containerClass, children, height } = this.props;

    if (!this.props.float) {
      // 没有包裹内容时设置一个默认高度，有包裹内容时默认撑满内容高度
      const hasHeightProp = has(this.props, 'height');
      if (!children && !hasHeightProp) {
        height = 160;
      } else if (children && !hasHeightProp) {
        height = 'initial';
      }

      return (
        <div
          className={cx(
            `${prefix}-loading-container`,
            `${prefix}-loading-container-static`,
            containerClass,
            {
              [`${prefix}-loading-container--empty`]:
                React.Children.count(children) === 0,
            }
          )}
          style={{ height }}
        >
          {children}
          {this.state.show && (
            <div className={`${prefix}-page-loading ${className}`}>
              <div className={`${prefix}-page-mask`} />
            </div>
          )}
        </div>
      );
    }

    return (
      this.state.show && (
        <div
          className={`${prefix}-page-loading ${className}`}
          ref={this.setWrapperRef}
        >
          <div className={`${prefix}-page-mask`} />
        </div>
      )
    );
  }
}
