import intersection from 'lodash-es/intersection';

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

  isReactComponent(render) {
    let isReact = false;

    if (typeof render === 'function') {
      if (render.prototype && render.prototype.isReactComponent) {
        isReact = true;
      }
    }

    return isReact;
  },

  getAlignClass(textAlign) {
    let alignValue = '';

    if (textAlign) {
      switch (textAlign) {
        case 'left':
          alignValue = 'start';
          break;
        case 'right':
          alignValue = 'end';
          break;
        case 'center':
          alignValue = 'center';
          break;
        default:
          alignValue = 'start';
      }
    }

    return alignValue;
  },

  // return true/false/null
  needFixBatchComps(isTableInView, isFootInView, isSelectRows, isFixed) {
    let res = null;
    if (isTableInView && !isFootInView && isSelectRows) {
      if (!isFixed) {
        res = true;
      }
    } else if (isFixed) {
      res = false;
    }

    return res;
  },

  /**
   * 是否选中全部
   * @param {array} rowKeys
   * @param {array} subRowKeys
   * @return {boolean} isSelectAll
   */
  isSelectAll(rowKeys, subRowKeys) {
    return intersection(rowKeys, subRowKeys).length === subRowKeys.length;
  },

  /**
   * 是否选中了部分
   * @param {array} rowKeys
   * @param {array} subRowKeys
   * @return {boolean} 是否选中了部分
   */
  isSelectPart(rowKeys, subRowKeys) {
    return intersection(rowKeys, subRowKeys).length > 0;
  },

  /**
   * 切换是否监听事件
   */
  toggleEventListener(currentProps, nextProps) {
    let toggleEventListener;
    if (
      nextProps.batchComponentsAutoFixed !==
      currentProps.batchComponentsAutoFixed
    ) {
      if (nextProps.batchComponentsAutoFixed) {
        toggleEventListener = 'addEventListener';
      } else {
        toggleEventListener = 'removeEventListener';
      }
    }

    return toggleEventListener;
  },
};

export default helper;
