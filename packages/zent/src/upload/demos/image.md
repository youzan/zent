---
order: 1
zh-CN:
  title: 图片上传
  tips: '建议尺寸：640 x 640 像素'
en-US:
  title: Image Upload
  tips: 'Recommended image size: 640px x 640px'
---

```jsx
import { ImageUpload } from 'zent';

class Simple extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageList: [],
		};
	}

	updateLocalImage(data) {
		return new Promise(resolve => {
			this.setState({
				imageList: data,
			});
			setTimeout(() => {
				resolve(data);
			}, 1000);
		});
	}

	render() {
		return (
			<div>
				{this.state.imageList.map((item, index) => (
					<img
						className="zent-upload-demo-pic"
						width="80"
						height="80"
						key={index}
						src={item.src}
						style={{ marginRight: '10px' }}
					/>
				))}
				<ImageUpload
					className="zent-upload-demo-pic"
					maxSize={1 * 1024 * 1024}
					maxAmount={2}
					tips="{i18n.tips}"
					onUpload={this.updateLocalImage.bind(this)}
					errorMessages={{
						overMaxSize: data => `Over size: ${data.maxSize}`, // function
						overMaxAmount: 'So many', // string
					}}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
