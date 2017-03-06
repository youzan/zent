# zent-form

表单组件

## API

### ZentForm.Form

对于html中form元素的一个简单封装，提供默认的className

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | 否 |
| horizontal | 水平排列布局 | boolean  | false | 否 |
| inline | 行内排列布局 | boolean | false | 否 |
| onSubmit | 表单提交回调 | Function(e:Event) | function() {} | 否 |
| style | 内联样式 | object | null | 否 |

### ZentForm.createForm(options)(FormComponent)

使用方式如下：

```javascript
class FormComponent extends React.Component {
  render() {
    return (
      <Form>
        // 各种表单元素
        <Field
          name="interest"
          value={['eat', 'sleep']}
          component={(props) => (
            <CheckboxGroup {...props}>
              <Checkbox value="eat">吃饭</Checkbox>
              <Checkbox value="sleep">睡觉</Checkbox>
              <Checkbox value="wash">洗澡</Checkbox>
            </CheckboxGroup>
          )}
          validations={{
            // 直接在validations中定义校验方法就只能接收到所有表单元素值values和当前元素值value两个参数
            validInterest(values, value) {
              if (value.length > 0) return true
            }
          }}
          validationErrors={{
            validInterest: '至少选择一项'
          }}
        />
        <Field
          name="a"
          type="number"
          component={InputField}
          label="a"
          value="2"
          validations={{ 
            required: true, 
            // 使用自定义校验方法时可以额外传入参数
            isMoreThan: 'b'
          }}
          validationErrors={{ 
            required: '不能为空', 
            isMoreThan: 'a必须大于b' 
          }}
        />
        <Field
          name="b"
          type="number"
          component={InputField}
          label="b"
          value="3"
        />
      </Form>
    )
  }
}

FormComponent = Form.createForm({
  // 在这里定义的校验方法可以在定义validations时额外接收一个参数
  formValidations: {
    isMoreThan(values, value, otherField) {
      return Number(value) > Number(values[otherField])
    },
    ...
  }
})(FormComponent);
```


`options` 的配置项如下:

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| formValidations | 用于添加自定义校验方法，通过这种方式添加的方法在validations中使用时可以传额外的参数 | object | 否 |


经过 `ZentForm.createForm` 包装的组件通过props添加了zenForm属性，所以原组件可以访问到 `this.props.zentForm` 属性，`this.props.zentForm` 提供的 API 如下：

| 参数 | 说明 | 类型 |
|------|------|------|
| getFormValues | 获取与form绑定的所有字段值 | Function() | 
| getFieldError | 获取field的错误信息，没有报错信息返回空 | Function(name: string) |
| setFormPristine | 设置所有field的状态为非原始状态，用于在提交表单时让Field把没有显示出来的错误显示出来 | Function(isPristine: bool) |
| resetFieldsValue | 把所有field的值恢复到指定值或初始状态 | Function(data: object) |
| isValid | 表单的所有Field是否都通过了校验 | Function() |
| isSubmitting | 表单是否正在提交 | Function() |
| isValidating | 表单是否有Field在异步校验 | Function() |
| isFieldTouched | Field是否变更过值 | Function(name: string) |

### ZentForm.Field

| 参数 | 说明 | 类型 | 是否必填 |
|------|------|------|------|
| name | 表单元素名 | string | 是 |
| component | 表单元素组件，可以是字符串（标准html元素名），也可以是React组件 | string / React.Component | 是 |
| normalize | onChange或者onBlur后格式化表单元素值 | Function(value, previousValue, nextValues, previousValues) | 否 |
| format | 渲染前格式化表单元素值，不影响真正存储的表单元素值 | Function(value, previousValue, nextValues, previousValues) | 否 |
| onChange | value值修改后的回调（自定义组件需要调用props.onChange()才会触发) | Function(event, newValue, previousValue, preventSetValue) | 否 |
| onBlur | blur后的回调 | Function(event, newValue, previousValue, preventSetValue) | 否 |
| validations | 定义表单元素校验方法 | object | 否 |
| validationErrors | 定义表单元素检验方法对应的出错信息 | object | 否 |
| asyncValidation | 异步校验function，需要返回promise | Function(values, value) | 否 |
| value | 表单元素初始值 | any | 是 |

Field value的生命周期：  

	Field中传入value -> 使用format()格式化value -> value传入component中渲染组件 -> 用户操作改变value
														^													                          |
														|													                          |
        使用格式化后的value写入form中维护，用于数据提交 <- 使用normalize()格式化value <-

### 表单提交

form组件内部对表单提交的过程进行了一些封装，可以把异步提交的过程封装在一个function里并返回一个promise对象，组件内部会根据promise对象的执行结果分别调用onSubmitSuccess和onSubmitFail方法，同时更新isSubmitting属性。

```javascript
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const submit = (values) => {
    return sleep(1000)
      .then(() => {
        console.log(values)
      })
  }

  class SubmitForm extends React.Component {
    render() {
      const { zentForm, handleSubmit } = this.props
      const isSubmitting = zentForm.isSubmitting()

      return (
        <Form onSubmit={handleSubmit(submit)}>
          ...
          <button type="submit">{isSubmitting ? '提交中' : '提交'}</button>
        </Form>
      )
    }
  }

  class FormContainer extends React.Component {
    onSubmitSuccess(result) {
      ...
    }

    onSubmitFail(error) {
      ...
    }

    render() {
      return (
        <SubmitForm
          onSubmitSuccess={this.onSubmitSuccess}
          onSubmitFail={this.onSubmitFail}
        />
      )
    }
  }
```

