<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-utils

[![npm version](https://img.shields.io/npm/v/zent-utils.svg?style=flat)](https://www.npmjs.com/package/zent-utils) [![downloads](https://img.shields.io/npm/dt/zent-utils.svg)](https://www.npmjs.com/package/zent-utils)

组件库的工具函数／工具组件

## 添加新组件／函数

为了方便引用, 所有打包之后生成的文件／目录应该处于根目录下. `package.json` 的 `files` 字段下需要加上新文件, 同时在 `.gitignore` 中忽略新文件.

## API

### classnames

导出了用来拼接React `className` 的 `classnames` 函数, 使用方法和[classnames](https://github.com/JedWatson/classnames)一致.

### lodash

导出了[lodash](<>)中的所有函数, 只支持按需 `import` 的方式引用.

`import isFunction from 'zent-utils/lodash/isFunction';`

### WindowEventHandler

在`window`上绑定全局事件.

| 参数         | 说明           | 类型     | 默认值     |
| ---------- | ------------ | ------ | ------- |
| eventName  | 事件名字         | string |         |
| callback   | 事件的回调函数      | func   | `noop`  |
| useCapture | 是否为capture事件 | bool   | `false` |

### WindowResizeHandler

监听全局的 `resize` 事件.

| 参数       | 说明            | 类型   |
| -------- | ------------- | ---- |
| onResize | resize事件的回调函数 | func |

### DOM 工具函数

#### findPositionedParent

`findPositionedParent(element: Node, inclusive: bool): Node`

搜索DOM树中最近的一个有指定 `position` 属性的节点, `inclusive` 为true时, `element` 也会加入搜索路径中.

#### getViewportSize

`getViewportSize(): { width: number, height: number }`

获取当前viewport的大小, viewport指浏览器的可视空间.
