## Tabs 选项卡组件

选项卡组件

### 代码演示

:::demo 基础用法
```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;

class Simple extends React.Component {
  state = {
    activeId: '2'
  }

  onTabChange = (id) => {
    this.setState({
      activeId: id
    });
  }

  render() {
    return (
      <Tabs
        activeId={this.state.activeId}
        onTabChange={this.onTabChange}
      >
        <TabPanel
          tab={<span>选项一</span>}
          id="1"
          disabled
        >
          <div>选项一的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项二"
          id="2"
        >
          <div>选项二的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项三"
          id="3"
        >
          <div>选项三的内容</div>
        </TabPanel>
      </Tabs>
    );
  }
};

ReactDOM.render(<Simple />, mountNode);
```
:::

:::demo 基础用法 slider
```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;

class Simple extends React.Component {
  state = {
    activeId: '2'
  }

  onTabChange = (id) => {
    this.setState({
      activeId: id
    });
  }

  render() {
    return (
      <Tabs
        type="slider"
        activeId={this.state.activeId}
        onTabChange={this.onTabChange}
      >
        <TabPanel
          tab={<span>选项一</span>}
          id="1"
          disabled
        >
          <div>选项一的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项二"
          id="2"
        >
          <div>选项二的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项三"
          id="3"
        >
          <div>选项三的内容</div>
        </TabPanel>
      </Tabs>
    );
  }
};

ReactDOM.render(<Simple />, mountNode);
```
:::

:::demo 基础用法 card
```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;

class Simple extends React.Component {
  state = {
    activeId: '2'
  }

  onTabChange = (id) => {
    this.setState({
      activeId: id
    });
  }

  render() {
    return (
      <Tabs
        activeId={this.state.activeId}
        onTabChange={this.onTabChange}
        type="card"
      >
        <TabPanel
          tab={<span>选项一</span>}
          id="1"
          disabled
        >
          <div>选项一的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项二"
          id="2"
        >
          <div>选项二的内容</div>
        </TabPanel>
        <TabPanel
          tab="选项三"
          id="3"
        >
          <div>选项三的内容</div>
        </TabPanel>
      </Tabs>
    );
  }
};

ReactDOM.render(<Simple />, mountNode);
```
:::

:::demo 加减用法
```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;
let uniqId = 4;

class Simple extends React.Component {
  state = {
    activeId: '2',
    panels: [
      {
        tab: <span>选项一</span>,
        id: '1',
        disabled: true,
        content: '选项二'
      }, {
        tab: <span>空间选项二</span>,
        id: '2',
        content: <div>选项一的内容</div>
      }
    ],
  }

  onTabAdd = () => {
        let { panels } = this.state;
      panels.push({
          tab: `选项${uniqId}`,
          id: `${uniqId++}`,
          content: Date.now()
      });
      this.setState({
          panels
      });
    }

  onTabDel = ((id) => {
      let { panels } = this.state;
      let index = -1;
      panels.some((p, i) => {
          if (p.id === id) {
              index = i;
              return true;
          }
          return false;
      });
      if (index > -1) {
          panels.splice(index, 1);
          this.setState({
              panels
          });
      }
    })

  onTabChange = (id) => {
    this.setState({
      activeId: id
    });
  }

  renderPanels() {
    let { panels } = this.state;
    return panels.map((p) => {
      return (<TabPanel {...p} key={p.id}>{p.content}</TabPanel>);
    });
  }

  render() {
    return (
      <Tabs
        candel
        canadd
        activeId={this.state.activeId}
        onTabChange={this.onTabChange.bind(this)}
        onTabDel={this.onTabDel.bind(this)}
        onTabAdd={this.onTabAdd.bind(this)}
      >
        {this.renderPanels()}
      </Tabs>
    );
  }
};

ReactDOM.render(<Simple />, mountNode);
```

:::

:::demo 不使用TabPanel，只使用Tab展示导航

```jsx
import { Tabs } from 'zent';

class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeId: '2',
      tabs: [{
        title: '选项一',
        key: '1',
        disabled: true
      }, {
        title: '选项二',
        key: '2'
      }, {
        title: '选项三',
        key: '3'
      }]
    };
  }

  onTabChange(id) {
    this.setState({
      activeId: id
    });
  }
  
  render() {
    return (
      <div>
        <div style={{ marginTop: '10px' }}>
          <Tabs
            activeId={this.state.activeId}
            onTabChange={this.onTabChange.bind(this)}
            tabs={this.state.tabs} />
          <h1>{this.state.activeId}</h1>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Simple />, mountNode);
```

:::


### API

#### Tabs

| 参数          | 说明        | 类型       | 默认值        | 备选值                   | 是否必须 |
| ----------- | --------- | -------- | ---------- | --------------------- | ---- |
| activeId    | 激活的tab-id | string   |            |                       | 是    |
| type        | tabs组件类型  | string   | `'normal'` | `'card'`, `'slider'`  | 否    |
| size        | tabs的尺寸类型 | string   | `'normal'` | `'huge'`              | 否    |
| align       | tabs的布局类型 | string   | `'left'`   | `'right'`, `'center'` | 否    |
| onTabChange | 选中的tab改变时 | func(id) |            |                       | 否    |
| onTabDel    | 关闭tab时    | func(id) |            |                       | 否    |
| onTabAdd    | 点击增加tab时  | func     |            |                       | 否    |
| candel      | 是否可删除     | bool     | `false`    |                       | 否    |
| canadd      | 是否可增加tab  | bool     | `false`    |                       | 否    |
| tabs | 不使用Panel时的标签列表 | Array | `null` | | 否 |
| className   | 自定义额外类名   | string   | `''`       |                       | 否    |
| prefix      | 自定义前缀     | string   | `'zent'`   |                       | 否    |

tabs参数类型：
```ts
Array<{
  key: string | number, // 同TabPanel id
  title: string | number, // 同TabPanel tab
  disabled?: boolean // 同TabPanel disabled
}>

```

#### TabPanel

| 参数  | 说明                    | 类型     | 是否必须 |
| --- | --------------------- | ------ | ---- |
| tab | 该TabPanel所对应的tab标签的名字 | string | 是    |
| id  | 该TabPanel的id          | string | 是    |
| disabled | 该TabPanel是否被禁用 | bool | 否
