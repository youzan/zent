import isPromise from '../utils/isPromise';
import SubmissionError, { isSubmissionError } from './SubmissionError';
import { scrollToFirstError } from './utils';

const handleSubmit = (submit, zentForm) => {
  const props = zentForm.props;
  const values = zentForm.getFormValues();
  const { onSubmitSuccess, onSubmitFail, scrollToError } = props;
  let validationErrors;

  zentForm.setFormDirty(true);

  const handleOnSubmitError = error => {
    zentForm.updateFormSubmitStatus(false);
    onSubmitFail && onSubmitFail(error);
  };

  const handleOnSubmitSuccess = result => {
    zentForm.updateFormSubmitStatus(true);
    onSubmitSuccess && onSubmitSuccess(result);
  };

  // 如果有异步校验未完成，阻止表单提交
  if (zentForm.isValidating()) {
    return handleOnSubmitError(new SubmissionError('Submit abort: validating'));
  }

  const handleSubmitError = submitError => {
    handleOnSubmitError(submitError);

    // SubmissionError 类型的错误内部处理，其他类型的错误需要重新抛出
    if (!isSubmissionError(submitError) && !onSubmitFail) {
      throw submitError;
    }

    return submitError;
  };

  const doSubmit = () => {
    let result;
    try {
      // 传入zentForm是为了使用服务端校验时可以调用setFieldExternalErrors方法
      result = submit(values, zentForm);
    } catch (submitError) {
      return handleSubmitError(submitError);
    }

    if (isPromise(result)) {
      zentForm.setState({
        isSubmitting: true,
      });

      return result.then(
        submitResult => {
          zentForm.setState({
            isSubmitting: false,
          });
          handleOnSubmitSuccess(submitResult);
          return submitResult;
        },
        submitError => {
          zentForm.setState({
            isSubmitting: false,
          });
          return handleSubmitError(submitError);
        }
      );
    }

    // submit是一个同步过程，直接当成功处理
    handleOnSubmitSuccess(result);
    return result;
  };

  const afterValidation = () => {
    if (!zentForm.isValid()) {
      // 存在校验错误
      validationErrors = zentForm.getValidationErrors();

      // 滚动到第一个错误处
      scrollToError && scrollToFirstError(zentForm.fields);

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
