---
order: 5
zh-CN:
	title: 可拖拽排序
	tips: 单个文件不超过 10M
en-US:
	title: Sortable
	tips: Single file no more than 10M
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
				className="zent-upload-demo-pic"
				maxSize={10 * 1024 * 1024}
				tips="{i18n.tips}"
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
				sortable
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
