import React, { Component } from 'react';
import Portal from '../src';
import cloneDeep from 'zent-utils/lodash/cloneDeep';

import '../assets/simple.scss';

function SimpleChild() {
  return <div>{Date.now()}</div>;
}

const childCandidates = [
  <div>foobar</div>,
  <div>quux</div>,
  <SimpleChild />
];

const selectorCandidates = [
  'body',
  '.dev-container'
];

/*
打开Inspector观察zent-portal，滚动页面观察zent-portal的位置。
*/
export default class Simple extends Component {
  static defaultState = {
    className: 'portal-simple',
    prefix: 'zent',
    visible: false,
    childIndex: 0,
    selectorIndex: 0
  };

  state = cloneDeep(Simple.defaultState);

  blueBg = () => {
    this.setState({
      className: 'portal-simple blue-bg',
      prefix: Simple.defaultState.prefix
    });
  };

  yellowBgWhiteText = () => {
    this.setState({
      prefix: 'custom',
      className: Simple.defaultState.className
    });
  };

  closePortal = () => {
    this.setState({
      visible: false
    });
  };

  openPortal = () => {
    this.setState({
      visible: true
    });
  };

  switchChild = () => {
    const { childIndex } = this.state;
    const nextChildIndex = (childIndex + 1) % 3;
    this.setState({
      childIndex: nextChildIndex
    });
  };

  switchContainer = () => {
    const { selectorIndex } = this.state;
    const nextSelectorIndex = 1 - selectorIndex;
    this.setState({
      selectorIndex: nextSelectorIndex
    });
  };

  render() {
    const { className, prefix, visible, childIndex, selectorIndex } = this.state;

    return (
      <div className="portal-simple-placeholder">
        {visible &&
          <Portal
            className={className}
            prefix={prefix}
            selector={selectorCandidates[selectorIndex]}>
            <div className="child-wrapper">{childCandidates[childIndex]}</div>
          </Portal>}
        <div className="actions">
          <button onClick={this.blueBg}>蓝色背景(css class)</button>
          <button onClick={this.yellowBgWhiteText}>黄底白字(prefix)</button>
          {visible && <button onClick={this.closePortal}>close portal</button>}
          {!visible && <button onClick={this.openPortal}>open portal</button>}
          <button onClick={this.switchChild}>switch child</button>
          <button onClick={this.switchContainer}>switch selector(parent)</button>
        </div>
      </div>
    );
  }
}
