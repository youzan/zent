---
order: 4
zh-CN:
  title: 图片上传
  tips: '建议尺寸 640*640'
en-US:
  title: Image Upload
  tips: 'Recommended image size 640*640'
---

```jsx
import { ImageUpload, Notify } from 'zent';

class Simple extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageList: [],
		};
	}

	onUploadChange = (files) => {
		console.log(files);
	}

	onUpload = (file, report) => {
		return new Promise((resolve, reject) => {
			let count = 0;
			const update = () => {
				if (count < 100) {
					count += 10;
					report(count);
					setTimeout(update, 500);
				} else {
					// 随机成功或失败
					const success = Math.random() > 0.5;
					if (success) {
						resolve();
					} else {
						reject();
					}
				}
			}
			setTimeout(update, 500);
		})
	}
	onUploadError = (type, data) => {
		Notify.error(`错误类型: ${type}, 错误参数: ${JSON.stringify(data)}`)
	}

	render() {
		return (
			<ImageUpload
				className="zent-image-upload-demo"
				maxSize={5 * 1024 * 1024}
				maxAmount={5}
				multiple
				sortable
				tips="{i18n.tips}"
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
