import isFunction from 'lodash/isFunction';

export default function uploadLocalImage(options, uploadConfig) {
  return new Promise((resolve, reject) => {
    const { onUpload } = options;

    if (!isFunction(onUpload)) {
      return reject('onUpload is not a function');
    }

    onUpload(uploadConfig.localFiles || [], uploadConfig);
    resolve();
  });
}
