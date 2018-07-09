import * as React from 'react';
import { CopyButton, Button } from '../';

function App() {
  return (
    <div>
      <CopyButton text="basic usage" />
      <CopyButton text="customize usage" onCopySuccess="复制成功啦！">
        <Button type="primary">点我</Button>
      </CopyButton>
    </div>
  );
}

export default App;
