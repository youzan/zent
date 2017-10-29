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
                loader: () => import('../../packages/zent/README.md')
              })
            },
            {
              title: '项目示例',
              path: 'guides/demos',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/demo.md')
              })
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/babel-plugin-zent/README.md')
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
                loader: () => import('../../packages/zent/docs/theme.md')
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
                loader: () => import('../../packages/zent/RELEASE.md')
              })
            },
            {
              title: 'Github 日志',
              path: 'guides/github_changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/CHANGELOG.md')
              })
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2-3.md')
              })
            },
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2.1.md')
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
                loader: () => import('../../packages/zent/docs/CONTRIBUTING.md')
              })
            },
            {
              title: '文档规范',
              path: 'guides/markdown',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/MARKDOWN.md')
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
              title: 'Affix 固钉',
              path: 'component/affix'
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
              title: 'Alert 公告',
              path: 'component/alert'
            },
            {
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/src/loading/README_zh-CN.md')
              }),
              title: 'Loading 等待',
              path: 'component/loading'
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
                loader: () => import('../../packages/zent/README.md')
              })
            },
            {
              title: 'Project Demo',
              path: 'guides/demos',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/demo.md')
              })
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/babel-plugin-zent/README.md')
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
                loader: () => import('../../packages/zent/docs/theme.md')
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
                loader: () => import('../../packages/zent/RELEASE.md')
              })
            },
            {
              title: 'GithubLog',
              path: 'guides/github_changelog',
              source: DocLoadable({
                loader: () => import('../../packages/zent/CHANGELOG.md')
              })
            },
            {
              title: 'Migrate to 3.x',
              path: 'migrating/3x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2-3.md')
              })
            },
            {
              title: 'Migrate to 2.1.x',
              path: 'migrating/21x',
              source: DocLoadable({
                loader: () =>
                  import('../../packages/zent/docs/migrating-2.1.md')
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
                loader: () => import('../../packages/zent/docs/CONTRIBUTING.md')
              })
            },
            {
              title: 'Doc Specification',
              path: 'guides/markdown',
              source: DocLoadable({
                loader: () => import('../../packages/zent/docs/MARKDOWN.md')
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
                  import('../../packages/zent/src/loading/README_en-US.md')
              }),
              title: 'Loading',
              path: 'component/loading'
            }
          ]
        }
      ]
    }
  ]
};
