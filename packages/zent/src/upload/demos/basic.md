---
order: 1
zh-CN:
  title: 基础用法
  tip: "建议尺寸：640 x 640 像素"
en-US:
  title: Basics
  tip: "Recommended image size: 640px x 640px"
---

```jsx
import { Upload } from 'zent';

const categoryList = [
	{ id: 205772, name: 'test1' },
	{ id: 205773, name: 'test2' },
	{ id: 205774, name: 'test3' }
];

class Simple extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          imageList: []
      };
    }

    renderTrigger() {
      return <span></span>;
    }

    fetchNetworkImage(data) {
      return new Promise(resolve => {
        this.setState({
          imageList: [{
            file: null,
            src: data
          }]
        });
        resolve(data);
      });
    }

    updateLocalImage(data) {
        return new Promise(resolve => {
          this.setState({
            imageList: data
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
            <img className='zent-upload-demo-pic' width="80" height="80" key={index} src={item.src} style={{marginRight: '10px'}} />
          ))}
					<Upload
						className='zent-upload-demo-pic'
						maxSize={1 * 1024 * 1024}
						maxAmount={2}
            triggerInline
						tips="{i18n.tip}"
						categoryList={categoryList}
            onFetch={this.fetchNetworkImage.bind(this)}
            onUpload={this.updateLocalImage.bind(this)}
            errorMessages={{
              overMaxSize: (data) => `Over size: ${data.maxSize}`, // function
              overMaxAmount: 'So many', // string
              wrongMimeType: false || null || '' || (() => false) // show nothing
            }}
          />
        </div>
      );
    }
}

ReactDOM.render(
  <Simple />
  , mountNode
);
```
<style>
	/* 上传图片组件垂直居中对齐(避免计算行高) */
	.zent-upload-demo-pic {
		vertical-align: middle;
	}
</style>
