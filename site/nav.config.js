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
              path: '/button',
              title: 'button',
              filePath() {
                return System.import('./docs/test.md');
              }
            }
          ]
        }
      ]
    }
  ]
};
