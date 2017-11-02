---
order: 3
zh-CN:
	title: "设置距离底部值: `offsetBottom`"
	index: 首页
	affix: 固钉
en-US:
	title: Using offsetBottom to set offset from viewport bottom
	index: Index
	affix: Affix
---


```jsx
import { Affix, Alert } from 'zent';

ReactDOM.render(
  <div className="demo-bottom">
      <Affix offsetBottom={60}>
        <Alert type="warning"><p>设置距离底部值</p></Alert>
      </Affix>
    </div>
  , mountNode
);
```
