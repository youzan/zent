---
title: Sortable
subtitle: Drag and drop sort
path: component/sortable
group: Data Entry
---

## Sortable 拖拽排序

Sortable 主要用于一个区域内元素的拖拽排序

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| tag | 容器元素的HTML标签名           | string              | `'div'`            |                    一切合法的HTML标签名                       |
| items      		 | 被排序元素的数组                   | array                |           |  							  			         |
| options   |  		其他一些自定义配置项			 | object 						 |  				  | 														   			          |
| onChange           | 排序完成时的回调函数									| (newItems: number, prev: number): void | `noop`           |                         |
| className          | 自定义额外类名                  | string              | `''`						 |                             |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |															|

