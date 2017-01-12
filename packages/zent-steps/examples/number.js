import React, { Component } from 'react';
import Steps from '../src/index.js';
import '../assets/index.scss';
import '@youzan/zent-icon/assets/index.scss';

let Step = Steps.Step;

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 2
    };

    this.nextStep = this.nextStep.bind(this);
  }

  nextStep() {
    let s = this.state.current + 1;

    if (s === 4) {
      s = 0;
    }

    this.setState({
      current: s
    });
  }

  render() {
    let { current } = this.state;

    return (
      <div>
        <Steps current={current} status="error">
          <Step title="第一步" description="这里是多信息的描述啊描述啊描述啊" />
          <Step title="第二步" description="这里是多信息的描述啊描述啊描" />
          <Step title="第三步" description="这里是多信息的描述啊描述啊描述啊描述啊" />
        </Steps>
        <button onClick={this.nextStep} style={{ marginTop: '20px' }}>下一步</button>
      </div>
    );
  }
}

export default Example;
