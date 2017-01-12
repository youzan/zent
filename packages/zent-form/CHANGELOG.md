## 0.1.10 (2017-01-10)

* 
* 为内置封装的SelectField做onChange回调参数的兼容
* 

## 0.1.9 (2017-01-10)

*
* 为内置封装的InputField等组件添加高亮的必填*标识和说明性文字支持
* 
* 使用方式如下：（在Field中添加helpDesc和required属性即可）
* 
```js
<Field
    name="name"
    type="text"
    label="用户名："
    value="123"
    component={InputField}
    helpDesc="我是说明"
    required
/>
```

## 0.1.8 (2016-12-28)

* 
* 修复使用jquery中非标准promise方法always导致的报错，改用then
* 
