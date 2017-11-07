/* eslint-disable global-require */

module.exports = {
  'zh-CN': [
    {
      name: '指南',
      groups: [
        {
          groupName: '使用',
          list: [
            {
              title: '快速上手',
              path: 'guides/install',
              component: require('../../packages/zent/README.md')
            },
            {
              title: '项目示例',
              path: 'guides/demos',
              component: require('../../packages/zent/docs/demo.md')
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              component: require('../../packages/babel-plugin-zent/README.md')
            }
          ]
        },
        {
          groupName: '主题',
          list: [
            {
              title: '色彩',
              path: 'guides/colors',
              component: require('../src/pages/colors').default
            },
            {
              title: '定制主题',
              path: 'guides/theme',
              component: require('../../packages/zent/docs/theme.md')
            }
          ]
        },
        {
          groupName: '升级',
          list: [
            {
              title: '更新日志',
              path: 'guides/changelog',
              component: require('../../packages/zent/RELEASE.md')
            },
            {
              title: 'Github 日志',
              path: 'guides/github_changelog',
              component: require('../../packages/zent/CHANGELOG.md')
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              component: require('../../packages/zent/docs/migrating-2-3.md')
            },
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              component: require('../../packages/zent/docs/migrating-2.1.md')
            }
          ]
        },
        {
          groupName: '开发',
          list: [
            {
              title: '如何参与',
              path: 'guides/contribute',
              component: require('../../packages/zent/docs/CONTRIBUTING.md')
            },
            {
              title: '文档规范',
              path: 'guides/markdown',
              component: require('../../packages/zent/docs/MARKDOWN.md')
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
              title: 'Layout',
              subtitle: '布局',
              component: require('../../packages/zent/src/layout/README.md')
            },
            {
              path: 'component/icon',
              title: 'Icon 图标',
              component: require('../../packages/zent/src/icon/README.md')
            }
          ]
        },
        {
          groupName: '展示',
          list: [
            {
              path: 'component/alert',
              title: 'Alert',
              subtitle: '公告',
              component: require('../../packages/zent/src/alert/README.md')
            },
            {
              path: 'component/badge',
              title: 'Badge',
              subtitle: '徽标数',
              component: require('../../packages/zent/src/badge/README.md')
            },
            {
              path: 'component/block-header',
              title: 'BlockHeader',
              subtitle: '块标题',
              component: require('../../packages/zent/src/block-header/README.md')
            },
            {
              path: 'component/card',
              title: 'Card',
              subtitle: '卡片',
              component: require('../../packages/zent/src/card/README.md')
            },
            {
              path: 'component/dialog',
              title: 'Dialog',
              subtitle: '对话框',
              component: require('../../packages/zent/src/dialog/README.md')
            },
            {
              path: 'component/loading',
              title: 'Loading',
              subtitle: '等待',
              component: require('../../packages/zent/src/loading/README.md')
            },
            {
              path: 'component/notify',
              title: 'Notify',
              subtitle: '通知',
              component: require('../../packages/zent/src/notify/README.md')
            },
            {
              path: 'component/pop',
              title: 'Pop',
              subtitle: '气泡提示',
              component: require('../../packages/zent/src/pop/README.md')
            },
            {
              path: 'component/preview-image',
              title: 'previewImage',
              subtitle: '图片预览',
              component: require('../../packages/zent/src/preview-image/README.md')
            },
            {
              path: 'component/progress',
              title: 'Progress',
              subtitle: '进度条',
              component: require('../../packages/zent/src/progress/README.md')
            },
            {
              path: 'component/sweet-alert',
              title: 'Sweetalert',
              subtitle: '快捷对话框',
              component: require('../../packages/zent/src/sweetalert/README.md')
            },
            {
              path: 'component/swiper',
              title: 'Swiper',
              subtitle: '轮播',
              component: require('../../packages/zent/src/swiper/README.md')
            },
            {
              path: 'component/tag',
              title: 'Tag',
              subtitle: '标签',
              component: require('../../packages/zent/src/tag/README.md')
            }
          ]
        },
        {
          groupName: '数据',
          list: [
            {
              path: 'component/button',
              title: 'Button',
              subtitle: '按钮',
              component: require('../../packages/zent/src/button/README.md')
            },
            {
              path: 'component/cascader',
              title: 'Cascader',
              subtitle: '级联选择',
              component: require('../../packages/zent/src/cascader/README.md')
            },
            {
              path: 'component/checkbox',
              title: 'Checkbox',
              subtitle: '多选',
              component: require('../../packages/zent/src/checkbox/README.md')
            },
            {
              path: 'component/colorpicker',
              title: 'ColorPicker',
              subtitle: '颜色选择器',
              component: require('../../packages/zent/src/colorpicker/README.md')
            },
            {
              path: 'component/copy-btn',
              title: 'CopyButton',
              subtitle: '复制按钮',
              component: require('../../packages/zent/src/copy-button/README.md')
            },
            {
              path: 'component/datepicker',
              title: 'DatePicker',
              subtitle: '时间选择',
              component: require('../../packages/zent/src/datetimepicker/README.md')
            },
            {
              path: 'component/date-range-quick-picker',
              title: 'DateRangeQuickPicker',
              component: require('../../packages/zent/src/date-range-quick-picker/README.md')
            },
            {
              path: 'component/design',
              title: 'Design',
              subtitle: '微页面编辑',
              component: require('../../packages/zent/src/design/README.md')
            },
            {
              path: 'component/form',
              title: 'Form',
              subtitle: '表单',
              component: require('../../packages/zent/src/form/README.md')
            },
            {
              path: 'component/input',
              title: 'Input',
              subtitle: '输入框',
              component: require('../../packages/zent/src/input/README.md')
            },
            {
              path: 'component/number-input',
              title: 'NumberInput',
              subtitle: '数值输入框',
              component: require('../../packages/zent/src/number-input/README.md')
            },
            {
              path: 'component/radio',
              title: 'Radio',
              subtitle: '单选',
              component: require('../../packages/zent/src/radio/README.md')
            },
            {
              path: 'component/search-input',
              title: 'SearchInput',
              subtitle: '搜索框',
              component: require('../../packages/zent/src/search-input/README.md')
            },
            {
              path: 'component/select',
              title: 'Select',
              subtitle: '下拉选择',
              component: require('../../packages/zent/src/select/README.md')
            },
            {
              path: 'component/sku',
              title: 'SKU',
              subtitle: '规格选择器',
              component: require('../../packages/zent/src/sku/README.md')
            },
            {
              path: 'component/slider',
              title: 'Slider',
              subtitle: '滑动输入条',
              component: require('../../packages/zent/src/slider/README.md')
            },
            {
              path: 'component/switch',
              title: 'Switch',
              subtitle: '开关',
              component: require('../../packages/zent/src/switch/README.md')
            },
            {
              path: 'component/upload',
              title: 'Upload',
              subtitle: '图片上传',
              component: require('../../packages/zent/src/upload/README.md')
            }
          ]
        },
        {
          groupName: '导航',
          list: [
            {
              path: 'component/affix',
              title: 'Affix',
              subtitle: '固钉',
              component: require('../../packages/zent/src/affix/README.md')
            },
            {
              path: 'component/breadcrumb',
              title: 'Breadcrumb',
              subtitle: '面包屑',
              component: require('../../packages/zent/src/breadcrumb/README.md')
            },
            {
              path: 'component/dropdown',
              title: 'Dropdown',
              subtitle: '下拉菜单',
              component: require('../../packages/zent/src/popover/Dropdown.md')
            },
            {
              path: 'component/grid',
              title: 'Grid',
              subtitle: '网格',
              component: require('../../packages/zent/src/grid/README.md')
            },
            {
              path: 'component/menu',
              title: 'Menu',
              subtitle: '菜单',
              component: require('../../packages/zent/src/menu/README.md')
            },
            {
              path: 'component/pagination',
              title: 'Pagination',
              subtitle: '分页',
              component: require('../../packages/zent/src/pagination/README.md')
            },
            {
              path: 'component/steps',
              title: 'Steps',
              subtitle: '步骤条',
              component: require('../../packages/zent/src/steps/README.md')
            },
            {
              path: 'component/table',
              title: 'Table',
              subtitle: '表格',
              component: require('../../packages/zent/src/table/README.md')
            },
            {
              path: 'component/tabs',
              title: 'Tabs',
              subtitle: '选项卡',
              component: require('../../packages/zent/src/tabs/README.md')
            },
            {
              path: 'component/tree',
              title: 'Tree',
              subtitle: '树',
              component: require('../../packages/zent/src/tree/README.md')
            }
          ]
        },
        {
          groupName: '其他',
          list: [
            {
              path: 'component/popover',
              title: 'Popover',
              subtitle: '弹层',
              component: require('../../packages/zent/src/popover/README.md')
            },
            {
              path: 'component/portal',
              title: 'Portal',
              subtitle: '传送门',
              component: require('../../packages/zent/src/portal/README.md')
            },
            {
              path: 'component/InfiniteScroller',
              title: 'InfiniteScroller',
              subtitle: '无限滚动',
              component: require('../../packages/zent/src/infinite-scroller/README.md')
            }
          ]
        }
      ]
    }
  ]
};
