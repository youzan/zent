import React, { Component, PureComponent } from 'react';
import { getElementLeft, getElementTop } from './getPosition';

export default class Loading extends (PureComponent || Component) {
  state = {
    show: this.props.show
  };

  show = info => {
    // Do not add this optimization, setState is an async operation
    // Assume this.state.show is false,
    // show({show: true}); show({show: false})
    // will not set show to false if we add these lines.
    //
    // if (info.show === this.state.show) {
    //   return;
    // }

    if (info.show) {
      let target = this.props.target;
      if (target) {
        this.style = {
          left: getElementLeft(target),
          top: getElementTop(target),
          width: target.offsetWidth,
          height: target.offsetHeight
        };
      }
    }

    this.setState({
      show: info.show
    });
  };

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
    this.setPosition();
  }

  componentDidUpdate() {
    this.setPosition();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  render() {
    let { prefix, className, containerClass } = this.props;

    if (!this.props.float) {
      return (
        <div
          className={`${prefix}-loading-container ${prefix}-loading-container-static ${containerClass}`}
          style={{
            height:
              this.props.children || !this.state.show
                ? 'initial'
                : this.props.height
          }}
        >
          {this.props.children}
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
