import * as React from 'react';
import { Avatar, Badge } from '../';

function App() {
  return (
    <div>
      <Avatar style={{ backgroundColor: '#a1b56c' }}>MJ</Avatar>
      <Avatar style={{ backgroundColor: '#f7ca88' }}>Billie</Avatar>
      <Avatar style={{ backgroundColor: '#ab4642' }}>Jean</Avatar>

      <Badge dot>
        <Avatar style={{ backgroundColor: '#ba8baf' }}>MJ</Avatar>
      </Badge>

      <Badge count={3}>
        <Avatar style={{ backgroundColor: '#7cafc2' }}>Beat</Avatar>
      </Badge>
      <Avatar
        size={48}
        style={{ fontSize: 30, backgroundColor: '#e8e8e8', color: '#dc9656' }}
      >
        IT
      </Avatar>
      <Avatar shape="square">It</Avatar>
    </div>
  );
}

export default App

