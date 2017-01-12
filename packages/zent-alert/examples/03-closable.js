import React, { Component } from 'react';
import Alert from '../src';
import Button from '@youzan/zent-button';

import '../assets/index.scss';
import '../assets/examples/base.scss';
import '../assets/examples/large.scss';
import '@youzan/zent-button/lib/index.css';

export default class Closable extends Component {
  onClose = () => {
    alert('closed'); // eslint-disable-line
  };

  render() {
    return (
      <div className="zent-alert-example large">
        <Alert size="large" closable type="warning" onClose={this.onClose}>
          <div className="content">
            <span className="text">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</span>{'\n'}
            <span>官方咨询电话：0571-86891988</span>
          </div>
          <Button>了解详情</Button>
        </Alert>
        <Alert closable rounded>警告：交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
        <Alert type="error" closable rounded>错误：您的店铺试用期已经结束，已经入打烊状态，买家将无法继续访问您的店铺。</Alert>
      </div>
    );
  }
}
