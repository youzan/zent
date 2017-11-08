import isPromise from 'utils/isPromise';
import map from 'lodash/map';
import SubmissionError from './SubmissionError';

const handleSubmit = (submit, zentForm) => {
  const props = zentForm.props;
  const values = zentForm.getFormValues();
  const { onSubmitSuccess, onSubmitFail } = props;
  let validationErrors;

  zentForm.setFormDirty(true);

  // 如果有异步校验未完成，阻止表单提交
  if (zentForm.isValidating()) {
    if (onSubmitFail) {
      onSubmitFail(
        new SubmissionError({
          isValidating: true
        })
      );
    }
    return;
  }

  if (!zentForm.isValid()) {
    // 存在校验错误
    validationErrors = zentForm.getValidationErrors();
    if (onSubmitFail) {
      onSubmitFail(new SubmissionError(validationErrors));
    }
  } else {
    const handleSubmitError = submitError => {
      // 只处理SubmissionError类型的错误
      const error =
        submitError instanceof SubmissionError ? submitError.errors : undefined;
      if (onSubmitFail) {
        onSubmitFail(error);
      }

      return error;
    };
    const doSubmit = () => {
      let result;

      try {
        // 传入zentForm是为了使用服务端校验时可以调用setFieldExternalErrors方法
        result = submit(values, zentForm);
      } catch (submitError) {
        const error = handleSubmitError(submitError);
        if (error || onSubmitFail) {
          return error;
        }
        // 没有处理过的error才throw
        throw submitError;
      }

      if (isPromise(result)) {
        zentForm.setState({
          isSubmitting: true
        });

        return result.then(
          submitResult => {
            zentForm.setState({
              isSubmitting: false
            });
            if (onSubmitSuccess) {
              onSubmitSuccess(submitResult);
            }
            return submitResult;
          },
          submitError => {
            zentForm.setState({
              isSubmitting: false
            });
            const error = handleSubmitError(submitError);
            if (error || onSubmitFail) {
              return error;
            }

            throw submitError;
          }
        );
      }

      // submit是一个同步过程，直接当成功处理
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }

      return result;
    };

    // 存在没有进行过的异步校验
    if (!zentForm.isFormAsyncValidated()) {
      const asyncValidations = map(zentForm.fields, field => {
        return zentForm.asyncValidate(field, field.getValue());
      });
      Promise.all(asyncValidations)
        .then(() => {
          return doSubmit();
        })
        .catch(error => {
          if (onSubmitFail) {
            onSubmitFail(new SubmissionError(error));
          }
        });
    } else {
      return doSubmit();
    }
  }
};

export default handleSubmit;
