---
order: 5
zh-CN:
	title: 受控的电梯
	DirectoryOne: 页面目录一
	DirectoryTwo: 页面目录二
	DirectoryThree: 页面目录三
	DirectoryFour: 页面目录四
en-US:
	title: Controlled
	DirectoryOne: Page Directory One
	DirectoryTwo: Page Directory Two
	DirectoryThree: Page Directory Three
	DirectoryFour: Page Directory Four
---

```js
import { Elevator, LayoutRow, LayoutCol, Button } from 'zent';
import { useRef, useState } from 'react';

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
	const [activeLink, setActiveLink] = useState('{i18n.DirectoryOne}');

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
				activeLink={activeLink}
				onChange={(link, pre) => setActiveLink(link)}
				targetOffset={40}
			>
				{LINKS.map(link => (
					<Button onClick={() => setActiveLink(link.link)}>{link.title}</Button>
				))}
				<LayoutRow>
					<LayoutCol span={14}>
						<div>{renderBlock()}</div>
					</LayoutCol>
					<LayoutCol span={8} offset={14}>
						<Elevator.Links offsetTop={24} offsetBottom={24} links={LINKS} />
					</LayoutCol>
				</LayoutRow>
			</Elevator>
		</div>
	);
};

ReactDOM.render(<Demo />, mountNode);
```

<style>
	.zent-demo-elevator-basic {
		background: #f7f7f7;
		padding: 24px;
		height: 200px;
		overflow-y: auto;
	}

	.zent-demo-elevator-basic__block__content {
		height: 180px;
	}
</style>
