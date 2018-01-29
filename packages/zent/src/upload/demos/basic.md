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
          resolve(data);
        })
    }

    render() {
      return (
        <div>
          {this.state.imageList.map((item, index) => (
            <img width="80" height="80" key={index} src={item.src} style={{marginRight: '10px'}} />
          ))}
          <Upload
						maxSize={1 * 1024 * 1024}
						maxAmount={10}
            triggerInline
						tips="{i18n.tip}"
						categoryList={categoryList}
            onFetch={this.fetchNetworkImage.bind(this)}
            onUpload={this.updateLocalImage.bind(this)}
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
