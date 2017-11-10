---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
  <div>
      <Input
        placeholder="Please input your name"
        defaultValue="auto focus and select"
        autoFocus
        autoSelect />
      <Input type="password" placeholder="Please input your password" />
  </div>
  , mountNode
);
```
