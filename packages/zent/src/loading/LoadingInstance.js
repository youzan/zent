import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import isBrowser from 'utils/isBrowser';

import PropTypes from 'prop-types';

import Loading from './Loading';

export default class Instance extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    float: PropTypes.bool,
    show: PropTypes.bool,
    zIndex: PropTypes.number,
    containerClass: PropTypes.string
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    // FIXME: use defaultProps when we drop support for static
    // float: false,
    show: false,
    height: 160,
    zIndex: 9998,
    containerClass: ''
  };

  static target;
  static instance;

  // 对外暴露的静态初始方法
  static newInstance = function(props) {
    if (!isBrowser) return;

    let div = document.createElement('div');
    div.className = `${props.prefix}-loading-container ${props.containerClass}`;
    document.body.appendChild(div);
    let loading = ReactDOM.render(<Loading {...props} />, div);
    return {
      show: loading.show,
      container: div
    };
  };

  static on = function(
    { prefix = 'zent', className = '', containerClass = '', zIndex = 9998 } = {}
  ) {
    if (!isBrowser) return;

    if (!this.instance) {
      this.instance = this.newInstance({
        show: true,
        prefix,
        className,
        containerClass,
        zIndex,
        float: true
      });
    }

    this.instance.show({
      show: true
    });
  };

  static off = function() {
    if (!isBrowser) return;

    if (!this.instance) return;

    this.instance.show({
      show: false
    });
  };

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
    if (!isFloat(this.props)) {
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
    const float = isFloat(this.props);

    if (!isFloat(this.props)) {
      return (
        <Loading {...this.props} float={float}>
          {this.props.children}
        </Loading>
      );
    }

    // In case Loading has no children
    return this.props.children || null;
  }
}

// FIXME: remove support for props.static
function isFloat(props) {
  const hasStatic = props.hasOwnProperty('static');
  const hasFloat = props.hasOwnProperty('float');

  if (hasFloat) {
    return props.float;
  }

  return hasStatic ? !props.static : false;
}
