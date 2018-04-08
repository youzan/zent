---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { previewImage } from 'zent';

const imgArr = [
	'http://img.yzcdn.cn/public_files/2017/6/30/b0717bad7ad3ebd025e175d624ade39f.png',
	'http://img.yzcdn.cn/public_files/2017/6/30/8a0536db89fafaa1269afeaa807a579b.png',
	'http://img.yzcdn.cn/public_files/2017/6/30/7fe46674b697a514d9b6e2e155e88f1c.png',
	'http://img.yzcdn.cn/public_files/2017/6/30/b7a98d721698fe8dc93689683706db45.png'
];

class Simple extends React.Component {
	handlePreview = (e) => {
		previewImage({
			images: imgArr,
			index: imgArr.indexOf(e.target.src),
			parentComponent: this,
			scaleRatio: 3
		});
	}

	render() {
		return (
			<div className="image-preview-demo">
				{
					imgArr.map((image, index) => {
						return (<img src={image} key={index} onClick={this.handlePreview} alt="" width="160" />);
					})
				}
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
