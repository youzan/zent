import * as React from 'react';
import { BlockHeader } from '../';

function App() {
  return (
    <div>
      <BlockHeader
        title="有赞微商城"
        tooltip={<span>test</span>}
        content={<a href="/">content</a>}
        position="top-center"
      />
      <br />
      <BlockHeader
        className="test-class"
        title="有赞微商城"
        position="top-center"
      >
        <a href="/">children</a>
      </BlockHeader>
      <br />
      <BlockHeader
        title="有赞微商城"
        tooltip={<span>test</span>}
        content={<a href="/">content</a>}
        position="top-center"
        childAlign="right"
      />
      <br />
      <BlockHeader
        className="test-class"
        title="有赞微商城"
        tooltip={<span>test</span>}
        position="top-center"
        childAlign="right"
      >
        <a href="/">children</a>
      </BlockHeader>
    </div>
  );
}

export default App;
