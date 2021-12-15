---
order: 4
zh-CN:
	title: 不指定 container，默认 container 为 window
	DirectoryOne: 页面目录一
	DirectoryTwo: 页面目录二
	DirectoryThree: 页面目录三
	DirectoryFour: 页面目录四
en-US:
	title: No container is specified. The default container is Window
	DirectoryOne: Page Directory One
	DirectoryTwo: Page Directory Two
	DirectoryThree: Page Directory Three
	DirectoryFour: Page Directory Four
---

```js
import { Elevator, WindowScrollHandler } from 'zent';
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
	const renderBlock = () => (
		<div>
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
		<div className="zent-demo-elevator-container-window">
			<Elevator offsetTop={0} defaultActiveLink="{i18n.DirectoryOne}">
				<Elevator.Links
					offsetTop={24}
					offsetBottom={24}
					links={LINKS}
					style={{ float: 'right' }}
				/>
				{renderBlock()}
			</Elevator>
		</div>
	);
};

ReactDOM.render(<Demo />, mountNode);
```

<style>
	.zent-demo-elevator-container-window {
		background: #f7f7f7;
		padding: 24px;
		height: auto;
		overflow-y: auto;
	}
	.zent-demo-elevator-container-window__block__content {
		height: 350px;
	}
</style>
