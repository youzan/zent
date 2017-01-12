import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Loading from './Loading';

export default class Instance extends Component {

  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    static: PropTypes.bool,
    show: PropTypes.bool,
    zIndex: PropTypes.number,
    containerClass: PropTypes.string
  }

  static defaultProps = {
    prefix: 'zent',
    className: '',
    static: true,
    show: false,
    height: 160,
    zIndex: 9998,
    containerClass: ''
  }

  static target
  static instance

  // 对外暴露的静态初始方法
  static newInstance = function (props) {
    let div = document.createElement('div');
    div.className = `${props.prefix}-loading-container ${props.containerClass}`;
    document.body.appendChild(div);
    let loading = ReactDOM.render(<Loading {...props} />, div);
    return {
      show: loading.show,
      container: div
    };
  }

  static on = function ({ prefix = 'zent', className = '', containerClass = '', zIndex = 9998 } = {}) {
    if (!this.instance) {
      this.instance = this.newInstance({
        show: true,
        prefix,
        className,
        containerClass,
        zIndex
      });
    }

    this.instance.show({
      show: true
    });
  }

  static off = function () {
    this.instance.show({
      show: false
    });
  }

  componentDidMount() {
    this.renderLoading();
  }

  // 因为需要确保内部元素已经 render 完毕，所以使用 did，但是因此带来额外的对 show 字段的判断逻辑
  componentDidUpdate() {
    this.renderLoading();
  }

  componentWillUnmount() {
    if (this.instance) {
      let loadingContainer = this.instance.container;
      ReactDOM.unmountComponentAtNode(this.instance.container);
      loadingContainer.parentNode.removeChild(loadingContainer);
    }
  }

  // 通过以下函数与组件通信
  renderLoading(target) {
    // static 方式，loading 将存在于文档流中
    if (this.props.static) {
      return;
    }

    if (!this.instance) {
      if (!target) {
        target = ReactDOM.findDOMNode(this);
      }
      this.instance = Instance.newInstance({
        ...this.props,
        target
      });
    }

    if (this.instance) {
      this.instance.show({
        ...this.props
      });
    }
  }

  render() {
    if (this.props.static) {
      return (
        <Loading {...this.props}>
          {this.props.children}
        </Loading>
      );
    }

    return this.props.children;
  }
}
