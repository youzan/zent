---
order: 4
zh-CN:
	title: 小尺寸的卡片
	cardTitle: 卡片标题
	cardContent: 内容内容内容内容内容内容内容
	button: 按钮
en-US:
	title: Small size cards
	cardTitle: Card Title
	cardContent: Content Content Content Content Content Content 
	button: button
---

```js
import { Card, Button, Icon } from 'zent';

const PLACEHOLDER_IMG = 'https://img01.yzcdn.cn/upload_files/2021/11/25/FnBovVAfgTaDHBmBQh23PpMwwjkY.jpg';

ReactDOM.render(
	<div className="zent-card-example">
		<Card 
			className="zent-card-example__card" 
			style={{ width: 242 }} 
			title="{i18n.cardTitle}"
			bordered={false}
			size='small'
		>
			{i18n.cardContent}
		</Card>
		<Card 
			className="zent-card-example__card" 
			style={{ width: 290 }} 
			title="{i18n.cardTitle}"
			bordered={false}
			size='small'
			leftExtra={<img src={PLACEHOLDER_IMG} className="zent-card-example-size__img" />}
		>
			{i18n.cardContent}
		</Card>
		<Card 
			className="zent-card-example__card" 
			style={{ width: 290 }} 
			title="{i18n.cardTitle}"
			bordered={false}
			size='small'
			leftExtra={<img src={PLACEHOLDER_IMG} className="zent-card-example-size__img" />}
			rightExtra={<Button type="text" size="small">{i18n.button}</Button>}
		>
			{i18n.cardContent}
		</Card>
		<Card 
			className="zent-card-example__card" 
			style={{ width: 290 }} 
			title="{i18n.cardTitle}"
			bordered={false}
			size='small'
			leftExtra={<img src={PLACEHOLDER_IMG} className="zent-card-example-size__img" />}
			bottomExtra={
				<div className="zent-card-example-size__bottom-extra">
					<Button type="text" size="small">{i18n.button} 1</Button>
					<Button type="text" size="small">{i18n.button} 2</Button>
					<Button type="text" size="small">{i18n.button} 3</Button>
				</div>
			}
		>
			{i18n.cardContent}
		</Card>
	</div>
  , mountNode
);
```

<style>
	.zent-card-example-size__img {
		width: 40px;
		border-radius: 2px;
	}
	.zent-card-example-size__bottom-extra {
		margin-top: 16px;
	}
	.zent-card-example-size__bottom-extra > button.zent-btn {
		margin-left: 0 !important;
		margin-right: 8px;
	}
	.zent-card-example-size__bottom-extra .zent-card-example-size__more-btn {
		margin: 0 !important;
		font-size: 16px;
	}
</style>


