---
order: 9
zh-CN:
	title: 单文件上传
  tips: 单个文件不超过 2M

en-US:
  title: Single
  tips: Single file no more than 2M
---

```jsx
import { SingleUpload, Notify } from 'zent';

class Simple extends React.Component {
	state = {
		value: null,
	}

	onUploadChange = item => {
		console.log(item);
		this.setState(() => ({
			value: item,
		}))
	};

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
					const success = Math.random() > 0.3;
					if (success) {
						resolve();
					} else {
						reject();
					}
				}
			};
			setTimeout(update, 500);
		});
	};

	onUploadError = (type, data) => {
		if (type === 'overMaxSize') {
			Notify.error(`文件大小不能超过 ${data.formattedMaxSize}`);
		}
	};

	render() {
		const { value } = this.state;
		return (
			<SingleUpload
				className="zent-upload-demo-pic"
				maxSize={2 * 1024 * 1024}
				tips="{i18n.tips}"
				value={value}
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
