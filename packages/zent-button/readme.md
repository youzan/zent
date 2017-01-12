# @youzan/zent-button

基本组件按钮，提供default primary...等基础需求以及disable、loading等状态

[![version][version-image]][download-url]
[![download][download-image]][download-url]

主要通过type来控制按钮的样式，size控制按钮的大小。同时提供block、disabled、loading等修饰属性。
当传入href/target属性，按钮功能将表现为a标签，但是样式仍然可以通过其他属性进行单独控制。

## API

| 参数       | 说明           | 类型     | 默认值       | 备选值                                           |
| ------    | ------       | ------ | --------  | --------                                      |
| type      | 风格           | string | 'default' | 'default'、'primary'、'danger'、'success' |
| size      | 尺寸           | string | 'medium'  | 'medium'、'large'、'small'                      |
| block     | 是否以块级元素的形式展开 | bool   | false     |                                   |
| disabled  | 状态控制         | bool   | false     |                                    |
| loading   | 状态控制         | bool   | false     |                                    |
| outline   | 边框有颜色，内部没有颜色 | bool   | false     |                                   |
| bordered  | 边框透明控制       | bool   | true      |                                 |
| 其他参数 | | | | |
| component | 自定义组件标签类型    | string |       |                                           |
| href | 可选，如果设置的话会用a标签而不是button | string | | |
| target | 可选，和href一起使用，就是a标签的target属性 | string | '' | '_blank' |
| className | 自定义类名        | string |         |                                           |
| prefix    | 自定义前缀        | string | zent    |                                      |


[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-button.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-button.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-button
