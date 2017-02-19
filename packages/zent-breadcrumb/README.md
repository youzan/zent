# zent-breadcrumb

基础面包屑组件，在一个带有层次的导航结构中标明当前页面的位置。

## 何时使用

* 当系统拥有超过两级以上的层级结构时；
* 当需要告知用户『你在哪里』时；
* 当需要向上导航的功能时。

## 自由选择

* 你可以通过向 Breadcrumb 传递 breads 数组的方式生成面包屑，breads数组的单个对象遵循 Item 组件的API规范;
* 你可以手动维护Item组件

## API

#### Breadcrumb API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| breads | 数据 | array | [] |  |
| className | 自定义额外类名 | string | '' | null |
| prefix | 自定义前缀 | string | 'zent' | null |

#### Item API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| name | 内容 | string or react element |  |  |
| href | 链接 | string |  |  |
| className | 自定义额外类名 | string | '' | null |
