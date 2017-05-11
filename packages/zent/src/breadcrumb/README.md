## Breadcrumb 面包屑

面包屑，提供一个有层次的导航结构, 并标明当前位置。

### 使用指南

-   系统拥有超过两级以上的层级结构。
-   需要告知用户『你在哪里』。
-   需要向上导航的功能。

### 代码演示

:::demo 基础用法
```jsx
import { Breadcrumb } from 'zent';

const dataList = [
	{ name: '首页', href: '//www.youzan.com' },
	{ name: '应用中心', href: '//www.youzan.com' },
	{ name: '营销中心' }
];

ReactDOM.render(
	<Breadcrumb breads={dataList} />
	, mountNode
);
```
:::

:::demo 可以直接调用 Breadcrumb.Item 组件
```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Breadcrumb>
		<Breadcrumb.Item name={"首页"} href="//www.youzan.com" />
		<Breadcrumb.Item name={"应用中心"} href="//www.youzan.com" className="zent-demo-bread" />
		<Breadcrumb.Item name={"营销中心"} />
	</Breadcrumb>
	, mountNode
)
```
:::

:::demo 用户自定义 Breadcrumb.Item 的内容，或者自定义面包屑的所有内容
```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Breadcrumb>
		<Breadcrumb.Item>
			<a href="//www.youzan.com">首页</a>
		</Breadcrumb.Item>
		<Breadcrumb.Item>
			<span>应用中心</span>
		</Breadcrumb.Item>
		<span>营销中心</span>
	</Breadcrumb>
	, mountNode
)
```
:::


### API

#### Breadcrumb


| 参数    |   说明          | 类型     | 默认值        |
| --------- | ------------- | ------ | ---------- |
| breads      | 数据  | array | `[]`   |
| className | 自定义额外类名  | string | `''`       |
| prefix    | 自定义前缀    | string | `'zent'`   |

#### Item


| 参数        | 说明      | 类型                      | 默认值  |
| --------- | ------- | ----------------------- | ---- |
| className | 自定义额外类名 | string                  | `''` |
| name      | 内容      | string or React node |  -    |
| href      | 链接      | string                  |   -   |
