import * as React from 'react';
import { Button, Icon } from '../';


function App() {
  return (
    <div>
      <Button type="primary">一级按钮</Button>
      <Button type="primary" outline>二级按钮</Button>
      <Button type="danger">一级按钮</Button>
      <Button type="danger" outline>二级按钮</Button>
      <Button type="success">一级按钮</Button>
      <Button type="success" outline>二级按钮</Button>
      <Button>三级按钮</Button>
      <Button loading>Loading</Button>
      <Button disabled>不可用的按钮</Button>
      <Button size="large">大号按钮</Button>
      <Button>正常按钮</Button>
      <Button size="small">小号按钮</Button>
      <Button bordered={false} type="primary">无边框</Button>
      <Button href="https://youzan.com">有赞首页</Button>
      <Button href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button icon="search">搜索</Button>
      <Button><Icon type="check" />保存</Button>
      <Button>下一步<Icon type="right" /></Button>
      <Button.Group>
        <Button>加粗</Button>
        <Button>斜体</Button>
        <Button>下划线</Button>
      </Button.Group>
    </div>
  );
}

export default App;
