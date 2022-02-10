---
order: 2
zh-CN:
	title: 设置偏移量，锚点距离窗口顶部达到指定偏移量后触发切换，默认值为容器高度的一半
	DirectoryOne: 页面目录一
	DirectoryTwo: 页面目录二
	DirectoryThree: 页面目录三
	DirectoryFour: 页面目录四
en-US:
	title: Sets the offset to trigger a switch when the anchor point reaches the specified offset from the top of the window. The default is half the height of the container
	DirectoryOne: Page Directory One
	DirectoryTwo: Page Directory Two
	DirectoryThree: Page Directory Three
	DirectoryFour: Page Directory Four
---

```js
import { Elevator, LayoutRow, LayoutCol } from 'zent';
import { useRef } from 'react';

const LINKS = [
	{
		link: '{i18n.DirectoryOne}',
		title: '{i18n.DirectoryOne}',
	},
	{
		link: '{i18n.DirectoryTwo}',
		title: '{i18n.DirectoryTwo}',
	},
	{
		link: '{i18n.DirectoryThree}',
		title: '{i18n.DirectoryThree}',
	},
	{
		link: '{i18n.DirectoryFour}',
		title: '{i18n.DirectoryFour}',
	},
];

const Demo = () => {
	const ref = useRef(null);

	const renderBlock = () => (
		<div className="zent-demo-elevator-basic__block">
			{LINKS.map(link => (
				<div key={link.link}>
					<Elevator.Anchor link={link.link}>
						<h3>{link.title}</h3>
					</Elevator.Anchor>
					<div className="zent-demo-elevator-basic__block__content" />
				</div>
			))}
		</div>
	);

	return (
		<div className="zent-demo-elevator-basic" ref={ref}>
			<Elevator getContainer={() => ref.current} offsetTop={50}>
				<LayoutRow>
					<LayoutCol span={14}>{renderBlock()}</LayoutCol>
					<LayoutCol span={8} offset={14}>
						<Elevator.Links
							offsetTop={24}
							links={LINKS}
							style={{ float: 'right' }}
						/>
					</LayoutCol>
				</LayoutRow>
			</Elevator>
		</div>
	);
};

ReactDOM.render(<Demo />, mountNode);
```
