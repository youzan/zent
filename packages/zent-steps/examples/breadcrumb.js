import React, { Component } from 'react';
import Steps from '../src/index.js';
import '../assets/index.scss';

class Example extends Component {
  render() {
    return (
      <div>
        <Steps current={2} type="breadcrumb">
          <Steps.Step title="登录有赞账号" />
          <Steps.Step title="选择门店" />
          <Steps.Step title="绑定门店" />
          <Steps.Step title="完成" />
        </Steps>
      </div>
    );
  }
}

export default Example;
