import Notify from 'notify';
import { formatMaxSize, isPromiseLike } from '../utils';

let localFiles = [];

const addFile = file => {
  let fileReader = new FileReader();

  fileReader.onload = e => {
    localFiles.push({
      src: e.target.result,
      file
    });
  };

  fileReader.readAsDataURL(file);
};

const ArrayForEach = Array.prototype.forEach;
const iteratorFiles = (options, files) => {
  let { maxSize } = options;

  ArrayForEach.call(files, file => {
    if (!maxSize || file.size <= maxSize) {
      addFile(file);
    } else {
      !options.silent && Notify.error(`已经自动过滤大于${formatMaxSize(maxSize)}的图片文件`);
    }
  });
};

const arraySlice = Array.prototype.slice;
export default function uploadLocalImage(options, e) {
  return new Promise((resolve, reject) => {
    localFiles = [];
    if (e.target) {
      let files = arraySlice.call(e.target.files);
      let filterResult = options.filterFiles(files);

      // 清除input的值，否则无法重复选择同一个文件
      e.target.value = null;

      if (isPromiseLike(filterResult)) {
        filterResult.then(iteratorFiles.bind(null, options), options.onError);
      } else {
        files = filterResult;
        iteratorFiles(options, files);
      }
    } else if (e.localFiles) {
      localFiles = e.localFiles;
    }

    if (typeof options.onUpload !== 'function') return false;

    options
      .onUpload(localFiles)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}
