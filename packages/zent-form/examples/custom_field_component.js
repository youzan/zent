/*
  这里有两个例子：
  1. 简单封装了一个input输入框
  2. 在一个Field里封装了两个表单元素，这也是一个常见的需求，做法就是将两个表单元素的value值封装在一个对象里传入到Field中。
 */

import React, { Component } from 'react';
import cx from 'zent-utils/classnames';
import Form from '../src';
import Select from 'zent-select';
import 'zent-input/assets/index.scss';
import 'zent-select/assets/index.scss';
import '../assets/index.scss';

const { Field, createForm } = Form;
const { SelectTrigger } = Select;
const countyCodeList = [
  { code: '+86', zh: 'zhongguo', eng: 'china', value: '中国 +86', index: 0 },
  { code: '+853', zh: 'aomen', eng: 'Macau', value: '中国澳门 +853', index: 1 }
];

const ContactPhone = props => {
  const value = props.value;
  const showError = props.isTouched && props.error;
  const mobileClassName = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  const onSelectChange = (e, selectedItem) => {
    const newValue = {
      ...value,
      areacode: selectedItem.index
    };
    props.onChange(newValue);
  };
  const onPhoneChange = (e) => {
    const newValue = {
      ...value,
      mobile: e.target.value
    };
    props.onChange(newValue);
  };
  const filterHandler = (item, keyword) => {
    return keyword && item.text.trim().toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1;
  };

  return (
    <div className={mobileClassName}>
      <label className="zent-form__control-label">联系方式：</label>
      <div className="zent-form__controls">
        <Select
          className="areacode"
          value={value.areacode}
          data={props.areadata}
          filter={filterHandler}
          optionValue="index"
          optionText="value"
          trigger={SelectTrigger}
          onChange={onSelectChange}
        />
        <div className="zent-input-wrapper phone-num" style={{ display: 'inline-block' }}>
          <input className="zent-input" type="text" placeholder="请填写手机号" value={value.mobile} onChange={onPhoneChange} />
        </div>
        {showError && <p className="zent-form__help-block">{props.error}</p>}
      </div>
    </div>
  );
};

const renderEmail = (props) => {
  const showError = props.isTouched && props.error;
  const className = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  return (
    <div className={className}>
      <label className="zent-form__control-label">邮箱</label>
      <div className="zent-form__controls">
        <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        {showError && <span className="zent-form__help-block">{props.error}</span>}
      </div>
    </div>
  );
};

class OverviewForm extends Component {
  render() {
    return (
      <Form className="form1" horizontal>
        <Field name="email" component={renderEmail} value="11@youzan.com" validations={{ isEmail: true }} validationErrors={{ isEmail: '请输入正确的格式' }} />
        <Field
          name="contactPhone"
          value={{
            areacode: 1,
            mobile: 15899776666
          }}
          areadata={countyCodeList}
          component={ContactPhone}
          validations={{
            validMobile(values, value) {
              let countryIndex = +value.areacode || 0;
              let mobile = +value.mobile;
              let normal = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
              let mobileReg = /^\d{1,10}$/;
              let res = true;
              if (!countryIndex) {
                res = normal.test(mobile);
              } else {
                res = mobileReg.test(mobile);
              }
              return res;
            }
          }}
          validationErrors={{
            validMobile: '请输入正确的手机号'
          }}
        />
      </Form>
    );
  }
}

const OverviewFormContainer = createForm()(OverviewForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>封装自定义组件</h2>
        <hr />
        <OverviewFormContainer />
      </div>
    );
  }
}
