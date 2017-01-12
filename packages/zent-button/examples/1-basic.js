import React from 'react';
import Button from '../src';
import '../assets/index.scss';

/*
  按钮的一般使用规范及状态
 */

const Example = function () {
  return (

    <div>
      <p>各种一、二、三级按钮的样式</p>
      <Button type="primary">一级按钮</Button>
      <Button type="primary" outline>二级按钮</Button>
      <Button type="danger">一级按钮</Button>
      <Button type="danger" outline>二级按钮</Button>
      <Button type="success">一级按钮</Button>
      <Button type="success" outline>二级按钮</Button>
      <Button>三级按钮</Button>

      <hr />

      <p>各种按钮的 disabled 状态</p>
      <Button type="primary" disabled>一级按钮</Button>
      <Button type="primary" outline disabled>二级按钮</Button>
      <Button type="danger" disabled>一级按钮</Button>
      <Button type="danger" outline disabled>二级按钮</Button>
      <Button type="success" disabled>一级按钮</Button>
      <Button type="success" outline disabled>二级按钮</Button>
      <Button disabled>三级按钮</Button>

      <hr />

      <p>各种按钮的 loading 状态</p>
      <Button type="primary" loading>一级按钮</Button>
      <Button type="primary" outline loading>二级按钮</Button>
      <Button type="danger" loading>一级按钮</Button>
      <Button type="danger" outline loading>二级按钮</Button>
      <Button type="success" loading>一级按钮</Button>
      <Button type="success" outline loading>二级按钮</Button>
      <Button loading>三级按钮</Button>

      <hr />

      <p>无边框按钮，一般在背景色比较深的地方使用</p>

      <div style={{ marginBottom: 20, padding: 10, background: '#FFF5CB' }}>
        <Button type="primary" bordered={false}>一级按钮</Button>
        <Button type="primary" outline bordered={false}>二级按钮</Button>
        <Button type="danger" bordered={false}>一级按钮</Button>
        <Button type="danger" outline bordered={false}>二级按钮</Button>
        <Button type="success" bordered={false}>一级按钮</Button>
        <Button type="success" outline bordered={false}>二级按钮</Button>
        <Button bordered={false}>三级按钮</Button>
      </div>

      <div style={{ marginBottom: 20, padding: 10, background: '#FF4343' }}>
        <Button type="primary" bordered={false}>一级按钮</Button>
        <Button type="primary" outline bordered={false}>二级按钮</Button>
        <Button type="danger" bordered={false}>一级按钮</Button>
        <Button type="danger" outline bordered={false}>二级按钮</Button>
        <Button type="success" bordered={false}>一级按钮</Button>
        <Button type="success" outline bordered={false}>二级按钮</Button>
        <Button bordered={false}>三级按钮</Button>
      </div>
    </div>
  );
};

export default Example;
