---
order: 3
zh-CN:
	title: 小尺寸的卡片
	cardTitle: 卡片标题
	cardContent: 内容内容内容内容内容内容内容
en-US:
	title: Small size cards
	cardTitle: Card Title
	cardContent: Content Content Content Content Content Content 
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
			rightExtra={<Button size="small">编辑</Button>}
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
					<Button size="small">编辑</Button>
					<Button size="small">会员价</Button>
					<Button size="small"><Icon type="more" /></Button>
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
</style>


