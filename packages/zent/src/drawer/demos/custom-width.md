---
order: 3
zh-CN:
	title: 不同尺寸抽屉
	drawerTitle: 抽屉标题
	primaryButton: 主要按钮
	secondaryButton: 次要按钮
en-US:
	title: Drawers of different sizes
	drawerTitle: Drawer Title
	primaryButton: Primary Button
	secondaryButton: Secondary Button
---

```js
import { useState } from 'react';
import { Button, Drawer, Input } from 'zent';

function SimpleDrawer() {
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState();
	
	const showDefaultDrawer = () => {
		setSize('default');
		setVisible(true);
	}

	const showSmallDrawer = () => {
		setSize('small');
		setVisible(true);
	}

  return (
    <>
      <Button
        onClick={showDefaultDrawer}
        type="primary"
      >
        Open Default Size（728px）
      </Button>
			<Button
        onClick={showSmallDrawer}
        type="primary"
      >
        Open Small Size（364px）
      </Button>
      <Drawer
        visible={visible}
				size={size}
        onClose={() => setVisible(false)}
				title="{i18n.drawerTitle}"
				footer={
					<div className="zent-drawer-demo__custom-width__drawer-footer">
						<Button type="primary">{i18n.primaryButton}</Button>
						<Button>{i18n.secondaryButton}</Button>
					</div>
				}
      />
    </>
  );
}

ReactDOM.render(<SimpleDrawer />, mountNode);
```

<style>
	.zent-drawer-demo__custom-width__drawer-footer {
		padding-right: 16px;
		text-align: right;
	}
</style>
