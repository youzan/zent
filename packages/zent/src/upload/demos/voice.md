---
order: 2
zh-CN:
  title: 上传语音
  tip: ""
  buttonText: "上传语音"
  fileName: "文件名称："
  fileSize: "文件大小："
en-US:
  title: Upload Voice
  tip: ""
  buttonText: "Upload Voice"
  fileName: "File Name: "
  fileSize: "File Size: "
---

```jsx
import { Upload } from 'zent';

class Simple extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          voiceList: []
      };
    }

    renderTrigger() {
      return <span></span>;
    }

    fetchNetworkImage(data) {
      return new Promise(resolve => {
        this.setState({
          voiceList: [data]
        });
        resolve(data);
      });
    }

    updateLocalImage(data) {
        return new Promise(resolve => {
          this.setState({
            voiceList: data
          });
          resolve(data);
        })
    }

    render() {
      return (
        <div>
          {this.state.voiceList.map((item, index) => (
            <div key={index} style={{ fontSize: 12, lineHeight: 1.5, marginTop: 10 }}>
              <p>{i18n.fileName}{item.file.name}</p>
              <p>{i18n.fileSize}{(item.file.size / 1024).toFixed(1)} KB</p>
            </div>
          ))}
          <Upload
            maxSize={8 * 1000 * 1000}
            triggerInline
            tips="{i18n.tip}"
            type="voice"
            accept="audio/mp3, audio/mpeg"
            maxAmount={1}
            onFetch={this.fetchNetworkImage.bind(this)}
            onUpload={this.updateLocalImage.bind(this)}
            triggerClassName=""
            trigger={() => <a href="javascript:;">{i18n.buttonText}</a>}
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
