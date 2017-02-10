# zent-loading

loading 用于界面或者区块的加载中状态

## 提供三种使用方式

* 通过 API 的调用方式，调用 on() 方法和 off() 方法
* 使用API调用时，也可以传入 props 用于初始化 .on({prefix: 'cat'})
* 通过普通组件的调用方式，提供show作为 props，如果static为 false，需要包好一个目标组件，以遮罩层形式存在；如果设置 static 为 true，将会出现在文档流中，请根据情况按需使用

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | '' | '' |
| containerClass | 自定义额外类名，外部包裹的容器使用 | string | '' | '' |
| prefix | 自定义前缀 | string | 'zent' | null |
| show | 显示控制 | bool | false | true |
| static | 是否以标签形式存在于文档流中 | bool | true | false |
| height | 设置 static 为 true 情况下，设置高度，如果包裹了组件，将会表现为组件高度，否则将会使用默认高度 | '' | 160 |  |
| zIndex | 设置 z-index | number | 9998 | |
