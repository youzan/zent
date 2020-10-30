---
order: 3
zh-CN:
	title: 无遮罩
en-US:
	title: No mask usage
---

```js
import { useState } from 'react';
import { Button, Drawer } from 'zent';

function SimpleDrawer() {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(false);
  return (
    <>
      <Button
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation(); // 阻止原生click事件冒泡，让drawer不关闭的同时修改children
          setVisible(true);
          setContent(!content);
        }}
        type="primary"
      >
        Toggle Content
      </Button>
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        mask={false}
      >
        <Button style={{ margin: '20px' }} onClick={() => setVisible(false)}>
          close
        </Button>
        <div style={{ fontSize: '50px', paddingLeft: '20px' }}>
          {content ? '111' : '222'}
        </div>
      </Drawer>
    </>
  );
}

ReactDOM.render(<SimpleDrawer />, mountNode);
```
