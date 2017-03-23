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
              path: '/button',
              title: 'Button 按钮',
              filePath() {
                return System.import('../packages/zent-button/README.md')
              }
            },
            {
              path: '/checkbox',
              title: 'Checkbox 多选',
              filePath() {
                return System.import('../packages/zent-checkbox/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
