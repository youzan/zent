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
              path: '/select',
              title: 'Select 选项',
              filePath() {
                return System.import('../packages/zent-select/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
