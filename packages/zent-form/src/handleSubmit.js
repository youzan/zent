import isPromise from 'zent-utils/isPromise';

const handleSubmit = (submit, zentForm) => {
  const props = zentForm.props;
  const values = zentForm.getFormValues();
  const { onSubmitSuccess, onSubmitFail } = props;

  zentForm.setFormPristine(false);

  if (zentForm.isValid()) {
    const doSubmit = () => {
      let result;

      try {
        // 传入zentForm是为了使用服务端校验时可以调用setFieldExternalErrors方法
        result = submit(values, zentForm);
      } catch (submitError) {
        if (onSubmitFail) {
          onSubmitFail(submitError);
        }
        return submitError;
      }

      if (isPromise(result)) {
        zentForm.setState({
          isSubmitting: true
        });

        return result
          .then(submitResult => {
            zentForm.setState({
              isSubmitting: false
            });
            if (onSubmitSuccess) {
              onSubmitSuccess(submitResult);
            }
            return submitResult;
          }, submitError => {
            zentForm.setState({
              isSubmitting: false
            });
            if (onSubmitFail) {
              onSubmitFail(submitError);
            }
            return submitError;
          });
      }

      // submit是一个同步过程，直接当成功处理
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }

      return result;
    };

    return doSubmit();
  }
};

export default handleSubmit;
