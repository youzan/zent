## Change logs

* 2017-02-10, 0.4.3, pop/popover bug fix
* 2017-02-10, 0.4.2, 大包导出Popover组件
* 2017-02-09, 0.4.1, 修复文件找不到的bug
* 2017-02-09, 0.4.0,  不兼容改动：`zent-table`布局用`flex`实现，`zent-pop`重写；其它改动：`zent-notify`增加关闭回掉函数，`zent-datetimepicker`新的时间选择UI以及bug修复。
* 2017-02-07, 0.3.22, 添加RangePicker, `Dialog`宽度自适应
* 2017-01-23, 0.3.21, `zent-checkbox`和`zent-radio`样式修改
* 2017-01-17, 0.3.20, `zent-datetimepicker` 日期解析bug修复
* 2017-01-11, 0.3.11, `zent-form`为内置封装的`SelectField`做`onChange`回调参数的兼容
* 2017-01-10, 0.3.10, `zent-form`增加`required`支持
* 2017-01-06, 0.3.9, `zent-select`更新样式，`zent-datetimepicker`bug修复
* 2017-01-03, 0.3.8, 更新`zent-datetimepicker`，增加disabled状态，日期选择添加min 和max 的支持, 一些bug修复; 用`portal`重写`zent-notify`
* 2016-12-30, 0.3.7, `zent-tabs`支持number作为id使用
* 2016-12-28, 0.3.6, `zent-form`修复使用jquery中非标准promise方法always导致的报错，改用then
* 2016-12-27, 0.3.5, `zent-tree`增加`isRoot`用来处理根结点的`parentId`非零的情况；checkbox样式bug修复
* 2016-12-23, 0.3.4, 更新table组件样式
* 2016-12-22, 0.3.3, 更新loading组件，修复examples在包里丢失的问题
* 2016-12-20, 0.3.2, 更新table组件，修复了bodyRender返回0时不显示的bug
* 2016-12-19, 0.3.1, 更新icon组件，现在会透传额外的props了
* 2016-12-14, 0.3.0, 升级zent-tabs，tabs初始化的时候只会mount当前active的panel；其他bug修复
* 2016-12-09, 0.2.37, datetimepicker bug修复
* 2016-12-08, 0.2.36, input组件css样式去掉
* 2016-12-08, 0.2.35, 修复select的bug
* 2016-12-07, 0.2.34, 修复pagination对select版本号的依赖，和zent保持一致
* 2016-12-07, 0.2.33, 去除所有组件对react的依赖，都改成了devDependencies
* 2016-12-06, 0.2.32, 修复form组件bug
* 2016-12-06, 0.2.31, 修复form组件的export
* 2016-11-30, 0.2.30, 发布steps组件
* 2016-11-30, 0.2.29, 发布form组件，终于！！！
* 2016-11-30, 0.2.28, 修复datetime picker bug
* 2016-11-29, 0.2.25/0.2.26/0.2.27, 修复datetime picker的bug
* 2016-11-28, 0.2.24, 发布datetime picker，暂时只开放DatePicker
* 2016-11-23, 0.2.23, 修复select的一些问题
* 2016-11-16, 0.2.21/0.2.22, 支持zent/button这种引用方式，有问题请找对应组件的作者
* 2016-11-16, 0.2.20, 发布zent-tabs
* 2016-11-15, 0.2.19, zent-button去掉无用props，某些版本的react会有警告
* 2016-11-15, 0.2.18, sweetalert增加type选项，设置后在title左侧会显示一个图标
* 2016-11-14, 0.2.17, 重新打包，修复zent-kit更新引起的css问题（iron-front下node-sass编译出问题）
* 2016-11-14, 0.2.15/0.2.16, zent-alert的style从error改成danger，error仍旧支持
* 2016-11-11, 0.2.12/0.2.13/0.2.14, 添加zent-alert组件
* 2016-11-11, 0.2.10/0.2.11, 添加zent-icon组件
* 2016-11-09, 0.2.8/0.2.9, zent-switch移除size="large"支持
* 2016-11-09, 0.2.7, zent-switch添加user-select: none
* 2016-11-08, 0.2.6, 修复zent-input组件defaultValue的问题
* 2016-10-25, 0.2.5, 修复`input`组件和`bootstrap`的样式冲突
* 2016-10-25, 0.2.4, 更新`dialog`和`input`组件的样式
* 2016-10-24, 0.2.3, 修复`switch`和`input`组件样式丢失的bug
* 2016-10-19, 0.2.2, 发布`zent-input`组件, `zent-dialog`调整没有header和footer时的样式
* 2016-10-18, 0.2.1, `zent-tree`删除对`zent-util`的引用（setClass）
* 2016-10-14, 0.2.0, `sweetalert`组件升级，该组件有API改动。
* 2016-10-13, 0.1.34, `radio`/`checkbox`组件的`value`支持任意类型；新增`switch`组件。
* 2016-09-26, 0.1.33, `Dialog`组件添加`openDialog`方法。
* 2016-09-22, 0.1.32, 升级`zent-dialog`, 现在`dialog`会居中显示了。
* 2016-09-21, 0.1.31, 升级`zent-button`，主要是`loading`样式的修改。
