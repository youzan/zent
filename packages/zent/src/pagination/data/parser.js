// 是否显示省略号的界线
const OMINIBOUNDARY = 5;
// 是否显示多个邻居的界线
const parser = {
  getPrev(conf) {
    return {
      content: '❮',
      target: conf.current === 1 ? null : conf.current - 1,
    };
  },

  getNext(conf) {
    return {
      content: '❯',
      target: conf.current === conf.total ? null : conf.current + 1,
    };
  },

  /**
   * @param type {String} ['prev', 'post']
   */
  getOmni(conf, type) {
    let hasResult = false;
    let count = 3;
    let boundary = Math.floor(count / 2);

    // 只有当总数大于
    if (conf.total > OMINIBOUNDARY) {
      if (type === 'prev') {
        hasResult = conf.current - boundary > 2;
      } else {
        hasResult = conf.current + boundary < conf.total - 1;
      }
    }

    return hasResult ? { content: '...', type: 'omni' } : null;
  },

  /**
   * @param index {Number}
   */
  getNumber(conf, index) {
    let res;

    res = {
      content: `${index} `,
      target: index,
    };

    if (conf.current === index) {
      res.current = true;
    }

    return res;
  },

  /**
   * @param
   */
  getJump(conf) {
    if (conf.total > OMINIBOUNDARY) {
      return {
        content: `${conf.current} `,
        total: conf.total,
        type: 'input',
      };
    }
    return null;
  },

  /**
   * 获取分页的完整数据支持
   * @param conf {Object} 分页需要的对象
   * @return pages {Array} 分页数据的数组
   */
  getPages(conf) {
    let pages = [];
    // 如果是10页以上，展示4个邻居，否则2个邻居
    let count = 3;
    let boundary = Math.floor(count / 2);
    let min;
    let max;
    let start = 0;
    let end;

    pages.push(this.getPrev(conf));
    pages.push(this.getNumber(conf, 1));
    pages.push(this.getOmni(conf, 'prev'));

    /**
     * START FOR
     * 循环遍历输出当前页及前后页
     */
    // 如果页数在5个以内，则全部显示
    if (conf.total <= OMINIBOUNDARY) {
      min = 1;
      max = conf.total;
      // 否则显示省略号和部分页数
    } else {
      min = Math.max(1, conf.current - boundary);
      max = Math.min(conf.current + boundary, conf.total);

      if (conf.current <= boundary) {
        min = 1;
        max = count;
      } else if (conf.current > conf.total - boundary) {
        min = conf.total - count + 1;
        max = conf.total;
      }
    }

    start = min;
    end = max;

    while (start <= end) {
      if (start > 1 && start < conf.total) {
        pages.push(this.getNumber(conf, start));
      }
      start++;
    }
    /**
     * END FOR
     * 循环遍历输出当前页及前后页
     */

    pages.push(this.getOmni(conf, 'post'));

    // 当最大页大于1时，才创建最大页
    if (conf.total > 1) {
      pages.push(this.getNumber(conf, conf.total));
    }

    pages.push(this.getNext(conf));
    pages.push(this.getJump(conf));

    return pages;
  },
};

export default parser;
