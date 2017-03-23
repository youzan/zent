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
            }, {
              path: '/form',
              title: 'Form 表单组件',
              filePath() {
                return System.import('../packages/zent-form/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
