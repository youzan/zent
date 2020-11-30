---
order: 7
zh-CN:
  title: 手动上传
	tips: '建议尺寸 640*640，最多 9 张，单张图片不超过 5M'
	start: 开始上传
en-US:
  title: Manual Upload
	tips: 'Recommended image size 640*640, up to 9, single file no more than 5M'
  start: Start Upload
---

```jsx
import { ImageUpload, Button, Notify } from 'zent';

// ImageUpload 和 Upload 上都有 FILE_UPLOAD_STATUS 这个静态属性
const FILE_UPLOAD_STATUS = ImageUpload.FILE_UPLOAD_STATUS;

class Simple extends React.Component {
	state = {
		fileList: [],
	};

	onUploadChange = (files, detail) => {
		this.setState({
			fileList: files,
		});

		if (detail && detail.type === 'retry') {
			this.uploadItem(detail.item._id);
		}
	};

	uploadItem = id => {
		const update = () => {
			const item = this.state.fileList.find(o => o._id === id);
			let percent = item.percent;
			let status = item.status;
			if (percent < 100) {
				status = FILE_UPLOAD_STATUS.uploading;
				percent += 10;
			} else if (status === FILE_UPLOAD_STATUS.uploading) {
				// 随机成功或失败
				status =
					Math.random() > 0.5
						? FILE_UPLOAD_STATUS.success
						: FILE_UPLOAD_STATUS.failed;
			} else if (status === FILE_UPLOAD_STATUS.failed) {
				// 失败重传
				status = FILE_UPLOAD_STATUS.uploading;
				percent = 0;
			}

			const newItem = {
				...item,
				percent,
				status,
			};

			this.setState(
				() => {
					const newList = this.state.fileList.map(itemInner =>
						itemInner._id === item._id ? newItem : itemInner
					);
					return {
						fileList: newList,
					};
				},
				() => {
					if (
						[FILE_UPLOAD_STATUS.success, FILE_UPLOAD_STATUS.failed].indexOf(
							status
						) === -1
					) {
						setTimeout(update, 500);
					}
				}
			);
		};

		update();
	};

	startUpload = () => {
		this.state.fileList.forEach(item => {
			if (item.status === FILE_UPLOAD_STATUS.beforeUpload) {
				this.uploadItem(item._id);
			}
		});
	};

	onUploadError = (type, data) => {
		if (type === 'overMaxAmount') {
			Notify.error(`最多可上传 ${data.maxAmount} 张图片`);
		} else if (type === 'overMaxSize') {
			Notify.error(`图片大小不能超过 ${data.formattedMaxSize}`);
		}
	};

	render() {
		const { fileList } = this.state;
		return (
			<>
				<ImageUpload
					className="zent-image-upload-demo"
					maxSize={5 * 1024 * 1024}
					fileList={fileList}
					maxAmount={9}
					multiple
					sortable
					manualUpload
					tips="{i18n.tips}"
					onChange={this.onUploadChange}
					onError={this.onUploadError}
				/>
				<Button
					className="zent-image-upload-skip-demo-btn"
					onClick={this.startUpload}
				>
					{i18n.start}
				</Button>
			</>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
	.zent-image-upload-skip-demo-btn {
		margin-top: 16px;
	}
</style>
