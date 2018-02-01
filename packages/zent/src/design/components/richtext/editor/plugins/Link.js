import React from 'react';
import Form from 'form';
import Sweetalert from 'sweetalert';
import Notify from 'notify';

const { createForm, Field, InputField } = Form;

const LinkForm = createForm({})(
  class LinkFromImpl extends React.Component {
    render() {
      return (
        <div className="share-content">
          <Form horizontal>
            <Field
              name="linkUrl"
              label="链接地址"
              validations={{
                required: true,
              }}
              validationErrors={{
                required: '链接地址不能为空',
              }}
              onPressEnter={this.onPressEnter}
              autoFocus
              component={InputField}
            />{' '}
          </Form>{' '}
        </div>
      );
    }

    onPressEnter = evt => {
      evt.preventDefault();
      this.props.onPressEnter();
    };
  }
);

export default function(options) {
  let form;
  let closeDialog;

  const onConfirm = () => {
    return new Promise((resolve, reject) => {
      form.submit();
      if (form.isValid()) {
        const formValues = form.getFormValues();
        let linkUrl = formValues.linkUrl;
        const reg = /^tel:/;
        const cheackURl = /(:\s*\/\/|tel:)/.test(formValues.linkUrl);

        // 包含http,ftp,file开头的地址，直接引用
        if (!cheackURl) {
          Notify.success(
            '您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀'
          );
          linkUrl = `http://${linkUrl}`;
        }
        const urlInfo = {
          target: reg.test(linkUrl) ? '' : '_blank',
          href: linkUrl,
          textValue: linkUrl,
        };
        options.callback(urlInfo);
        resolve();
      } else {
        reject();
      }
    });
  };

  const onPressEnter = () => {
    onConfirm()
      .then(() => {
        closeDialog();
      })
      .catch(() => {
        /* no nothing */
      });
  };

  closeDialog = Sweetalert.confirm({
    className: 'zent-design-component-richtext__link',
    title: '超链接',
    content: <LinkForm onPressEnter={onPressEnter} ref={f => (form = f)} />,
    onConfirm,
  });
}
