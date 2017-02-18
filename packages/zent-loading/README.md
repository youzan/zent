<p>
	<a href="https://github.com/youzan/">
		 <img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-loading

[![npm version](https://img.shields.io/npm/v/zent-loading.svg?style=flat)](https://www.npmjs.com/package/zent-loading) [![downloads](https://img.shields.io/npm/dt/zent-loading.svg)](https://www.npmjs.com/package/zent-loading)

加载状态组件

## 使用指南

**按需使用**

1. 通过 API 的调用方式, 调用 `on()` 方法和 `off()` 方法.

	使用API调用时, 也可以传入 props 用于初始化. e.g. `.on({prefix: 'cat'})`
2. 通过使用普通组件的方式调用, 提供 `show` 作为 props, 如果 `static` 为  `false`, 需要包一个目标组件, 以遮罩层形式存在; 如果 `static` 设置为 `true`, 将会出现在文档流中.



## API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| className | 自定义额外类名 | string | `''` |
| containerClass | 自定义额外类名，外部包裹的容器使用 | string | `''` |
| prefix | 自定义前缀 | string | `'zent'` |
| show | 显示控制 | bool | `false` |
| static | 是否以标签形式存在于文档流中 | bool | `true` |
| height | 设置 static 为 true 情况下，设置高度，如果包裹了组件，将会表现为组件高度，否则将会使用默认高度 | number | `160` |
| zIndex | 设置 z-index | number | `9998` | |
