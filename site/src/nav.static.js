module.exports = {
  'zh-CN': [
    {
      name: '开发指南',
      groups: [
        {
          groupName: '使用',
          list: [
            {
              title: '快速上手',
              path: 'guides/install',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/README_zh-CN.md') })",
            },
            {
              title: 'Babel 插件',
              path: 'guides/babel-plugin-zent',
              source:
                "DocLoadable({ loader: () => import('../../packages/babel-plugin-zent/README_zh-CN.md') })",
            },
            {
              title: '国际化',
              path: 'guides/i18n',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/I18N_zh-CN.md') })",
            },
            {
              title: 'API文档',
              link: 'apidoc',
            },
          ],
        },
        {
          groupName: '主题',
          list: [
            {
              title: '定制主题',
              path: 'guides/theme',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/THEME_zh-CN.md') })",
            },
            {
              title: '编码规范',
              path: 'guides/writing-themable-code',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/Theme-Coding_zh-CN.md') })",
            },
          ],
        },
        {
          groupName: '升级',
          list: [
            {
              title: '更新日志',
              path: 'guides/changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_zh-CN.md') })",
            },
            {
              title: '9.0.0 迁移指南',
              path: 'guides/changelog-v9',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_v9.md') })",
            },
            {
              title: '7.0.0 迁移指南',
              path: 'guides/changelog-v7',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_v7.md') })",
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2-3_zh-CN.md') })",
            },
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2.1_zh-CN.md') })",
            },
            {
              title: 'Github 日志',
              path: 'guides/github_changelog',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/CHANGELOG.md') })",
            },
          ],
        },
        {
          groupName: '开发',
          list: [
            {
              title: '如何参与',
              path: 'guides/contribute',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/CONTRIBUTING_zh-CN.md') })",
            },
            {
              title: '文档规范',
              path: 'guides/markdown',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/MARKDOWN_zh-CN.md') })",
            },
          ],
        },
      ],
    },
    {
      name: '组件',
      groups: [],
    },
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
                "DocLoadable({ loader: () => import('../../packages/zent/README_en-US.md') })",
            },
            {
              title: 'Babel Plugin',
              path: 'guides/babel-plugin-zent',
              source:
                "DocLoadable({ loader: () => import('../../packages/babel-plugin-zent/README_en-US.md') })",
            },
            {
              title: 'Internationalization',
              path: 'guides/i18n',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/I18N_en-US.md') })",
            },
            {
              title: 'API Document',
              link: 'apidoc',
            },
          ],
        },
        {
          groupName: 'Theme',
          list: [
            {
              title: 'Customize',
              path: 'guides/theme',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/THEME_en-US.md') })",
            },
            {
              title: 'Coding Guides',
              path: 'guides/writing-themable-code',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/Theme-Coding_en-US.md') })",
            },
          ],
        },
        {
          groupName: 'Releases',
          list: [
            {
              title: 'Change Log',
              path: 'guides/changelog',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_en-US.md') })",
            },
            {
              title: 'Upgrade to 7.0.0',
              path: 'guides/changelog-v7',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/RELEASE_v7.md') })",
            },
            {
              title: 'Upgrade to 3.x',
              path: 'migrating/3x',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2-3_en-US.md') })",
            },
            {
              title: 'Upgrade to 2.1.x',
              path: 'migrating/21x',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/migrating-2.1_en-US.md') })",
            },
            {
              title: 'Github Log',
              path: 'guides/github_changelog',
              hidden: true,
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/CHANGELOG.md') })",
            },
          ],
        },
        {
          groupName: 'Contributing',
          list: [
            {
              title: 'How To',
              path: 'guides/contribute',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/CONTRIBUTING_en-US.md') })",
            },
            {
              title: 'Writing Docs',
              path: 'guides/markdown',
              source:
                "DocLoadable({ loader: () => import('../../packages/zent/docs/MARKDOWN_en-US.md') })",
            },
          ],
        },
      ],
    },
    {
      name: 'Components',
      groups: [],
    },
  ],
};
