import React, { Component } from 'react';
import Alert from '../src';
import Icon from 'zent-icon';

import '../assets/index.scss';
import '../assets/examples/base.scss';
import 'zent-icon/lib/index.css';
import '../assets/examples/simple.scss';

export default class Simple extends Component {
  render() {
    return (
      <div className="zent-alert-example simple">
        <Alert>
          <Icon type="error-circle" /> <span>警告：6月15日起，交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</span>
          <a href="//youzan.com" target="_blank">立即订购</a>
        </Alert>
        <Alert type="error">错误：您的店铺试用期已经结束，已经入打烊状态，买家将无法继续访问您的店铺。</Alert>
        <Alert type="warning" rounded>圆角警告：6月15日起，交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
        <Alert type="error" rounded>圆角错误：您的店铺试用期已经结束，已经入打烊状态，买家将无法继续访问您的店铺。</Alert>
      </div>
    );
  }
}
