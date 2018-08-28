import * as React from 'react';
import { Badge, Icon } from '../';

function App() {
  return (
    <div>
      <Badge count={99}>
        <Icon type="bell-o" className="demo-cont"/>
      </Badge>
      <Badge count={120}>
        <Icon type="bell-o" className="demo-cont"/>
      </Badge>
      <Badge count={120} maxCount={10}>
        <Icon type="bell-o" className="demo-cont"/>
      </Badge>
      <Badge count={1200} maxCount={999}>
        <Icon type="bell-o" className="demo-cont"/>
      </Badge>
      <Badge dot>
        <Icon type="bell-o" className="demo-cont"/>
      </Badge>
    </div>
  );
}

export default App;
