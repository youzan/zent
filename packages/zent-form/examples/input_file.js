import React, { Component } from 'react';
import Form from '../src';
import '../assets/index.scss';

const { Field, createForm } = Form;

const renderField = props => (
  <div className="control-group">
    <label className="control-label">{props.label}</label>
    <div className="controls">
      <input {...props} />
      {props.isTouched && props.error && <span>{props.error}</span>}
    </div>
  </div>
);

class FileForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form prefix="test" onSubmit={handleSubmit} horizontal>
        <Field
          name="user"
          type="file"
          component={renderField}
          label="文件上传："
          validations={{ required: true }}
          validationErrors={{ required: '不能为空' }}
        />
        <button type="submit">提交</button>
      </Form>
    );
  }
}

const FileFormContainer = createForm()(FileForm);

export default class Simple extends Component {
  onSubmit = (values) => {
    console.log(values); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <h2>文件上传</h2>
        <hr />
        <FileFormContainer
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
