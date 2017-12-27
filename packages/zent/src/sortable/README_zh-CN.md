---
title: Sortable
subtitle: 拖拽排序
path: component/sortable
group: 数据
---

## Sortable 拖拽排序

Sortable 主要用于一个区域内元素的拖拽排序

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| tag | 容器元素的HTML标签名           | string              | `'div'`            |                    一切合法的HTML标签名                       |
| items      		 | 被排序元素的数组                   | array                |           |  							  			         |
| options   |  		其他一些自定义配置项			 | object 						 |  				  | 														   			          |
| onChange           | 排序完成时的回调函数									| (newItems: array): void | `noop`           |                         |
| className          | 自定义额外类名                  | string              | `''`						 |                             |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |															|

<style>
	.demo-sortable {
		padding: 0 140px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.demo-sortable-item,
	.demo-sortable-add {
		position: relative;
		text-align: center;
		line-height: 100px;
		border: 1px solid #bbb;
		border-radius: 4px;
		flex: 0 0 100px;
		height: 100px;
		margin: 0 20px 20px 0;
	}

	.demo-sortable-add {
		cursor: pointer;
	}

	.demo-sortable-item:hover {
		.demo-sortable-icon {
			display: block;
		}
	}

	.demo-sortable-drag {
		.demo-sortable-icon {
			display: none !important;
		}
	}

	.demo-sortable-icon {
		display: none;
		cursor: pointer;
		font-size: 10px;
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>
