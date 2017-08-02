import React, { Component, PureComponent } from 'react';
import { getElementLeft, getElementTop } from './getPosition';

export default class Loading extends (PureComponent || Component) {
  static style;
  static wrapper;

  constructor(props) {
    super(props);
    ['show', 'setPosition', 'setWrapperRef'].forEach(
      item => (this[item] = this[item].bind(this))
    );
  }

  state = {
    show: this.props.show
  };

  show(info) {
    if (info.show === this.state.show) {
      return;
    }

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
  }

  setPosition() {
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
  }

  setWrapperRef(name, el) {
    this[name] = el;
  }

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
          {this.state.show &&
            <div className={`${prefix}-page-loading ${className}`}>
              <div className={`${prefix}-page-mask`} />
            </div>}
        </div>
      );
    }

    return (
      this.state.show &&
      <div
        className={`${prefix}-page-loading ${className}`}
        ref={this.setWrapperRef.bind(null, 'wrapper')}
      >
        <div className={`${prefix}-page-mask`} />
      </div>
    );
  }
}
