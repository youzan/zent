import React, { Component } from 'react';
import { getElementLeft, getElementTop, getElementPositionType, calculateStyle } from './getPosition';

class Pop extends Component {

  static wrapper
  static style
  static container

  constructor(props) {
    super(props);
    ['show', 'shadowHide', 'setPosition', 'setWrapperRef', 'handleBlur'].forEach(item => this[item] = this[item].bind(this));
  }

  state = {
    ...this.props,
    show: false,
    shadowVisible: true
  }

  // 对外暴露的更新函数
  show(info) {
    if (info && info.show) {
      let target = info.target;
      if (!target) {
        return;
      }
      this.style = {
        left: getElementLeft(target),
        top: getElementTop(target),
        width: target.offsetWidth,
        height: target.offsetHeight
      };
      if (getElementPositionType(target)) {
        this.style.position = 'fixed';
      }
    }

    // 这段代码有点丑，Instance 的代码其实写得很不干脆
    this.setState({
      show: info.show,
      shadowVisible: true,
      content: info.content,
      position: info.position,
      header: info.header,
      type: info.type,
      confirmText: info.confirmText,
      cancelText: info.cancelText
    });
  }

  shadowHide() {
    this.setState({
      shadowVisible: false
    });
  }

  setPosition() {
    if (!this.wrapper) {
      return;
    }

    this.style = calculateStyle({
      style: this.style,
      position: this.state.position,
      height: this.wrapper.clientHeight,
      width: this.wrapper.clientWidth
    });

    // 弹出框的位置
    this.wrapper.style.top = `${this.style.top}px`;
    this.wrapper.style.left = `${this.style.left}px`;
    if (this.style.position) {
      this.wrapper.style.position = this.style.position;
    }

    // 小箭头的位置
    if (this.style.arrow_top) {
      this.arrow.style.top = `${this.style.arrow_top}px`;
    }
    if (this.style.arrow_right) {
      this.arrow.style.right = `${this.style.arrow_right}px`;
    }
    if (this.style.arrow_bottom) {
      this.arrow.style.bottom = `${this.style.arrow_bottom}px`;
    }
    if (this.style.arrow_left) {
      this.arrow.style.left = `${this.style.arrow_left}px`;
    }

    this.focus();
  }

  focus() {
    let activeDom = document.activeElement;
    if (activeDom !== this.wrapper && !this.wrapper.contains(activeDom)) {
      this.wrapper.focus();
    }
  }

  handleBlur(e) {
    this.props.handleBlur(e, this.wrapper);
  }

  setWrapperRef(name, el) {
    this[name] = el;
  }

  componentDidMount() {
    this.setPosition();
  }

  componentDidUpdate() {
    if (this.state.shadowVisible) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    // console.log('内部被卸载');
  }

  render() {
    let { onConfirm, handleConfirm, handleMouseLeave, className, prefix } = this.props;
    let { content, position, header, type, confirmText, cancelText } = this.state;
    let shadowClass = '';
    if (this.state.show && !this.state.shadowVisible) {
      shadowClass = `${prefix}-popover-hidden`;
    }
    if (this.state.show && this.state.shadowVisible) {
      shadowClass = `${prefix}-popover-show`;
    }

    return (
      this.state.show && content && content !== '' ?
        <div
          className={`${prefix}-popover ${position} ${className} ${shadowClass}`}
          ref={this.setWrapperRef.bind(this, 'wrapper')}
          onBlur={this.handleBlur}
          onMouseLeave={handleMouseLeave}
          tabIndex="1"
        >
          {header && <div className={`${prefix}-popover-header`}>{header}</div>}
          <div className={`${prefix}-popover-inner`}>
            {content}
            {onConfirm && (
              <div className={`${prefix}-popover-buttons`}>
                <button
                  name="popbtn"
                  className={`${prefix}-btn ${prefix}-btn-small ${prefix}-btn-${type}`}
                  onClick={handleConfirm.bind(null, true)}
                >
                  {confirmText}
                </button>
                <button
                  name="popbtn"
                  className={`${prefix}-btn ${prefix}-btn-small`}
                  onClick={handleConfirm.bind(null, false)}
                >
                  {cancelText}
                </button>
              </div>
              )}
          </div>
          <i className={`${prefix}-popover-arrow`} ref={this.setWrapperRef.bind(this, 'arrow')} />
        </div> :
        null
    );
  }
}

export default Pop;
