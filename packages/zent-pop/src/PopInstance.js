import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Pop from './Pop.js';

// 找爸爸
function ditectParent(pNode, cNode) {
  if (cNode === document.body) {
    return false;
  }
  if (pNode === cNode) {
    return true;
  }

  return ditectParent(pNode, cNode.parentNode);
}

// 对外暴露的静态初始方法
const newInstance = (props) => {
  let div = document.createElement('div');
  div.className = `${props.prefix}-pop-container`;
  document.body.appendChild(div);
  let pop = ReactDOM.unstable_renderSubtreeIntoContainer(props.parent, <Pop {...props} />, div);
  return {
    show: pop.show,
    shadowHide: pop.shadowHide,
    container: div
  };
};

export default class PopInstance extends Component {

  static propTypes = {
    trigger: PropTypes.oneOf([
      'click', 'hover', 'focus'
    ]),
    position: PropTypes.oneOf([
      'left-top', 'left-center', 'left-bottom',
      'right-top', 'right-center', 'right-bottom',
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ]),
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.oneOf([
      'primary', 'default', 'danger', 'success'
    ]),
    prefix: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,
    mouseLeaveDelay: PropTypes.number
  }

  static defaultProps = {
    trigger: 'click',
    position: 'top-center',
    confirmText: '确定',
    cancelText: '取消',
    type: 'primary',
    prefix: 'zent',
    className: '',
    visible: false,
    mouseLeaveDelay: 200
  }

  static target
  static popInstace

  constructor(props) {
    super(props);
    ['onFire', 'handleConfirm', 'handleBlur', 'handleMouseLeave', 'onMouseLeave'].forEach(item => this[item] = this[item].bind(this));
  }

  state = {
    show: false
  }

  // show 事件触发
  onFire(state) {
    if (typeof state === 'boolean') {
      this.target = this.container;
      this.desideStateOrProp(state);
    } else {
      this.target = this.container;
      this.desideStateOrProp(!this.state.show);
    }
  }

  desideStateOrProp(show) {
    // 如果使用外部维护 visible
    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(show);
    } else {
      this.setState({
        show
      });
    }
  }

  // confirm事件
  handleConfirm(type) {
    this.onFire(false, this.target);
    if (type) {
      if (this.props.onConfirm) {
        this.props.onConfirm();
      }
    } else {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
  }

  handleBlur(e, container) {
    if (!this.state.show || this.props.trigger !== 'click') {
      return;
    }

    // 关闭的时候只能点 form 相关的标签才能关闭的逻辑也确实有一些蛋疼
    if (e.relatedTarget && (e.relatedTarget.name !== 'close' && e.relatedTarget.className !== 'close')) {
      if (ditectParent(container, e.relatedTarget) || e.relatedTarget === this.target) {
        return;
      }
    }

    if (this.props.onVisibleChange) {
      this.props.onVisibleChange(false);
    } else {
      this.setState({
        show: false
      });
    }
  }

  handleMouseLeave() {
    if (!this.state.show || this.props.trigger !== 'hover') {
      return;
    }
  }

  onMouseLeave() {
  }

  componentWillReceiveProps(newProps) {
    if (this.props.onVisibleChange) {
      this.setState({
        show: newProps.visible
      });
    }
  }

  componentDidMount() {
    this.renderPop();
  }

  componentDidUpdate() {
    this.renderPop();
  }

  // 此处对组件被卸载的情况进行了优化，一般用户不会注意到这个优化
  componentWillUnmount() {
    if (this.popInstance) {
      let popContainer = this.popInstance.container;
      ReactDOM.unmountComponentAtNode(this.popInstance.container);
      popContainer.parentNode.removeChild(popContainer);
      delete this.popInstance;
    }
  }

  // 通过以下函数与组件通信
  renderPop() {
    let { show } = this.state;

    if (show) {
      this.popInstance = this.popInstance || newInstance({
        ...this.props,
        handleConfirm: this.handleConfirm,
        handleBlur: this.handleBlur,
        handleMouseLeave: this.handleMouseLeave,
        parent: this
      });
    }
    if (this.popInstance) {
      let delayTime = show ? 0 : this.props.mouseLeaveDelay;

      if (!show) {
        this.popInstance.shadowHide();
      }

      setTimeout(() => {
        this.popInstance && this.popInstance.show({
          ...this.props,
          show: this.state.show,
          target: this.target,
        });
      }, delayTime);
    }
  }

  render() {
    let { trigger } = this.props;
    let cont = {};

    switch (trigger) {
      case 'hover':
        cont.onMouseOver = this.onFire.bind(null, true);
        cont.onMouseLeave = this.onFire.bind(null, false);
        break;
      case 'focus':
        cont.onMouseDown = this.onFire.bind(null, true);
        cont.onMouseUp = this.onFire.bind(null, false);
        break;
      case 'click':
      default:
        cont.onClick = this.onFire;
    }

    if (typeof this.props.children.type === 'string') {
      if (trigger === 'click') {
        cont.onClick = (ev) => {
          this.onFire(ev);
          if (this.props.children.props.onClick) {
            this.props.children.props.onClick(ev);
          }
        };
      }

      return React.cloneElement(this.props.children, {
        ...cont,
        ref: (el) => this.container = el
      });
    }

    return (
      <div ref={(el) => this.container = el} {...cont}>
        {this.props.children}
      </div>
    );
  }
}
