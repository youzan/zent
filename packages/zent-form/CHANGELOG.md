## 2.0.4 (2017-03-17)

* getControlGroup支持在Field中传className，作为添加到control-group上的额外类名，可以用来覆盖子元素的样式
* getControlGroup中错误样式类zent-form__help-block -> zent-form__error-desc

## 2.0.3 (2017-03-14)

* 文档 & 示例修改

## 2.0.2 (2017-03-13)

* 修改导出方式

## 2.0.0 (2017-03-07)

* zentForm中添加isFieldTouched和isFieldValidating方法
* 原生标签不再传非标准属性，否则会有warning，具体可以参考这篇文章 [Unknown Prop Warning](https://facebook.github.io/react/warnings/unknown-prop.html)
* 删了几个没用的内置validation rules

### 不兼容改动
* Field中获取component属性中传入的组件方法更名: getWrappedField -> getWrappedComponent
* 重新规划了Field value的生命周期：  
	Field中传入value -> 使用format()格式化value -> value传入component中渲染组件 -> 用户操作改变value
						^													   |
						|													   |
       使用格式化后的value写入form中维护，用于数据提交 <- 使用normalize()格式化value <-

### 新功能
* 增加Fieldset组件
* Field增加asyncValidation参数支持，用于异步校验
* 增加一个SubmissionError类，统一sumit阶段的错误处理
* Field中可以通过props传入onChange和onBlur回调，会在相应的阶段调用。接收参数为event, newValue, previousValue, preventSetValue。其中preventSetValue是一个function，调用后会阻止value值的更新。

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
