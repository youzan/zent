---
order: 3
zh-CN:
	title: 设置锚点滚动偏移量
	DirectoryOne: 页面目录一
	DirectoryTwo: 页面目录二
	DirectoryThree: 页面目录三
	DirectoryFour: 页面目录四
en-US:
	title: Sets the anchor point roll offset
	DirectoryOne: Page Directory One
	DirectoryTwo: Page Directory Two
	DirectoryThree: Page Directory Three
	DirectoryFour: Page Directory Four
---

```js
import { Elevator, LayoutRow, LayoutCol } from 'zent';
import { useRef, useState, useEffect } from 'react';

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
	const [targetOffset, setTargetOffset] = useState(undefined);

	useEffect(() => {
		if (ref.current) {
			const offset = ref.current.getBoundingClientRect().height / 2;
			setTargetOffset(offset);
		}
	}, [ref]);

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
			<Elevator
				getContainer={() => ref.current}
				targetOffset={targetOffset}
				defaultActiveLink="{i18n.DirectoryOne}"
			>
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
