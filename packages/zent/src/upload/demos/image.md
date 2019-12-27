---
order: 6
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
						// 可以在上传成功时替换图片 src 地址
						Math.random() > 0.3
							? resolve()
							: resolve(
									'https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png'
							  );
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
			Notify.error(`最多可上传 ${data.maxAmount} 张图片`);
		} else if (type === 'overMaxSize') {
			Notify.error(`图片大小不能超过 ${data.formattedMaxSize}`);
		}
	};

	render() {
		return (
			<ImageUpload
				className="zent-image-upload-demo"
				maxSize={5 * 1024 * 1024}
				maxAmount={9}
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
