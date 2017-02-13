const helper = {
  getCalculatedWidth(width) {
    if (width) {
      width = `${width}`;
      if (!(/px$|%$/.test(width))) {
        width += '%';
      }
    } else {
      width = null;
    }

    return width;
  }
};

export default helper;
