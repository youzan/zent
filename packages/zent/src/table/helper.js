const helper = {
  getCalculatedWidth(width) {
    let res;
    if (typeof width === 'number') {
      res = `${width}%`;
    } else if (typeof width === 'string') {
      res = width;
    }

    return res;
  },

  getAlignStyle(textAlign) {
    let alignObj = {};

    if (textAlign) {
      let alignValue;
      switch (textAlign) {
        case 'left':
          alignValue = 'flex-start';
          break;
        case 'right':
          alignValue = 'flex-end';
          break;
        case 'center':
          alignValue = 'center';
          break;
        default:
          alignValue = 'flex-start';
      }
      alignObj = {
        justifyContent: alignValue
      };
    }

    return alignObj;
  }
};

export default helper;
