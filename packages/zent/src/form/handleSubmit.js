import isPromise from 'utils/isPromise';
import SubmissionError from './SubmissionError';
import { srcollToFirstError } from './utils';

const handleSubmit = (submit, zentForm) => {
  const props = zentForm.props;
  const values = zentForm.getFormValues();
  const { onSubmitSuccess, onSubmitFail, scrollToError } = props;
  let validationErrors;

  zentForm.setFormDirty(true);

  const handleOnSubmitError = error => {
    zentForm.updateFormSubmitStatus(false);
    onSubmitFail(error);
  };

  const handleOnSubmitSuccess = result => {
    zentForm.updateFormSubmitStatus(true);
    onSubmitSuccess(result);
  };

  // 如果有异步校验未完成，阻止表单提交
  if (zentForm.isValidating()) {
    if (onSubmitFail) {
      handleOnSubmitError(
        new SubmissionError({
          isValidating: true
        })
      );
    }
    return;
  }

  const handleSubmitError = submitError => {
    // 只处理SubmissionError类型的错误
    const error =
      submitError instanceof SubmissionError ? submitError.errors : undefined;
    if (onSubmitFail) {
      handleOnSubmitError(error);
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
            handleOnSubmitSuccess(submitResult);
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
      handleOnSubmitSuccess(result);
    }
    return result;
  };

  const afterValidation = () => {
    if (!zentForm.isValid()) {
      // 存在校验错误
      validationErrors = zentForm.getValidationErrors();

      // 滚动到第一个错误处
      scrollToError && srcollToFirstError(zentForm.fields);

      if (onSubmitFail) {
        handleOnSubmitError(new SubmissionError(validationErrors));
      }
    } else if (!zentForm.isFormAsyncValidated()) {
      // 存在没有进行过的异步校验
      zentForm.asyncValidateForm(
        () => {
          return doSubmit();
        },
        error => {
          if (onSubmitFail) {
            handleOnSubmitError(new SubmissionError(error));
          }
        }
      );
    } else {
      return doSubmit();
    }
  };

  const allIsValidated = zentForm.fields.every(field => {
    return field.props.validateOnChange || field.props.validateOnBlur;
  });

  if (allIsValidated) {
    // 不存在没有进行过同步校验的field
    afterValidation();
  } else {
    zentForm.validateForm(true, afterValidation);
  }
};

export default handleSubmit;
