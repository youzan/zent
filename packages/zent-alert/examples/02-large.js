import React, { Component } from 'react';
import Alert from '../src';
import Button from 'zent-button';

import 'zent-button/lib/index.css';
import '../assets/index.scss';
import '../assets/examples/base.scss';
import '../assets/examples/large.scss';

export default class Large extends Component {
  render() {
    return (
      <div className="zent-alert-example large">
        <Alert size="large" type="warning">
          <div className="content">
            <span className="text">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</span><br />
            <span>官方咨询电话：0571-86891988</span>
          </div>
          <Button>了解详情</Button>
        </Alert>
        <Alert type="error" size="large">
          <span className="text">错误：您的店铺试用期已经结束，已经入打烊状态，买家将无法继续访问您的店铺。</span><br />
          <span>官方咨询电话：0571-86891988</span>
        </Alert>
      </div>
    );
  }
}
