## previewImage 图片预览

这是一个图片预览组件。

### 使用指南

-  用于缩略图放大预览显示
-  支持图片上一张、下一张、翻转功能

### 代码演示

:::demo 基础用法
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
			index: imgArr.indexOf(e.target.src)
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
:::

## API

| 参数            | 说明               | 类型             | 默认值      | 备选值     |
|------          |------              |------            |--------    |--------   |
| images         | 待预览图片url       | array            |         |              |
| index          | 显示第几张，从0开始  | number           | 0       |              |
| showRotateBtn  | 是否显示翻转按钮     | bool             | true     |  true,false |
| className      | 可选，自定义类名     | string           | `''`     |         |
| prefix         | 可选，自定义前缀     | string           | `'zent'` |         |

