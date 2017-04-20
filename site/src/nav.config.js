module.exports = {
  'zh-CN': [
    {
      name: '开发指南',
      groups: [
        {
          list: [
            {
              title: '快速上手',
              path: 'guides/install',
              component: require('../../packages/zent/README.md')
            },
            {
              title: '更新日志',
              path: 'guides/changelog',
              component: require('../../packages/zent/CHANGELOG.md')
            }
          ]
        }
      ]
    },

    {
      name: 'Components 组件',
      groups: [
        {
          groupName: '基础',
          list: [
            {
              path: 'component/layout',
              title: 'Layout 布局',
              component: require('../../packages/zent-layout/README.md')
            },
            {
              path: 'component/icon',
              title: 'Icon 图标',
              component: require('../../packages/zent-icon/README.md')
            }
          ]
        },
        {
          groupName: '展示',
          list: [
            {
              path: 'component/alert',
              title: 'Alert 公告',
              component: require('../../packages/zent-alert/README.md')
            },
            {
              path: 'component/dialog',
              title: 'Dialog 对话框',
              component: require('../../packages/zent-dialog/README.md')
            },
            {
              path: 'component/loading',
              title: 'Loading 等待',
              component: require('../../packages/zent-loading/README.md')
            },
            {
              path: 'component/notify',
              title: 'Notify 通知',
              component: require('../../packages/zent-notify/README.md')
            },
            {
              path: 'component/pop',
              title: 'Pop 气泡提示',
              component: require('../../packages/zent-pop/README.md')
            },
            {
              path: 'component/sweet-alert',
              title: 'SweetAlert',
              component: require('../../packages/zent-sweetalert/README.md')
            }
          ]
        },
        {
          groupName: '数据',
          list: [
            {
              path: 'component/button',
              title: 'Button 按钮',
              component: require('../../packages/zent-button/README.md')
            },
            {
              path: 'component/checkbox',
              title: 'Checkbox 多选',
              component: require('../../packages/zent-checkbox/README.md')
            },
            {
              path: 'component/datepicker',
              title: 'DatePicker 时间选择',
              component: require('../../packages/zent-datetimepicker/README.md')
            },
            {
              path: 'component/form',
              title: 'Form 表单',
              component: require('../../packages/zent-form/README.md')
            },
            {
              path: 'component/input',
              title: 'Input 输入框',
              component: require('../../packages/zent-input/README.md')
            },
            {
              path: 'component/radio',
              title: 'Radio 单选',
              component: require('../../packages/zent-radio/README.md')
            },
            {
              path: 'component/select',
              title: 'Select 选项',
              component: require('../../packages/zent-select/README.md')
            },
            {
              path: 'component/switch',
              title: 'Switch 开关',
              component: require('../../packages/zent-switch/README.md')
            }
          ]
        },
        {
          groupName: '导航',
          list: [
            {
              path: 'component/breadcrumb',
              title: 'Breadcrumb 面包屑',
              component: require('../../packages/zent-breadcrumb/README.md')
            },
            {
              path: 'component/menu',
              title: 'Menu 菜单',
              component: require('../../packages/zent-menu/README.md')
            },
            {
              path: 'component/dropdown',
              title: 'Dropdown 下拉菜单',
              component: require('../../packages/zent-popover/Dropdown.md')
            },
            {
              path: 'component/pagination',
              title: 'Pagination 分页',
              component: require('../../packages/zent-pagination/README.md')
            },
            {
              path: 'component/steps',
              title: 'Steps 步骤条',
              component: require('../../packages/zent-steps/README.md')
            },
            {
              path: 'component/table',
              title: 'Table 表格',
              component: require('../../packages/zent-table/README.md')
            },
            {
              path: 'component/tabs',
              title: 'Tabs 选项卡',
              component: require('../../packages/zent-tabs/README.md')
            },
            {
              path: 'component/tree',
              title: 'Tree 树',
              component: require('../../packages/zent-tree/README.md')
            }
          ]
        },
        {
          groupName: '其他',
          list: [
            {
              path: 'component/popover',
              title: 'Popover 弹层',
              component: require('../../packages/zent-popover/README.md')
            },
            {
              path: 'component/portal',
              title: 'Portal 传送门',
              component: require('../../packages/zent-portal/README.md')
            }
          ]
        }
      ]
    }
  ]
};
