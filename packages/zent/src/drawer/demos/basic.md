---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```js
import { useState } from 'react';
import { Button, Drawer } from 'zent';

function SimpleDrawer() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} type="primary">
        Open
      </Button>
      <Drawer
        title="Drawer Title"
        footer={
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => setVisible(false)}>close</Button>
          </div>
        }
        visible={visible}
        onClose={() => setVisible(false)}
        maskClosable
      >
        <Button
          style={{ margin: '10px 20px' }}
          onClick={() => setVisible(false)}
        >
          close
        </Button>
        {new Array(30).fill().map((_, index) => (
          <div style={{ padding: '10px' }} key={index}>
            drawer content{index}
          </div>
        ))}
      </Drawer>
    </>
  );
}

ReactDOM.render(<SimpleDrawer />, mountNode);
```
