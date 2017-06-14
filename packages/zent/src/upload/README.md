# Upload 图片上传

图片上传

### 代码演示

:::demo 基础用法
```js
import { Upload } from 'zent';

class Simple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageList: []
        };
        this.updateLocalImage = this.updateLocalImage.bind(this);
    }

    renderTrigger() {
        return <span></span>;
    }

    fetchNetworkImage(data) {
        return new Promise(resolve => {
            console.log(data);
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
                <Upload
                    maxSize={8 * 1000 * 1000}
                    triggerInline
                    tips="建议尺寸：640 x 640 像素；您可以拖拽图片调整图片顺序。"
                    onFetch={this.fetchNetworkImage}
                    onUpload={this.updateLocalImage}
                />
                {
                    this.state.imageList.map((item, index) => {
                        return <img width="80" height="80" key={index} src={item.src} style={{marginLeft: '10px'}} />
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Simple />
    , mountNode
);

```
:::

### API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| localOnly | 是否只支持本地图片 | boolean | `false` | 否 |
| tips | 提示文案 | string | `''` | 否 |
| maxSize | 图片大小限制，单位为b | number | `1024 * 1024` | 否 |
| maxAmount | 图片数量限制，0为不限制，1为只支持单文件 | number | `0` | 否 |
| accept | 支持文件类型 | string | `'image/gif, image/jpeg, image/png'` | 否 |
| silent | 是否开启静默模式，不会提示成功/失败 | boolean | `false` | 否 |
| triggerInline | 是否行内属性 | boolean | `false` | 否 |
| onFetch | 提取网络图片 | function | `noop` | 否 |
| onUpload | 上传本地图片 | function | `noop` | 否 |
| onProgress | 上传进度 | function | `noop` | 否 |
| onGetToken | 自定义获取token回调，需要返回一个promise，如 resolve(token) | function | `内置getToken` | 否 |
| filterFiles | 过滤文件，支持同步和promise的方式 | function | `noop` | 否 |
| auto | 是否自动弹出 | boolean | `false` | 否 |
| triggerClassName | 重写trigger样式 | string | `'zent-upload-trigger'` | 否 |
| prefix | 前缀命名空间 | string | `'zent'` | 否 |
| withoutPopup | 是否不渲染在弹层上 | boolean | `false` | 否 |
