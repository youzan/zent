export default function uploadLocalImage(options, e) {
  return new Promise(resolve => {
    let localFiles = [];
    if (e.localFiles) {
      localFiles = e.localFiles;
    }

    if (typeof options.onUpload !== 'function') return false;

    options.onUpload(localFiles);
    resolve();
  });
}
