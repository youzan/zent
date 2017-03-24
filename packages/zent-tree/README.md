## Tree 树

树形控件，展示文件结构、组织架构、地理信息等分层数据的控件。

### 使用指南

-  支持两种数据格式，递归树形结构和单层列表结构。
-  组件展示对应传入的data属性，内部不会改变data，具体请看自定义操作的例子。

### 代码演示

:::demo 基础用法
```js
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
	children: [{
		id: 2,
		title: '技术',
		children: [{
			id: 3,
			title: '后端'
		}, {
			id: 4,
			title: '运维'
		}, {
			id: 5,
			title: '前端'
		}]
	}, {
		id: 6,
		title: '产品'
	}]
}];

ReactDOM.render(
	<Tree data={treeData} />
	, mountNode
);
```
:::

:::demo 列表格式数据源
```js
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
}, {
	id: 2,
	title: '技术',
	parentId: 1
}, {
	id: 3,
	title: '后端',
	parentId: 2
}, {
	id: 4,
	title: '运维',
	parentId: 2
}, {
	id: 5,
	title: '前端',
	parentId: 2
}, {
	id: 6,
	title: '产品',
	parentId: 1
}];

ReactDOM.render(
	<Tree dataType="plain" data={treeData} />
	, mountNode
)
```
:::

:::demo 三种大小
```js
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
	children: [{
		id: 2,
		title: '技术',
		children: [{
			id: 3,
			title: '后端'
		}, {
			id: 4,
			title: '运维'
		}, {
			id: 5,
			title: '前端'
		}]
	}, {
		id: 6,
		title: '产品'
	}]
}];

ReactDOM.render(
	<div>
		<Tree data={treeData} size="small" />
		<Tree data={treeData} />
		<Tree data={treeData} size="large" />
	</div>
	, mountNode
);
```
:::

:::demo 自定义节点展示
```js
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
	content: '移动零售服务商',
	children: [{
		id: 2,
		title: '技术',
		content: '职位介绍http://job.youzan.com',
		children: [{
			id: 3,
			title: '后端'
		}, {
			id: 4,
			title: '运维'
		}, {
			id: 5,
			title: '前端'
		}]
	}, {
		id: 6,
		title: '产品',
		content: <a href="http://job.youzan.com">请将简历发送至 joinus@youzan.com</a>,
	}]
}];

const customRender = (data) => (
	<span style={{ fontSize: 16, margin: 0, lineHeight: 1 }}>
		{data.title}
		{data.content ? <small style={{ display: 'block', fontSize: 10 }}>{data.content}</small> : ''}
	</span>
);

ReactDOM.render(
	<Tree data={treeData} render={customRender} />
	, mountNode
)
```
:::

:::demo 自定义操作
```js
import { Tree, Icon, Radio } from 'zent';

const RadioGroup = Radio.Group;
const originData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
}, {
	id: 2,
	title: '技术',
	parentId: 1
}, {
	id: 3,
	title: '后端',
	parentId: 2
}, {
	id: 4,
	title: '运维',
	parentId: 2
}, {
	id: 5,
	title: '前端',
	parentId: 2
}, {
	id: 6,
	title: '产品',
	parentId: 1
}];

const deepClone = (node, parentId = 0, nodeArray = []) => {
	const copyNode = {
		id: String(Math.random()).replace('0.', ''),
		parentId,
		title: node.title
	};
	nodeArray.push(copyNode);
	
	for (let i = 0, l = node.children && node.children.length || 0; i < l; i++) {
		deepClone(node.children[i], copyNode.id, nodeArray);
	}
	return nodeArray;
}

class TreeExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: originData,
			copyType: 'shallow' 
		};
		this.onDelete = this.onDelete.bind(this);
		this.onClone = this.onClone.bind(this);
		this.onCopyTypeChange = this.onCopyTypeChange.bind(this);
	}

	onDelete(data) {
		this.setState({
			treeData: this.state.treeData.filter(item => item.id !== data.id)
		});
	}

	onClone(data) {
		const { copyType } = this.state;
	
		if (copyType === 'shallow') {
			const node = Object.assign({}, data, { id: Date.now() });
			this.setState({
				treeData: [...this.state.treeData, node]
			});
		} else if (copyType === 'deep') {
			const nodeArray = deepClone(data, data.parentId);
			this.setState({
				treeData: [...this.state.treeData, ...nodeArray]
			});
		}
	}

	onCopyTypeChange(e) {
		this.setState({ copyType: e.target.value });
	}

	render() {
		const { copyType, treeData } = this.state;
		const operations = [{
			name: 'Delete',
			icon: <Icon type="close" />,
			action: this.onDelete
		}, {
			name: 'Clone',
			icon: <Icon type="plus" />,
			action: this.onClone
		}];
	
		return (
			<div>
				<RadioGroup onChange={this.onCopyTypeChange} value={copyType}>
					<Radio value="shallow">浅拷贝</Radio>
					<Radio value="deep">深拷贝</Radio>
				</RadioGroup>
				<hr/>
				<Tree data={treeData} dataType="plain" operations={operations} />
			</div>
		);
	}
}

ReactDOM.render(
	<TreeExample />
	, mountNode
)
```
:::

:::demo 可选树
```js
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
	children: [{
		id: 2,
		title: '技术',
		children: [{
			id: 3,
			title: '后端'
		}, {
			id: 4,
			title: '运维'
		}, {
			id: 5,
			title: '前端'
		}]
	}, {
		id: 6,
		title: '产品'
	}]
}];
const defaultCheckedKeys = [2, 3];
const disabledCheckedKeys = [4, 5];

const onCheck = data => console.log(data);

ReactDOM.render(
	<Tree
		checkable
		data={treeData}
		onCheck={onCheck}
		defaultCheckedKeys={defaultCheckedKeys}
		disabledCheckedKeys={disabledCheckedKeys}
	/>
	, mountNode
)
```
:::

:::demo 异步加载
```js
import { Tree } from 'zent';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';

const RegionFetchUrl = 'https://koudaitong.com/v2/common/region/list.jsonp';

const ajaxJsonpGet = (url, callback) => {
	superagent
		.get(url)
		.use(jsonp)
		.end((err, res) => {
			if (err || res.body.code !== 0 || !res.body) {
				// deal with error
			} else {
				callback(res.body);
			}
		});
};
const fetchRegions = (regionId, callback) => ajaxJsonpGet(`${RegionFetchUrl}?region_id=${regionId}`, callback);

class TreeExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: []
		}
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount() {
		fetchRegions('', resBody => {
			const rootData = {
				id: 'China',
				title: '中国🇨🇳',
				expand: true
			};
			const newData = Object.keys(resBody.data).map(key => ({
				id: key,
				title: resBody.data[key],
				parentId: 'China'
			}));
			this.setState({
				treeData: [rootData, ...newData]
			});
		});
	}

	loadMore(data) {
		return new Promise((resolve, reject) => {
			fetchRegions(data.id, (resBody) => {
				const newData = Object.keys(resBody.data).map(key => ({
					id: key,
					title: resBody.data[key],
					parentId: data.id
				}));
				this.setState({ treeData: [...this.state.treeData, ...newData] });
				resolve();
			});
		});
	}

	render() {
		const { treeData } = this.state;
		return <Tree dataType="plain" data={treeData} loadMore={this.loadMore} />;
	}
}

ReactDOM.render(
	<TreeExample />
	, mountNode
)
```
:::

### API

#### Tree

| 参数                 | 说明                                                        | 类型                 | 默认值     | 备选值                |
| ------------------- | ------------------------------------------------------------| ------------------- | ---------- | -------------------- |
| dataType            | 数据类型, 默认为tree类型                                       | string             | `'tree'`   | `'plain'`            |
| data                | 必填, 实际传入的数据, 根据dataType进行识别                       | array              |            |                      |
| render              | 自定义树条目渲染方法, 传入参数为该节点数据 (包含子树)              | func(data)         |            |                      |
| operations          | 自定义操作, 包含 `name`, `icon`, `action`, `shouldRender` 属性 | array[object]      |            |                      |
| foldable            | 是否支持点击条目时展开与收起动作                                 | bool               | `true`     |                      |
| checkable           | 是否支持checkbox选择                                          | bool               | `true`     |                      |
| onCheck             | 点击checkbox的回调函数, 传入包含所有点击节点id数组                | func(data)         |            |                      |
| defaultCheckedKeys  | 默认选中节点id数组                                            | array              |             |                      |
| disabledCheckedKeys | 默认禁选节点id数组                                            | array              |             |                      |
| size                | 大小                                                         | string             | `'medium'` | `'small'`, `'large'` |
| commonStyle         | 设置整个tree的外层style                                       | object             |             |                      |
| expandAll           | 是否展开所有节点                                              | bool               | `false`     |                      |
| onExpand            | 展开节点之后的回调函数                                         | func(data, config) |             |                      |
| autoExpandOnSelect  | 点击节点是否展开                                              | bool               | `true`      |                      |
| onSelect            | 选择树的一个节点的回调函数                                      | func(data, target) |            |                      |
| isRoot              | plain数据类型，判断节点是否为根节点的api                         | func(node)         |            |                      |

#### data

支持自由扩展

| 参数      | 说明                                                | 类型           | 默认值   | 备选值 |
| -------- | --------------------------------------------------- | ------------- | ------- |--------|
| id       | 必填, 数据的唯一标识                                   | number/string |         |       |
| title    | 必填, 显示内容                                        | string        |         |       |
| children | 子树 (`dataType="tree"` 时生效)                       | array[object] |         |       |
| parentId | 父节点Id (`dataType="plain"` 时生效), 根节点为0或不定义 | number/string |         |       |
| expand   | 是否展开                                             | bool          | `false` |       |
| isLeaf   | 是否叶子节点                                          | bool          | `false` |       |

#### operations

| 参数           | 说明                            | 类型              |  默认值   | 备选值 |
| ------------ | -------------------------------- | ----------------- | ------- |--------|
| name         | 必填，显示内容                     | string            |         |        |
| icon         | 显示icon的className, 或ReactNode  | string／ReactNode  |         |       |
| action       | 必填，点击回调函数，参数为子树信息    | func(data)        |         |        |
| shouldRender | 是否更新，返回true/false           | func(data)        | `true`  |        |
