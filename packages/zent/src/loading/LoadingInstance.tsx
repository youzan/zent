import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

import isBrowser from '../utils/isBrowser';

import Loading, { ILoadingProps } from './Loading';

export interface IInstance {
  show(props: ILoadingProps): void;
  container: HTMLDivElement;
}

export { ILoadingProps };

export default class Instance extends Component<ILoadingProps> {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    float: PropTypes.bool,
    show: PropTypes.bool,
    showDelay: PropTypes.number,
    zIndex: PropTypes.string,
    containerClass: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    // FIXME: use defaultProps when we drop support for static
    // float: false,
    show: false,
    showDelay: 0,
    zIndex: 9998,
    containerClass: '',
  };

  instance: Promise<IInstance> | null = null;

  componentDidMount() {
    this.renderLoading();
  }

  // 因为需要确保内部元素已经 render 完毕，所以使用 did，但是因此带来额外的对 show 字段的判断逻辑
  componentDidUpdate() {
    this.renderLoading();
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.then(({ container }) => {
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
      });
    }
  }

  // 通过以下函数与组件通信
  renderLoading(target?: Element) {
    // static 方式，loading 将存在于文档流中
    if (!isFloat(this.props)) {
      return;
    }

    if (!this.instance) {
      if (!target) {
        target = ReactDOM.findDOMNode(this) as Element;
      }
      this.instance = newInstance({
        ...this.props,
        target,
      });
    } else if (this.instance) {
      this.instance.then(({ show }) => {
        show && show(this.props);
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

    // Return null to make React happy if Loading has no children
    return this.props.children || null;
  }
}

function newInstance(props) {
  if (!isBrowser) return;

  let div = document.createElement('div');
  div.className = `${props.prefix}-loading-container ${props.containerClass}`;
  document.body.appendChild(div);

  return new Promise<IInstance>(resolve => {
    ReactDOM.render(
      <Loading
        {...props}
        ref={loading => {
          if (loading) {
            resolve({
              show: loading.show,
              container: div,
            });
          }
        }}
      />,
      div
    );
  });
}

// Backward compatible with `static`
function isFloat(props): boolean {
  const hasStatic = props.hasOwnProperty('static');
  const hasFloat = props.hasOwnProperty('float');

  if (hasFloat) {
    return props.float;
  }

  return hasStatic ? !props.static : false;
}
