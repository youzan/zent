---
order: 7
zh-CN:
	title: 自定义父节点CSS selector
	name: 自定义父节点

en-US:
	title: Custom notify parent container css selector
	name: custom notify content container

---

```jsx
import { Notify, Button } from 'zent';

function customContent() {
	Notify.success('{i18n.name}', '', () => {}, '#custom-container');
}

const relativeStyle = {
	position: 'relative'
}

ReactDOM.render(
  <div>
    <Button onClick={customContent}>{i18n.name}</Button>
    <div id="custom-container" style={relativeStyle}></div>
  </div>
	, mountNode
);

```
