import * as React from 'react';
import { Alert, Sweetalert } from '../';

class App extends React.Component<null, null> {
  render() {
    return (
      <Alert
        type="info"
        closable
        onClose={() => Sweetalert.alert({ content: '公告关闭了' })}
      >
        这个公告关闭时有回调函数。
      </Alert>
    )
  }
}

export default App
