## 1.1.0 (2017-02-22)

* zentForm中添加isFieldTouched方法
* Field中获取component属性中传入的组件方法更名: getWrappedField -> getWrappedComponent
* 原生标签不再传非标准属性，否则会有warning，具体可以参考这篇文章[Unknown Prop Warning](https://facebook.github.io/react/warnings/unknown-prop.html)
* 重新规划了Field value的生命周期：  
	Field中传入value -> 使用format()格式化value -> 使用格式化后的value渲染组件 -> 用户操作改变value
						^													|
						|													|
     使用格式化后的value写入form中维护，用于数据提交 <- 使用normalize()格式化value <- 
* 删了几个没用的内置validation rules

## 0.1.10 (2017-01-10)

* 为内置封装的SelectField做onChange回调参数的兼容

## 0.1.9 (2017-01-10)

* 为内置封装的InputField等组件添加高亮的必填*标识和说明性文字支持

使用方式如下：（在Field中添加helpDesc和required属性即可）

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

* 修复使用jquery中非标准promise方法always导致的报错，改用then 
