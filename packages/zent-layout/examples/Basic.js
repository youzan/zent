import React from 'react';
import Layout from '../src';
const { Row, Col } = Layout;
import '../assets/index.scss';
import '../assets/demo.scss';
/*
## 基本使用

24栅格布局系统
*/
const simple = function () {
  return (
    <div className="layout-demo-basic">

      <Row>
        <Col span={24}>Col 24</Col>
      </Row>

      <Row>
        <Col span={8}>Col 8</Col>
        <Col span={8}>Col 8</Col>
        <Col span={8}>Col 8</Col>
      </Row>

      <Row>
        <Col span={8}>Col 8</Col>
        <Col span={8} offset={8}>Col 8, Offset 8</Col>
      </Row>

      <Row>
        <Col span={4}>Col 4</Col>
        <Col span={4} offset={4}>Col 4, Offset 4</Col>
        <Col span={4} offset={4}>Col 4, Offset 4</Col>
      </Row>

    </div>
  );
};

export default simple;
