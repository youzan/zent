---
order: 2
zh-CN:
  title: 受控模式
en-US:
  title: Controlled Mode
---

```jsx
import { Upload, Notify } from 'zent';

class Simple extends React.Component {
	state = {
		fileList: [],
	};

	onUploadChange = files => {
		this.setState({
			fileList: files,
		});
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
					const success = Math.random() > 0.5;
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
		if (type === 'overMaxAmount') {
			Notify.error(`最多可上传 ${data.maxAmount} 个文件`);
		} else if (type === 'overMaxSize') {
			Notify.error(`文件大小不能超过 ${data.formattedMaxSize}`);
		}
	};

	render() {
		const { fileList } = this.state;
		return (
			<Upload
				multiple
				fileList={fileList}
				className="zent-upload-demo-pic"
				maxSize={2 * 1024 * 1024}
				maxAmount={3}
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
