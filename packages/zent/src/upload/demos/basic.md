---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basics
---

```jsx
import { Upload } from 'zent';

class Simple extends React.Component {
	onUploadChange = (files) => {
		console.log(files);
	}

	updateLocalImage = (file, report) => {
		return new Promise((resolve, reject) => {
			let count = 0;
			const update = () => {
				if (count < 100) {
					count += 1;
					report(count);
					requestAnimationFrame(update);
				} else {
					resolve();
				}
			}
			requestAnimationFrame(update);
		})
	}

	render() {
		return (
			<Upload
				accept="image/*"
				className="zent-upload-demo-pic"
				maxSize={1 * 1024 * 1024}
				maxAmount={2}
				onChange={this.onUploadChange}
				onUpload={this.updateLocalImage}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
