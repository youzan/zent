import React from 'react';
import Button from '../src';
import '../assets/index.scss';

const Example = function () {
  return (
    <div>
      <p>将按钮变成链接, 只需要提供 href 属性</p>
      <Button type="primary" href="https://youzan.com">有赞首页</Button>
      <Button type="primary" outline href="https://youzan.com">有赞首页</Button>
      <Button type="danger" href="https://youzan.com">有赞首页</Button>
      <Button type="danger" outline href="https://youzan.com">有赞首页</Button>
      <Button type="success" href="https://youzan.com">有赞首页</Button>
      <Button type="success" outline href="https://youzan.com">有赞首页</Button>
      <Button href="https://youzan.com">有赞首页</Button>

      <hr />

      <p>定义链接打开方式, 只需要提供 target 属性</p>
      <Button type="primary" href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button type="primary" outline href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button type="danger" href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button type="danger" outline href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button type="success" href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button type="success" outline href="https://youzan.com" target="_blank">新窗口打开</Button>
      <Button href="https://youzan.com" target="_blank">新窗口打开</Button>

      <hr />
      <p>disabled 状态下, href与target不会传递到a元素.</p>
      <Button type="primary" disabled href="https://youzan.com" target="_blank">新窗口打开</Button>
    </div>
  );
};

export default Example;
