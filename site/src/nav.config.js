module.exports = {
  'zh-CN': [
    {
      title: '快速上手',
      path: '/',
      filePath() {
        return System.import('../../packages/zent/README.md')
      }
    },
    {
      title: '更新日志',
      path: '/changelog',
      filePath() {
        return System.import('../../packages/zent/CHANGELOG.md')
      }
    },
    {
      name: 'Components 组件',
      groups: [
        {
          groupName: '基础',
          list: [
            {
              path: '/layout',
              title: 'Layout 布局',
              filePath() {
                return System.import('../../packages/zent-layout/README.md')
              }
            }, {
              path: '/icon',
              title: 'Icon 图标',
              filePath() {
                return System.import('../../packages/zent-icon/README.md')
              }
            }
          ]
        },
        {
          groupName: '展示',
          list: [
            {
              path: '/alert',
              title: 'Alert 公告',
              filePath() {
                return System.import('../../packages/zent-alert/README.md');
              }
            },
            {
              path: '/dialog',
              title: 'Dialog 对话框',
              filePath() {
                return System.import('../../packages/zent-dialog/README.md');
              }
            },
            {
              path: '/loading',
              title: 'Loading 等待',
              filePath() {
                return System.import('../../packages/zent-loading/README.md');
              }
            },
            {
              path: '/notify',
              title: 'Notify 通知',
              filePath() {
                return System.import('../../packages/zent-notify/README.md');
              }
            },
            {
              path: '/pop',
              title: 'Pop 气泡提示',
              filePath() {
                return System.import('../../packages/zent-pop/README.md')
              }
            },
            {
              path: '/sweet-alert',
              title: 'SweetAlert',
              filePath() {
                return System.import('../../packages/zent-sweetalert/README.md');
              }
            }
          ]
        },
        {
          groupName: '数据',
          list: [
            {
              path: '/button',
              title: 'Button 按钮',
              filePath() {
                return System.import('../../packages/zent-button/README.md')
              }
            },
            {
              path: '/checkbox',
              title: 'Checkbox 多选',
              filePath() {
                return System.import('../../packages/zent-checkbox/README.md')
              }
            },
            {
              path: '/datepicker',
              title: 'DatePicker 时间选择',
              filePath() {
                return System.import('../../packages/zent-datetimepicker/README.md')
              }
            },
            {
              path: '/form',
              title: 'Form 表单',
              filePath() {
                return System.import('../../packages/zent-form/README.md')
              }
            },
            {
              path: '/input',
              title: 'Input 输入框',
              filePath() {
                return System.import('../../packages/zent-input/README.md')
              }
            },
            {
              path: '/radio',
              title: 'Radio 单选',
              filePath() {
                return System.import('../../packages/zent-radio/README.md')
              }
            },
            {
              path: '/select',
              title: 'Select 选项',
              filePath() {
                return System.import('../../packages/zent-select/README.md')
              }
            },
            {
              path: '/switch',
              title: 'Switch 开关',
              filePath() {
                return System.import('../../packages/zent-switch/README.md');
              }
            },
          ]
        },
        {
          groupName: '导航',
          list: [
            {
              path: '/breadcrumb',
              title: 'Breadcrumb 面包屑',
              filePath() {
                return System.import('../../packages/zent-breadcrumb/README.md');
              }
            },
            {
              path: '/menu',
              title: 'Menu 菜单',
              filePath() {
                return System.import('../../packages/zent-menu/README.md');
              }
            },
            {
              path: '/pagination',
              title: 'Pagination 分页',
              filePath() {
                return System.import('../../packages/zent-pagination/README.md')
              }
            }, {
              path: '/steps',
              title: 'Steps 步骤条',
              filePath() {
                return System.import('../../packages/zent-steps/README.md')
              }
            },
           {
              path: '/table',
              title: 'Table 表格',
              filePath() {
                return System.import('../../packages/zent-table/README.md')
              }
            },
            {
              path: '/tabs',
              title: 'Tabs 选项卡',
              filePath() {
                return System.import('../../packages/zent-tabs/README.md')
              }
            },
            {
              path: '/tree',
              title: 'Tree 树',
              filePath() {
                return System.import('../../packages/zent-tree/README.md')
              }
            }
          ]
        },
        {
          groupName: '其他',
          list: [
            {
              path: '/popover',
              title: 'Popover 弹层',
              filePath() {
                return System.import('../../packages/zent-popover/README.md');
              }
            },
            {
              path: '/portal',
              title: 'Portal 传送门',
              filePath() {
                return System.import('../../packages/zent-portal/README.md')
              }
            }
          ]
        }
      ]
    }
  ]
};
