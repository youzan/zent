---
order: 2
zh-CN:
	title: 自定义位置
en-US:
	title: Placement usage
---

```js
import { useState } from 'react';
import { Button, Drawer, Radio } from 'zent';

const RadioGroup = Radio.Group;

function SimpleDrawer() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('top');

  return (
    <>
      <RadioGroup
        onChange={e => setPlacement(e.target.value)}
        value={placement}
      >
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </RadioGroup>
      <Button
        onClick={() => setVisible(true)}
        type="primary"
        style={{ marginLeft: '20px' }}
      >
        Open
      </Button>
      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        placement={placement}
        maskClosable
      >
        <div>Drawer Content ...</div>
        <div>Drawer Content ...</div>
        <div>Drawer Content ...</div>
      </Drawer>
    </>
  );
}

ReactDOM.render(<SimpleDrawer />, mountNode);
```
