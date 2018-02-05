---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Avatar } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-avatar-list">
			<Avatar size="small">Y</Avatar>
			<Avatar size="small" icon="customer" />
			<Avatar
				size="small"
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png" 
			/>
			<Avatar size="small" shape="square">Y</Avatar>
			<Avatar size="small" shape="square" icon="customer" />
			<Avatar 
				size="small"
				shape="square"
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png" 
			/>
		</div>
		<div className="zent-avatar-list">
			<Avatar>Y</Avatar>
			<Avatar icon="customer" />
			<Avatar
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png"
			/>
			<Avatar shape="square">Y</Avatar>
			<Avatar shape="square" icon="customer" />
			<Avatar 
				shape="square"
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png" 
			/>
		</div>
		<div className="zent-avatar-list">
			<Avatar size="large" >Y</Avatar>
			<Avatar size="large" icon="customer" />
			<Avatar
				size="large" 
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png" 
			/>
			<Avatar size="large" shape="square">Y</Avatar>
			<Avatar size="large" shape="square" icon="customer" />
			<Avatar 
				size="large"
				shape="square"
				src="https://img.yzcdn.cn/public_files/2018/02/01/5df3bb4b640ddc5efae915b7af90a243.png" 
			/>
		</div>
	</div>
	, mountNode
);
```

<style>
.zent-avatar-list {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
	align-items: center;

	&:first-child {
		margin-top: 0;
	}

	.zent-avatar:not(:last-child),
	.zent-badge:not(:last-child) {
		margin-right: 10px
	}
}
</style>
