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
                path: '/datepicker',
                title: 'Datepicker 日期选择',
                filePath() {
                    return System.import('../packages/zent-datetimepicker/README.md')
                }
            }
          ]
        }
      ]
    }
  ]
};
