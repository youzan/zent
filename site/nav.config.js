module.exports = {
  'zh-CN': [
    {
      name: '开发指南',
      groups: [
        {
          list: [
            {
              path: '/test',
              title: 'test',
              filePath() {
                return System.import('./docs/test.md');
              }
            },
            {
              path: '/alert',
              title: 'Alert 公告',
              filePath() {
                return System.import('../packages/zent-alert/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
