const navUtil = {
  // 获取宽高
  getOffsetWH(node) {
    return node.offsetWidth;
  },

  // 获取偏移量
  getOffsetLT(node) {
    const bb = node.getBoundingClientRect();
    return bb.left;
  },

  modifyTabListData(props) {
    const widthInfo = this.getWidth(props);
    const { tabListData, candel } = props;
    const modifiedTabListData = [];
    let modifiedTabInfo;
    tabListData.forEach((tabItem, i) => {
      modifiedTabInfo = {
        key: tabItem.key,
        actived: tabItem.actived,
        disabled: tabItem.disabled,
        title: tabItem.title,
        prefix: tabItem.prefix,
        className: tabItem.tabClassName,
        minWidth:
          i === tabListData.length - 1
            ? widthInfo.lastWidth || ''
            : widthInfo.width || '',
        candel: candel && !tabItem.disabled,
      };
      modifiedTabListData.push(modifiedTabInfo);
    });

    return modifiedTabListData;
  },

  getWidth(props) {
    // 当 align 为 center 时做处理
    const { align, tabListData } = props;

    if (align === 'center') {
      let width = '';
      let lastWidth = '';
      const childCount = tabListData.length;
      width = `${(1 / childCount) * 100}%`;
      lastWidth = `${(1 - (1 / childCount) * (childCount - 1)) * 100}%`;
      return {
        width,
        lastWidth,
      };
    }

    return {};
  },
};

export default navUtil;
