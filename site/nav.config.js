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
                return System.import('../packages/zent-alert/README.md');
              }
            },
            {
              path: '/notify',
              title: 'Notify 通知',
              filePath() {
                return System.import('../packages/zent-notify/README.md');
              }
            },
            {
              path: '/switch',
              title: 'Switch 开关',
              filePath() {
                return System.import('../packages/zent-switch/README.md');
              }
            }
          ]
        }
      ]
    }
  ]
};
