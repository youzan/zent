import * as React from 'react';
import { Affix, Alert } from '../';

interface State {
  text: string;
}

class App extends React.Component<null, State> {

  state = {
    text: '固钉'
  }

  onPin = () => {
    this.setState({ text: '已经固定啦' });
  }
  onUnpin = () => {
    this.setState({ text: '取消固定啦' });
  }

  render() {
    return (
      <Affix offsetTop={200} onPin={this.onPin} onUnpin={this.onUnpin}>
          <Alert type="warning">{this.state.text}</Alert>
      </Affix>
    )
  }
}

export default App
