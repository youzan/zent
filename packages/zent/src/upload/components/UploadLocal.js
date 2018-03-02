import isFunction from 'lodash/isFunction';
import isPromise from 'utils/isPromise';

export default function uploadLocalImage(options, uploadConfig) {
  return new Promise((resolve, reject) => {
    const { onUpload } = options;

    if (!isFunction(onUpload)) {
      return reject('onUpload is not a function');
    }

    let uploadCallback = onUpload(uploadConfig.localFiles || [], uploadConfig);
    if (isPromise(uploadCallback)) {
      uploadCallback.then(resolve).catch(reject);
    } else {
      resolve();
    }
  });
}
