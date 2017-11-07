---
order: 7
zh-CN:
	title: 异步加载
	index: 首页
	tree: 树
en-US:
	title: Async Loading
	index: Index
	tree: Tree
---


```jsx
import { Tree } from 'zent';

const fetchData = (data, callback) => {
	if (data.level < 4) {
		setTimeout(() => {
			const resData = [];
			const base = Number(data.title.split('-')[0]);
			const step = Math.pow(10, 3 - data.level);
			const level = data.level + 1;
			for (let i = 0, id = '', isLeaf = false; i <= 9; i++) {
				if (level === 4) {
					id = String(base + i);
					isLeaf = true;
				} else {
					id = `${base + step * i}-${base + step * (i + 1)}`;
					isLeaf = false;
				}
				resData.push({ id, level, title: id, isLeaf });
			}
			callback(resData);
		}, 200);
	} else {
		setTimeout(() => callback([]), 200);
	}
}

class TreeExample extends React.Component {
	state = {
		treeData: []
	}

	componentDidMount() {
		const rootData = {
			id: '1-0-10000',
			title: '0-10000',
			level: 0,
			expand: true
		};
		fetchData(rootData, (resData) => {
			const newData = resData.map(item => ({
				...item,
				parentId: rootData.id
			}));
			this.setState({
				treeData: [rootData, ...newData]
			});
		});
	}

	loadMore = (data) => new Promise((resolve, reject) => {
		fetchData(data, (resData) => {
			const newData = resData.map(item => ({
				...item,
				parentId: data.id
			}));
			this.setState({ treeData: [...this.state.treeData, ...newData] });
			resolve();
		});
	});

	render() {
		const { treeData } = this.state;
		return <Tree dataType="plain" data={treeData} loadMore={this.loadMore} />;
	}
}

ReactDOM.render(
	<TreeExample />
	, mountNode
);
```
