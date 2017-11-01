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
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/README_zh-CN.md') })"
            },
            {
              title: '项目示例',
              path: 'guides/demos',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/DEMO_zh-CN.md') })"
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source:
                "DocLoadable({ loader: () => import('../../packages/babel-plugin-zent/README_zh-CN.md') })"
            }
          ]
        },
        {
          groupName: '主题',
          list: [
            {
              title: '色彩',
              path: 'guides/colors',
              source:
                "DocLoadable({ loader: () => import('./pages/colors/zh-CN.js') })"
            },
            {
              title: '定制主题',
              path: 'guides/theme',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/THEME_zh-CN.md') })"
            }
          ]
        },
        {
          groupName: '升级',
          list: [
            {
              title: '更新日志',
              path: 'guides/changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_zh-CN.md') })"
            },
            {
              title: 'Github 日志',
              path: 'guides/github_changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/CHANGELOG.md') })"
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2-3_zh-CN.md') })"
            },
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2.1_zh-CN.md') })"
            }
          ]
        },
        {
          groupName: '开发',
          list: [
            {
              title: '如何参与',
              path: 'guides/contribute',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/CONTRIBUTING_zh-CN.md') })"
            },
            {
              title: '文档规范',
              path: 'guides/markdown',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/MARKDOWN_zh-CN.md') })"
            }
          ]
        }
      ]
    },
    {
      name: 'Components 组件',
      groups: []
    }
  ],

  'en-US': [
    {
      name: 'Guides',
      groups: [
        {
          groupName: 'Usage',
          list: [
            {
              title: 'Quick Start',
              path: 'guides/install',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/README_en-US.md') })"
            },
            {
              title: 'Demos',
              path: 'guides/demos',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/DEMO_en-US.md') })"
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source:
                "DocLoadable({ loader: () => import('../../packages/babel-plugin-zent/README_en-US.md') })"
            }
          ]
        },
        {
          groupName: 'Theme',
          list: [
            {
              title: 'Colors',
              path: 'guides/colors',
              source:
                "DocLoadable({ loader: () => import('./pages/colors/en-US.js') })"
            },
            {
              title: 'Customize',
              path: 'guides/theme',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/THEME_en-US.md') })"
            }
          ]
        },
        {
          groupName: 'Releases',
          list: [
            {
              title: 'Change Log',
              path: 'guides/changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_en-US.md') })"
            },
            {
              title: 'Github Log',
              path: 'guides/github_changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/CHANGELOG.md') })"
            },
            {
              title: 'Migrate to 3.x',
              path: 'migrating/3x',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2-3_en-US.md') })"
            },
            {
              title: 'Migrate to 2.1.x',
              path: 'migrating/21x',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2.1_en-US.md') })"
            }
          ]
        },
        {
          groupName: 'Contributing',
          list: [
            {
              title: 'How To',
              path: 'guides/contribute',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/CONTRIBUTING_en-US.md') })"
            },
            {
              title: 'Writing Docs',
              path: 'guides/markdown',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/MARKDOWN_en-US.md') })"
            }
          ]
        }
      ]
    },
    {
      name: 'Components',
      groups: []
    }
  ]
};
