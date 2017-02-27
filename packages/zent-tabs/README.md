# zent-tabs

tabs组件

## 使用场景或者特殊 API 设计讲解

## API

### Tabs接收参数
| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| className | 自定义额外类名 | string | '' | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | null | 否 |
| type | tabs组件类型 | oneOf(['normal', 'card', 'slider']) | normal | ['card', 'slider'] | 否 |
| activeId | 激活的tab-id | string | null | null | 是 |
| size | tabs的尺寸类型 | oneOf(['huge', 'normal']) | normal | huge | 否 |
| align | tabs的布局类型 | oneOf(['left', 'right', 'center']) | left | right, center | 否 |
| onTabChange | 选中的tab改变时 | func: id => void | null | null | 否 |
| onTabDel | 关闭tab时 | func: id => void | null | null | 否 |
| onTabAdd | 点击增加tab时 | func: void => void | null | null | 否 |
| candel | 是否可删除 | bool | false | true | 否 |
| canadd | 是否可增加tab | bool | false | true | 否 |


### TabPanel参数介绍
| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|--------|
| tab | 该TabPanel所对应的tab标签的名字 | any | null | null | 是 |
| id | 该TabPanel的id | string | null | null | 是 |

## 例子

```javascript
import Tabs from 'zent-tabs';
const { TabPanel } = Tabs;
<Tabs
  align='left'
  size='normal'
  type='normal'
  candel=false
  canadd=true
  activeId='2'
>
  <TabPanel id='2' tab='选项一'>content</TabPanel>
  <TabPanel id='3' tab='选项二'>content</TabPanel>
</Tabs>

```

## 如何安装

```bash
npm install zent-tabs --save
```

### 使用webpack打包的项目：

```js
import Tabs from 'zent-tabs';
```

### 使用requirejs打包的项目：
```js
var ZentTabs = require('zent-tabs/dist/main');
```
