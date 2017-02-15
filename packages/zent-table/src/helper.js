const helper = {
  getCalculatedWidth(width) {
    let res;
    if (typeof width === 'number') {
      res = `${width}%`;
    } else if (typeof width === 'string') {
      res = width;
    }

    return res;
  }
};

export default helper;
