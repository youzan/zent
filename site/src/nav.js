import DocLoadable from './components/Loadable';

export default {
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
              source: DocLoadable({
                loader: () => import('../../packages/zent/README_zh-CN.md')
              })
            },
            {
              title: '项目示例',
              path: 'guides/demos',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/DEMO_zh-CN.md')
              })
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/babel-plugin-zent/README_zh-CN.md')
              })
            }
          ]
        },
        {
          groupName: '主题',
          list: [
            {
              title: '定制主题',
              path: 'guides/theme',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/THEME_zh-CN.md')
              })
            }
          ]
        },
        {
          groupName: '升级',
          list: [
            {
              title: '更新日志',
              path: 'guides/changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/RELEASE_zh-CN.md')
              })
            },
            {
              title: 'Github 日志',
              path: 'guides/github_changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/CHANGELOG_zh-CN.md')
              })
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2-3_zh-CN.md')
              })
            },
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2.1_zh-CN.md')
              })
            }
          ]
        },
        {
          groupName: '开发',
          list: [
            {
              title: '如何参与',
              path: 'guides/contribute',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/CONTRIBUTING_zh-CN.md')
              })
            },
            {
              title: '文档规范',
              path: 'guides/markdown',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/MARKDOWN_zh-CN.md')
              })
            }
          ]
        }
      ]
    },
    {
      name: 'Components 组件',
      groups: [
        {
          groupName: '导航',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/affix/README_zh-CN.md')
              }),
              title: 'Affix',
              subtitle: '固钉',
              path: 'component/affix'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/breadcrumb/README_zh-CN.md')
              }),
              title: 'Breadcrumb',
              subtitle: '面包屑',
              path: 'component/breadcrumb'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/dropdown/README_zh-CN.md')
              }),
              title: 'Dropdown',
              subtitle: '下拉菜单',
              path: 'component/dropdown'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/grid/README_zh-CN.md')
              }),
              title: 'Grid',
              subtitle: '网格',
              path: 'component/grid'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/menu/README_zh-CN.md')
              }),
              title: 'Menu',
              subtitle: '菜单',
              path: 'component/menu'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/pagination/README_zh-CN.md')
              }),
              title: 'Pagination',
              subtitle: '分页',
              path: 'component/pagination'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/steps/README_zh-CN.md')
              }),
              title: 'Steps',
              subtitle: '步骤条',
              path: 'component/steps'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/table/README_zh-CN.md')
              }),
              title: 'Table',
              subtitle: '表格',
              path: 'component/table'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tabs/README_zh-CN.md')
              }),
              title: 'Tabs',
              subtitle: '选项卡',
              path: 'component/tabs'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tree/README_zh-CN.md')
              }),
              title: 'Tree',
              subtitle: '树',
              path: 'component/tree'
            }
          ]
        },
        {
          groupName: '展示',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/alert/README_zh-CN.md')
              }),
              title: 'Alert',
              subtitle: '公告',
              path: 'component/alert'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/badge/README_zh-CN.md')
              }),
              title: 'Badge',
              subtitle: '徽标数',
              path: 'component/badge'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/block-header/README_zh-CN.md')
              }),
              title: 'BlockHeader',
              subtitle: '标题',
              path: 'component/block-header'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/card/README_zh-CN.md')
              }),
              title: 'Card',
              subtitle: '卡片',
              path: 'component/card'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/dialog/README_zh-CN.md')
              }),
              title: 'Dialog',
              subtitle: '对话框',
              path: 'component/dialog'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/loading/README_zh-CN.md')
              }),
              title: 'Loading',
              subtitle: '等待',
              path: 'component/loading'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/notify/README_zh-CN.md')
              }),
              title: 'Notify',
              subtitle: '消息通知',
              path: 'component/notify'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/pop/README_zh-CN.md')
              }),
              title: 'Pop',
              subtitle: '气泡提示',
              path: 'component/pop'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/preview-image/README_zh-CN.md')
              }),
              title: 'PreviewImage',
              subtitle: '图片预览',
              path: 'component/preview-image'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/progress/README_zh-CN.md')
              }),
              title: 'Progress',
              subtitle: '进度条',
              path: 'component/progress'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/sweetalert/README_zh-CN.md')
              }),
              title: 'SweetAlert',
              subtitle: '快捷对话框',
              path: 'component/sweet-alert'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/swiper/README_zh-CN.md')
              }),
              title: 'Swiper',
              subtitle: '轮播',
              path: 'component/swiper'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tag/README_zh-CN.md')
              }),
              title: 'Tag',
              subtitle: '标签',
              path: 'component/tag'
            }
          ]
        },
        {
          groupName: '数据',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/button/README_zh-CN.md')
              }),
              title: 'Button',
              subtitle: '按钮',
              path: 'component/button'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/cascader/README_zh-CN.md')
              }),
              title: 'Cascader',
              subtitle: '级联选择',
              path: 'component/cascader'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/checkbox/README_zh-CN.md')
              }),
              title: 'Checkbox',
              subtitle: '多选',
              path: 'component/checkbox'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/colorpicker/README_zh-CN.md')
              }),
              title: 'ColorPicker',
              subtitle: '颜色选择器',
              path: 'component/colorpicker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/copy-button/README_zh-CN.md')
              }),
              title: 'CopyButton',
              subtitle: '复制按钮',
              path: 'component/copy-btn'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/date-range-quick-picker/README_zh-CN.md')
              }),
              title: 'DateRangeQuickPicker',
              path: 'component/component/date-range-quick-picker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/datetimepicker/README_zh-CN.md')
              }),
              title: 'DatePicker',
              subtitle: '时间选择',
              path: 'component/datepicker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/design/README_zh-CN.md')
              }),
              title: 'Design',
              subtitle: '微页面编辑',
              path: 'component/design'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/form/README_zh-CN.md')
              }),
              title: 'Form',
              subtitle: '表单',
              path: 'component/form'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/input/README_zh-CN.md')
              }),
              title: 'Input',
              subtitle: '输入框',
              path: 'component/input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/number-input/README_zh-CN.md')
              }),
              title: 'NumberInput',
              subtitle: '数值输入框',
              path: 'component/number-input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/radio/README_zh-CN.md')
              }),
              title: 'Radio',
              subtitle: '单选',
              path: 'component/radio'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/search-input/README_zh-CN.md')
              }),
              title: 'SearchInput',
              subtitle: '搜索框',
              path: 'component/search-input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/select/README_zh-CN.md')
              }),
              title: 'Select',
              subtitle: '下拉选择',
              path: 'component/select'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/sku/README_zh-CN.md')
              }),
              title: 'SKU',
              subtitle: '规格选择器',
              path: 'component/sku'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/slider/README_zh-CN.md')
              }),
              title: 'Slider',
              subtitle: '滑动条',
              path: 'component/slider'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/switch/README_zh-CN.md')
              }),
              title: 'Switch',
              subtitle: '开关',
              path: 'component/switch'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/upload/README_zh-CN.md')
              }),
              title: 'Upload',
              subtitle: '图片上传',
              path: 'component/upload'
            }
          ]
        },
        {
          groupName: 'Display',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/icon/README_zh-CN.md')
              }),
              title: 'Icon',
              subtitle: '图标',
              path: 'component/icon'
            }
          ]
        },
        {
          groupName: '其他',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/infinite-scroller/README_zh-CN.md')
              }),
              title: 'InfiniteScroller',
              subtitle: '无限滚动',
              path: 'component/infinite-scroller'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/popover/README_zh-CN.md')
              }),
              title: 'Popover',
              subtitle: '弹层',
              path: 'component/popover'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/portal/README_zh-CN.md')
              }),
              title: 'Portal',
              subtitle: '传送门',
              path: 'component/portal'
            }
          ]
        },
        {
          groupName: '基础',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/layout/README_zh-CN.md')
              }),
              title: 'Layout',
              subtitle: '布局',
              path: 'component/layout'
            }
          ]
        }
      ]
    }
  ],
  'en-US': [
    {
      name: 'Guide',
      groups: [
        {
          groupName: 'Usage',
          list: [
            {
              title: 'Quick Start',
              path: 'guides/install',
              source: DocLoadable({
                loader: () => import('../../packages/zent/README_en-US.md')
              })
            },
            {
              title: 'Project Demo',
              path: 'guides/demos',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/DEMO_en-US.md')
              })
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/babel-plugin-zent/README_en-US.md')
              })
            }
          ]
        },
        {
          groupName: 'Theme',
          list: [
            {
              title: 'Customize',
              path: 'guides/theme',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/THEME_en-US.md')
              })
            }
          ]
        },
        {
          groupName: 'Upgrades',
          list: [
            {
              title: 'ChangeLog',
              path: 'guides/changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/RELEASE_en-US.md')
              })
            },
            {
              title: 'GithubLog',
              path: 'guides/github_changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/CHANGELOG_en-US.md')
              })
            },
            {
              title: 'Migrate to 3.x',
              path: 'migrating/3x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2-3_en-US.md')
              })
            },
            {
              title: 'Migrate to 2.1.x',
              path: 'migrating/21x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2.1_en-US.md')
              })
            }
          ]
        },
        {
          groupName: 'Development',
          list: [
            {
              title: 'Instruction',
              path: 'guides/contribute',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/CONTRIBUTING_en-US.md')
              })
            },
            {
              title: 'Doc Specification',
              path: 'guides/markdown',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/MARKDOWN_en-US.md')
              })
            }
          ]
        }
      ]
    },
    {
      name: 'Components',
      groups: [
        {
          groupName: 'Navigation',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/affix/README_en-US.md')
              }),
              title: 'Affix',
              path: 'component/affix'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/breadcrumb/README_en-US.md')
              }),
              title: 'Breadcrumb',
              path: 'component/breadcrumb'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/dropdown/README_en-US.md')
              }),
              title: 'Dropdown',
              path: 'component/dropdown'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/grid/README_en-US.md')
              }),
              title: 'Grid',
              path: 'component/grid'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/menu/README_en-US.md')
              }),
              title: 'Menu',
              path: 'component/menu'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/pagination/README_en-US.md')
              }),
              title: 'Pagination',
              path: 'component/pagination'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/steps/README_en-US.md')
              }),
              title: 'Steps',
              path: 'component/steps'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/table/README_en-US.md')
              }),
              title: 'Table',
              path: 'component/table'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tabs/README_en-US.md')
              }),
              title: 'Tabs',
              path: 'component/tabs'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tree/README_en-US.md')
              }),
              title: 'Tree',
              path: 'component/tree'
            }
          ]
        },
        {
          groupName: 'Display',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/alert/README_en-US.md')
              }),
              title: 'Alert',
              path: 'component/alert'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/badge/README_en-US.md')
              }),
              title: 'Badge',
              path: 'component/badge'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/block-header/README_en-US.md')
              }),
              title: 'BlockHeader',
              path: 'component/block-header'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/card/README_en-US.md')
              }),
              title: 'Card',
              path: 'component/card'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/dialog/README_en-US.md')
              }),
              title: 'Dialog',
              path: 'component/dialog'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/icon/README_en-US.md')
              }),
              title: 'Icon',
              path: 'component/icon'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/loading/README_en-US.md')
              }),
              title: 'Loading',
              path: 'component/loading'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/notify/README_en-US.md')
              }),
              title: 'Notify',
              path: 'component/notify'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/pop/README_en-US.md')
              }),
              title: 'Pop',
              path: 'component/pop'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/preview-image/README_en-US.md')
              }),
              title: 'PreviewImage',
              path: 'component/preview-image'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/progress/README_en-US.md')
              }),
              title: 'Progress',
              path: 'component/progress'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/sweetalert/README_en-US.md')
              }),
              title: 'SweetAlert',
              path: 'component/sweet-alert'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/swiper/README_en-US.md')
              }),
              title: 'Swiper',
              path: 'component/swiper'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/tag/README_en-US.md')
              }),
              title: 'Tag',
              path: 'component/tag'
            }
          ]
        },
        {
          groupName: 'Data',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/button/README_en-US.md')
              }),
              title: 'Button',
              path: 'component/button'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/cascader/README_en-US.md')
              }),
              title: 'Cascader',
              path: 'component/cascader'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/checkbox/README_en-US.md')
              }),
              title: 'Checkbox',
              path: 'component/checkbox'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/colorpicker/README_en-US.md')
              }),
              title: 'ColorPicker',
              path: 'component/colorpicker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/copy-button/README_en-US.md')
              }),
              title: 'CopyButton',
              path: 'component/copy-btn'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/date-range-quick-picker/README_en-US.md')
              }),
              title: 'DateRangeQuickPicker',
              path: 'component/component/date-range-quick-picker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/datetimepicker/README_en-US.md')
              }),
              title: 'DatePicker',
              path: 'component/datepicker'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/design/README_en-US.md')
              }),
              title: 'Design',
              path: 'component/design'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/form/README_en-US.md')
              }),
              title: 'Form',
              path: 'component/form'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/input/README_en-US.md')
              }),
              title: 'Input',
              path: 'component/input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/number-input/README_en-US.md')
              }),
              title: 'NumberInput',
              path: 'component/number-input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/radio/README_en-US.md')
              }),
              title: 'Radio',
              path: 'component/radio'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/search-input/README_en-US.md')
              }),
              title: 'SearchInput',
              path: 'component/search-input'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/select/README_en-US.md')
              }),
              title: 'Select',
              path: 'component/select'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/sku/README_en-US.md')
              }),
              title: 'SKU',
              path: 'component/sku'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/slider/README_en-US.md')
              }),
              title: 'Slider',
              path: 'component/slider'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/switch/README_en-US.md')
              }),
              title: 'Switch',
              path: 'component/switch'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/upload/README_en-US.md')
              }),
              title: 'Upload',
              path: 'component/upload'
            }
          ]
        },
        {
          groupName: 'Others',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/infinite-scroller/README_en-US.md')
              }),
              title: 'InfiniteScroller',
              path: 'component/infinite-scroller'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/popover/README_en-US.md')
              }),
              title: 'Popover',
              path: 'component/popover'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/portal/README_en-US.md')
              }),
              title: 'Portal',
              path: 'component/portal'
            }
          ]
        },
        {
          groupName: 'Basic',
          list: [
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/layout/README_en-US.md')
              }),
              title: 'Layout',
              path: 'component/layout'
            }
          ]
        }
      ]
    }
  ]
};
