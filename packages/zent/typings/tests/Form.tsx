import * as React from 'react';
import { Form, Button, Checkbox, Notify } from '../';

const { FormInputField, FormCheckboxGroupField, createForm } = Form;


class FieldForm extends React.Component<zent.Form.IWrappedComponentProps, { checkedList: string[] }, never> {
  state = {
    checkedList: []
  }

  onCheckboxChange = (checkedList) => {
    this.setState({ checkedList });
  }

  submit = (values, zentForm) => {
    Notify.success(JSON.stringify(values));
  };

  resetForm = () => {
    this.props.zentForm.resetFieldsValue();
  }

  render() {
    const { handleSubmit } =this.props;

    return (
      <Form horizontal onSubmit={handleSubmit(this.submit)}>
        <FormInputField
          name="name"
          type="text"
          label="昵称:"
          required
          helpDesc="正则校验"
          validations={{
            required: true,
            matchRegex: /^[a-zA-Z]+$/
          }}
          validationErrors={{
            required: '请填写昵称',
            matchRegex: '昵称只能是字母'
          }}
        />
        <FormInputField
          name="password"
          type="text"
          label="密码:"
          required
          helpDesc="非空校验"
          validations={{
            required: true
          }}
          validationErrors={{
            required: '请填写密码'
          }}
        />
        <FormInputField
          name="confirmPw"
          type="text"
          label="确认密码:"
          required
          helpDesc="与其他表单域对比校验"
          validations={{
            equalsField: 'password'
          }}
          validationErrors={{
            equalsField: '两次填写的密码不一致'
          }}
        />
        <FormInputField
          name="email"
          type="text"
          label="邮件:"
          helpDesc="邮件校验"
          validations={{
            isEmail: true
          }}
          validationErrors={{
            isEmail: '请填写正确的邮件'
          }}
        />
        <FormInputField
          name="url"
          type="text"
          label="个人网站链接:"
          helpDesc="超链接校验"
          validations={{
            isUrl: true
          }}
          validationErrors={{
            isUrl: '请填写正确的网址'
          }}
        />
        <FormInputField
          name="id"
          type="text"
          label="证件号码:"
          required
          helpDesc="自定义校验函数"
          validations={{
            matchRegex: /^\d+$/,
            format(values, value) {
              return value.length === 15 || value.length === 10
            }
          }}
          validationErrors={{
            matchRegex: '证件号码必须是数字',
            format: '证件号码是10位或者15位数字'
          }}
        />
        <FormCheckboxGroupField
          name="hobbies"
          type="text"
          label="兴趣标签:"
          value={this.state.checkedList}
          onChange={this.onCheckboxChange}
          required
          helpDesc="长度校验"
          validations={{
            minLength: 2
          }}
          validationErrors={{
            minLength: '请至少选择两个'
          }}
        >
          <Checkbox value="movie">电影</Checkbox>
          <Checkbox value="book">书籍</Checkbox>
          <Checkbox value="travel">旅行</Checkbox>
        </FormCheckboxGroupField>
        <div className="zent-form__form-actions">
          <Button type="primary" htmlType="submit">获取表单值</Button>
          <Button type="primary" outline onClick={this.resetForm}>重置表单值</Button>
        </div>
      </Form>
    );
  }
}

const WrappedForm = createForm()(FieldForm);

export default WrappedForm
