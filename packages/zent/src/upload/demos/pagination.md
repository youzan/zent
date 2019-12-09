---
order: 3
zh-CN:
  title: 文件列表分页
en-US:
  title: Filelist pagination
---

```jsx
import { Upload, Notify } from 'zent';

class Simple extends React.Component {
	state = {
		fileList: [],
	}

	onUploadChange = (files) => {
		console.log(files);
		this.setState({
			fileList: files,
		})
	}

	onUpload = (file, report) => {
		return new Promise((resolve, reject) => {
			let count = 0;
			const update = () => {
				if (count < 100) {
					count += 5;
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
		const { fileList } = this.state;
		return (
			<Upload
				multiple
				className="zent-upload-demo-pic"
				maxSize={10 * 1024 * 1024}
				onChange={this.onUploadChange}
				onUpload={this.onUpload}
				onError={this.onUploadError}
				sortable
				pagination={{
					type: 'mini',
					props: {
						current: 1,
						pageSize: 5,
						total: fileList.length
					}
				}}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
