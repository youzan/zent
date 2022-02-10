---
order: 1
zh-CN:
	title: 基础用法
	open: 开启
	ok: 确定
	close: 关闭
	drawerTitle: 抽屉名称 
	content: 抽屉内容
en-US:
	title: Basic usage
	open: Open
	ok: Ok
	close: Close
	drawerTitle: drawer title 
	content: drawer content
---

```js
import { useState } from 'react';
import { Button, Drawer } from 'zent';

function SimpleDrawer() {
	const [visible, setVisible] = useState(false);

	const close = () => {
		setVisible(false);
	};

	return (
		<>
			<Button onClick={() => setVisible(true)} type="primary">
				{i18n.open}
			</Button>
			<Drawer
				title="{i18n.drawerTitle}"
				visible={visible}
				onClose={() => setVisible(false)}
				maskClosable
				footer={
					<div className="zent-drawer-demo-drawer-footer">
						<Button onClick={close}>{i18n.close}</Button>
						<Button type="primary" onClick={close}>
							{i18n.ok}
						</Button>
					</div>
				}
			>
				<Button
					style={{ margin: '10px 20px' }}
					onClick={() => setVisible(false)}
				>
					{i18n.close}
				</Button>
				{new Array(30).fill().map((_, index) => (
					<div style={{ padding: '10px' }} key={index}>
						{i18n.content}
						{index}
					</div>
				))}
			</Drawer>
		</>
	);
}

ReactDOM.render(<SimpleDrawer />, mountNode);
```

<style>
	.zent-drawer-demo-drawer-footer {
		text-align: right;
    padding-right: 16px;
	}
</style>
