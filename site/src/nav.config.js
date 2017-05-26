import ZentDoc from '../../packages/zent/README.md';
import BabelPluginZentDoc from '../../packages/babel-plugin-zent/README.md';
import ChangelogDoc from '../../packages/zent/CHANGELOG.md';
import MigrationDoc2 from '../../packages/zent/docs/migrating-2.1.md';
import MigrationDoc3 from '../../packages/zent/docs/migrating-2-3.md';
import LayoutDoc from '../../packages/zent/src/layout/README.md';
import IconDoc from '../../packages/zent/src/icon/README.md';
import AlertDoc from '../../packages/zent/src/alert/README.md';
import DialogDoc from '../../packages/zent/src/dialog/README.md';
import LoadingDoc from '../../packages/zent/src/loading/README.md';
import NotifyDoc from '../../packages/zent/src/notify/README.md';
import PopDoc from '../../packages/zent/src/pop/README.md';
import SweetalertDoc from '../../packages/zent/src/sweetalert/README.md';
import ButtonDoc from '../../packages/zent/src/button/README.md';
import CheckboxDoc from '../../packages/zent/src/checkbox/README.md';
import DateTimePickerDoc
  from '../../packages/zent/src/datetimepicker/README.md';
import FormDoc from '../../packages/zent/src/form/README.md';
import InputDoc from '../../packages/zent/src/input/README.md';
import RadioDoc from '../../packages/zent/src/radio/README.md';
import SelectDoc from '../../packages/zent/src/select/README.md';
import SliderDoc from '../../packages/zent/src/slider/README.md';
import SwitchDoc from '../../packages/zent/src/switch/README.md';
import BreadcrumbDoc from '../../packages/zent/src/breadcrumb/README.md';
import MenuDoc from '../../packages/zent/src/menu/README.md';
import DropdownDoc from '../../packages/zent/src/popover/Dropdown.md';
import PaginationDoc from '../../packages/zent/src/pagination/README.md';
import StepsDoc from '../../packages/zent/src/steps/README.md';
import TableDoc from '../../packages/zent/src/table/README.md';
import TabsDoc from '../../packages/zent/src/tabs/README.md';
import TreeDoc from '../../packages/zent/src/tree/README.md';
import PopoverDoc from '../../packages/zent/src/popover/README.md';
import PortalDoc from '../../packages/zent/src/portal/README.md';

const originDataSet = {
  'zh-CN': [
    {
      name: '使用指南',
      groups: [
        {
          list: [
            {
              title: '快速上手',
              path: 'guides/install',
              component: ZentDoc
            },
            {
              title: 'babel-plugin-zent',
              path: 'guides/babel-plugin-zent',
              component: BabelPluginZentDoc
            },
            {
              title: '更新日志',
              path: 'guides/changelog',
              component: ChangelogDoc
            }
          ]
        }
      ]
    },

    {
      name: '升级指南',
      groups: [
        {
          list: [
            {
              title: '2.1.x 升级指南',
              path: 'migrating/21x',
              component: MigrationDoc2
            },
            {
              title: '3.x 升级指南',
              path: 'migrating/3x',
              component: MigrationDoc3
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
              component: LayoutDoc
            },
            {
              path: 'component/icon',
              title: 'Icon 图标',
              component: IconDoc
            }
          ]
        },
        {
          groupName: '展示',
          list: [
            {
              path: 'component/alert',
              title: 'Alert 公告',
              component: AlertDoc
            },
            {
              path: 'component/dialog',
              title: 'Dialog 对话框',
              component: DialogDoc
            },
            {
              path: 'component/loading',
              title: 'Loading 等待',
              component: LoadingDoc
            },
            {
              path: 'component/notify',
              title: 'Notify 通知',
              component: NotifyDoc
            },
            {
              path: 'component/pop',
              title: 'Pop 气泡提示',
              component: PopDoc
            },
            {
              path: 'component/sweet-alert',
              title: 'SweetAlert',
              component: SweetalertDoc
            }
          ]
        },
        {
          groupName: '数据',
          list: [
            {
              path: 'component/button',
              title: 'Button 按钮',
              component: ButtonDoc
            },
            {
              path: 'component/checkbox',
              title: 'Checkbox 多选',
              component: CheckboxDoc
            },
            {
              path: 'component/datepicker',
              title: 'DatePicker 时间选择',
              component: DateTimePickerDoc
            },
            {
              path: 'component/form',
              title: 'Form 表单',
              component: FormDoc
            },
            {
              path: 'component/input',
              title: 'Input 输入框',
              component: InputDoc
            },
            {
              path: 'component/number-input',
              title: 'NumberInput 数值输入框',
              component: require('../../packages/zent/src/number-input/README.md')
            },
            {
              path: 'component/radio',
              title: 'Radio 单选',
              component: RadioDoc
            },
            {
              path: 'component/select',
              title: 'Select 选项',
              component: SelectDoc
            },
            {
              path: 'component/slider',
              title: 'Slider 滑动输入条',
              component: SliderDoc
            },
            {
              path: 'component/switch',
              title: 'Switch 开关',
              component: SwitchDoc
            }
          ]
        },
        {
          groupName: '导航',
          list: [
            {
              path: 'component/breadcrumb',
              title: 'Breadcrumb 面包屑',
              component: BreadcrumbDoc
            },
            {
              path: 'component/menu',
              title: 'Menu 菜单',
              component: MenuDoc
            },
            {
              path: 'component/dropdown',
              title: 'Dropdown 下拉菜单',
              component: DropdownDoc
            },
            {
              path: 'component/pagination',
              title: 'Pagination 分页',
              component: PaginationDoc
            },
            {
              path: 'component/steps',
              title: 'Steps 步骤条',
              component: StepsDoc
            },
            {
              path: 'component/table',
              title: 'Table 表格',
              component: TableDoc
            },
            {
              path: 'component/tabs',
              title: 'Tabs 选项卡',
              component: TabsDoc
            },
            {
              path: 'component/tree',
              title: 'Tree 树',
              component: TreeDoc
            }
          ]
        },
        {
          groupName: '其他',
          list: [
            {
              path: 'component/popover',
              title: 'Popover 弹层',
              component: PopoverDoc
            },
            {
              path: 'component/portal',
              title: 'Portal 传送门',
              component: PortalDoc
            }
          ]
        }
      ]
    }
  ]
};

export default originDataSet;
