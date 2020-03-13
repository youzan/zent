---
order: 8
zh-CN:
  title: 自定义展示项
en-US:
  title: Custom Item
---

```jsx
import { Upload, Notify, Button } from 'zent';

const FILE_UPLOAD_STATUS = Upload.FILE_UPLOAD_STATUS;

const CustomItem = props => {
	const { item, i18n, onRetry, onDelete } = props;
	return (
		<div>
			<p>{item.name}</p>
			<p>进度：{item.percent}%</p>
			<div>
				{item.status === FILE_UPLOAD_STATUS.failed && <Button onClick={() => onRetry(item)}>重试</Button>}
				<Button type="danger" onClick={() => onDelete(item)}>删除</Button>
			</div>
		</div>
	)
};

class Simple extends React.Component {
	onUploadChange = files => {
		console.log(files);
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
		return (
			<Upload
				multiple
				className="zent-upload-demo-pic"
				maxSize={2 * 1024 * 1024}
				maxAmount={3}
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
				customUploadItem={CustomItem}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
