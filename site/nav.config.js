module.exports = {
  'zh-CN': [
    {
      name: '开发指南',
      groups: [
        {
          list: [
            {
              path: '/alert',
              title: 'Alert 公告',
              filePath() {
                return System.import('../packages/zent-alert/README.md')
              }
            },
            {
              path: '/icon',
              title: 'Icon 图标',
              filePath() {
                return System.import('../packages/zent-icon/README.md')
              }
            },
            {
              path: '/pop',
              title: 'Pop 气泡提示',
              filePath() {
                return System.import('../packages/zent-pop/README.md')
              }
            },
            {
              path: '/pagination',
              title: 'Pagination 分页',
              filePath() {
                return System.import('../packages/zent-pagination/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
