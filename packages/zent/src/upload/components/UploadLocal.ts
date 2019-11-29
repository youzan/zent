import isPromise from '../../utils/isPromise';

export default function uploadLocalImage(options, uploadConfig) {
  return new Promise((resolve, reject) => {
    const { onUpload } = options;

    if (typeof onUpload !== 'function') {
      return reject('onUpload is not a function');
    }

    const uploadCallback = onUpload(
      uploadConfig.localFiles || [],
      uploadConfig
    );
    if (isPromise(uploadCallback)) {
      uploadCallback.then(resolve).catch(reject);
    } else {
      resolve();
    }
  });
}
