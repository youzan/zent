import * as React from 'react';
import { Card } from '../';


function App() {
  return (
    <div>
      <Card style={{ width: 400 }}>
        <p>Card item</p>
      </Card>
      <Card style={{ width: 400 }} title="Card Title">
        <p>Card item</p>
        <p>Card item</p>
      </Card>
      <Card
        style={{ width: 400 }}
        title="Card Title"
        action={<a target="_blank" href="//youzan.com">有赞</a>}
      >
          <p>Card item</p>
      </Card>
      <Card style={{ width: 400 }} title="外层卡片">
        <p style={{ marginBottom: 10 }}>Card content</p>

        <Card type="nested" title="内层卡片">
          <p>Nested card content</p>
        </Card>
      </Card>
      <Card style={{ width: 400 }} loading title="Card Title">
        <p>Card item</p>
      </Card>
    </div>
  )
}

export default App
