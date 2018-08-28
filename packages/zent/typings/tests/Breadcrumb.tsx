import * as React from 'react';
import { Breadcrumb } from '../';

const dataList = [
  { name: '首页', href: '//www.youzan.com' },
  { name: '应用中心', href: '//www.youzan.com' },
  { name: '营销中心' }
];

function App() {
  return (
    <div>
      <Breadcrumb breads={dataList} />
      <Breadcrumb>
        <Breadcrumb.Item name="应用中心" href="//www.youzan.com" className="zent-demo-bread" />
        <Breadcrumb.Item>
          <a href="//www.youzan.com">首页</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>应用中心</span>
        </Breadcrumb.Item>
        <span>营销中心</span>
      </Breadcrumb>
    </div>
  );
}

export default App;
