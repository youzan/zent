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
              path: '/breadcrumb',
              title: 'Breadcrumb 面包屑',
              filePath() {
                return System.import('../packages/zent-breadcrumb/README.md');
              }
            },
            {
              path: '/loading',
              title: 'Loading 等待',
              filePath() {
                return System.import('../packages/zent-loading/README.md');
              }
            },
            {
              path: '/menu',
              title: 'Menu 菜单',
              filePath() {
                return System.import('../packages/zent-menu/README.md');
              }
            },
            {
              path: '/dialog',
              title: 'Dialog 对话框',
              filePath() {
                return System.import('../packages/zent-dialog/README.md');
              }
            },
            {
              path: '/sweet-alert',
              title: 'SweetAlert',
              filePath() {
                return System.import('../packages/zent-sweetalert/README.md');
              }
            },
          ]
        }
      ]
    }
  ]
};
