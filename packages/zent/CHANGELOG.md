## 更新日志

## [zent@2.0.14](https://github.com/youzan/zent/tree/zent@2.0.14) (2017-04-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.13...zent@2.0.14)

Bug 修复

- Republish all packages because of network timeout during npm publish [\#182](https://github.com/youzan/zent/issues/182)

## [zent@2.0.13](https://github.com/youzan/zent/tree/zent@2.0.13) (2017-04-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.12...zent@2.0.13)

Bug 修复

- popover: isOutside on click trigger now works as expected [\#181](https://github.com/youzan/zent/pull/181) ([cpylua](https://github.com/cpylua))

## [zent@2.0.12](https://github.com/youzan/zent/tree/zent@2.0.12) (2017-04-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.11...zent@2.0.12)

Bug 修复

- popover: trigger isOutside not working [\#180](https://github.com/youzan/zent/issues/180)

合并的 Pull Request

- fix table text align [\#179](https://github.com/youzan/zent/pull/179) ([linxixuan](https://github.com/linxixuan))

## [zent@2.0.11](https://github.com/youzan/zent/tree/zent@2.0.11) (2017-04-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.10...zent@2.0.11)

新功能

- zent-dialog: openDialog支持外部自定义id [\#116](https://github.com/youzan/zent/issues/116)
- Dialog: Add closeDialog static method in Dialog. [\#176](https://github.com/youzan/zent/pull/176) ([cpylua](https://github.com/cpylua))
- notify: change notify default duration to 2s [\#173](https://github.com/youzan/zent/pull/173) ([ronghang](https://github.com/ronghang))

Bug 修复

- Popover: ensure window.onblur's target is window in Popover hover trigger [\#171](https://github.com/youzan/zent/pull/171) ([cpylua](https://github.com/cpylua))
- Datepicker: 移除自动添加时间 format 逻辑，使用者自己传入完整的 format。  [\#170](https://github.com/youzan/zent/pull/170) ([xuhong](https://github.com/xuhong))

合并的 Pull Request

- 修改table样式 [\#178](https://github.com/youzan/zent/pull/178) ([linxixuan](https://github.com/linxixuan))

## [zent@2.0.10](https://github.com/youzan/zent/tree/zent@2.0.10) (2017-04-11)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.9...zent@2.0.10)

新功能

- Add form ref [\#167](https://github.com/youzan/zent/pull/167) ([w91](https://github.com/w91))

Bug 修复

- 修复 steps 组件状态为成功时，前面的子项以数字显示 [\#169](https://github.com/youzan/zent/pull/169) ([liaoyu](https://github.com/liaoyu))
- 修复 Dialog 宽度大于屏幕宽度时移位的问题。 [\#168](https://github.com/youzan/zent/pull/168) ([cpylua](https://github.com/cpylua))
- Sweetalert stop button loading on promise rejection [\#165](https://github.com/youzan/zent/pull/165) ([cpylua](https://github.com/cpylua))
- 修复select弹出问题 [\#164](https://github.com/youzan/zent/pull/164) ([huangsy](https://github.com/huangsy))

合并的 Pull Request

- fix table 样式 [\#166](https://github.com/youzan/zent/pull/166) ([linxixuan](https://github.com/linxixuan))
- docs site [\#163](https://github.com/youzan/zent/pull/163) ([cookfront](https://github.com/cookfront))
- HTML元素组件上不传isActive属性 [\#162](https://github.com/youzan/zent/pull/162) ([w91](https://github.com/w91))

## [zent@2.0.9](https://github.com/youzan/zent/tree/zent@2.0.9) (2017-04-10)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.8...zent@2.0.9)

合并的 Pull Request

- 修复变量使用错误 [\#161](https://github.com/youzan/zent/pull/161) ([NinoFocus](https://github.com/NinoFocus))

## [zent@2.0.8](https://github.com/youzan/zent/tree/zent@2.0.8) (2017-04-10)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.7...zent@2.0.8)

处理的 Issue

- sweetalert: support confirm button type configuration [\#146](https://github.com/youzan/zent/issues/146)
- Dialog: 定位可能出现0.5 pixel的情况 [\#145](https://github.com/youzan/zent/issues/145)
- zent-kit: command not found是什么问题 [\#139](https://github.com/youzan/zent/issues/139)
- doc: use zent source code, not the transpiled code [\#135](https://github.com/youzan/zent/issues/135)
- table: replace createClass with ES6 class [\#132](https://github.com/youzan/zent/issues/132)
- react 版本是15.4时，console 警告 [\#130](https://github.com/youzan/zent/issues/130)
- button组件component是a的时候props处理有问题 [\#129](https://github.com/youzan/zent/issues/129)
- Popover: 页面失去焦点后hover trigger不关闭 [\#122](https://github.com/youzan/zent/issues/122)
- zent-menu: multistage hover [\#97](https://github.com/youzan/zent/issues/97)
- form的一些问题 [\#83](https://github.com/youzan/zent/issues/83)

合并的 Pull Request

- feat: close popover on window blur [\#159](https://github.com/youzan/zent/pull/159) ([cpylua](https://github.com/cpylua))
- Hotfix/rh doc 170323 [\#158](https://github.com/youzan/zent/pull/158) ([ronghang](https://github.com/ronghang))
- Hotfix/select warning 0329 [\#157](https://github.com/youzan/zent/pull/157) ([huangsy](https://github.com/huangsy))
- fix: center dialog with a ghost inline-block element [\#155](https://github.com/youzan/zent/pull/155) ([cpylua](https://github.com/cpylua))
- Bugfix datetimepicker [\#154](https://github.com/youzan/zent/pull/154) ([xuhong](https://github.com/xuhong))
- feat: expose more options in popover placement API [\#153](https://github.com/youzan/zent/pull/153) ([cpylua](https://github.com/cpylua))
- add onFocus callback & add field active state & update control group [\#152](https://github.com/youzan/zent/pull/152) ([w91](https://github.com/w91))
- 按照设计师的要求调整按钮颜色 [\#151](https://github.com/youzan/zent/pull/151) ([NinoFocus](https://github.com/NinoFocus))
- input优化 [\#150](https://github.com/youzan/zent/pull/150) ([jinphen](https://github.com/jinphen))
- Fixes \#132, replace createClass with es6 class [\#148](https://github.com/youzan/zent/pull/148) ([cpylua](https://github.com/cpylua))
- fixes \#146. Support confirmType in sweetalert [\#147](https://github.com/youzan/zent/pull/147) ([cpylua](https://github.com/cpylua))
- fix: allow addional attributes in link Button [\#144](https://github.com/youzan/zent/pull/144) ([cpylua](https://github.com/cpylua))
- doc site [\#143](https://github.com/youzan/zent/pull/143) ([cookfront](https://github.com/cookfront))
- fix for dropdown [\#140](https://github.com/youzan/zent/pull/140) ([LucasIcarus](https://github.com/LucasIcarus))
- asyncValidation属性不要传给原生Html元素 [\#138](https://github.com/youzan/zent/pull/138) ([w91](https://github.com/w91))
- remove utc test [\#137](https://github.com/youzan/zent/pull/137) ([xuhong](https://github.com/xuhong))

## [zent@2.0.7](https://github.com/youzan/zent/tree/zent@2.0.7) (2017-03-31)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.6...zent@2.0.7)

处理的 Issue

- zent-input: 支持type="textarea" [\#124](https://github.com/youzan/zent/issues/124)
- zent-button支持传入style [\#91](https://github.com/youzan/zent/issues/91)
- zent-select: disabled的指针样式不对 [\#90](https://github.com/youzan/zent/issues/90)

合并的 Pull Request

- Update picker style [\#136](https://github.com/youzan/zent/pull/136) ([xuhong](https://github.com/xuhong))
- Tabs without panel [\#134](https://github.com/youzan/zent/pull/134) ([ohmygod12121212](https://github.com/ohmygod12121212))
- Doc site [\#133](https://github.com/youzan/zent/pull/133) ([cookfront](https://github.com/cookfront))
- Hotfix/select warning 0329 [\#131](https://github.com/youzan/zent/pull/131) ([huangsy](https://github.com/huangsy))
- 使component属性支持更多类型 [\#128](https://github.com/youzan/zent/pull/128) ([NinoFocus](https://github.com/NinoFocus))
- refactor Pagination component to ES6 class  [\#127](https://github.com/youzan/zent/pull/127) ([SFantasy](https://github.com/SFantasy))
- feat: 为table添加expandedRowRender API [\#126](https://github.com/youzan/zent/pull/126) ([lenghan1991](https://github.com/lenghan1991))
- feat: support textarea [\#125](https://github.com/youzan/zent/pull/125) ([jinphen](https://github.com/jinphen))
- Hotfix/rh doc 170323 [\#123](https://github.com/youzan/zent/pull/123) ([ronghang](https://github.com/ronghang))
- menu: remove the dependency of popover.. [\#121](https://github.com/youzan/zent/pull/121) ([LucasIcarus](https://github.com/LucasIcarus))
- 添加Layout、Button、Checkbox和Radio组件的文档；优化Checkbox和Radio组件在不可用状态下的样式 [\#119](https://github.com/youzan/zent/pull/119) ([NinoFocus](https://github.com/NinoFocus))
- doc: update pagination README [\#118](https://github.com/youzan/zent/pull/118) ([SFantasy](https://github.com/SFantasy))
- Hotfix/table pagination md [\#117](https://github.com/youzan/zent/pull/117) ([linxixuan](https://github.com/linxixuan))
- Modify form doc & change submit throw strategy [\#115](https://github.com/youzan/zent/pull/115) ([w91](https://github.com/w91))
- doc: update zent-tree README.md [\#114](https://github.com/youzan/zent/pull/114) ([wangchao0502](https://github.com/wangchao0502))
- Hotfix/select doc 0323 [\#113](https://github.com/youzan/zent/pull/113) ([huangsy](https://github.com/huangsy))
- Hotfix/steps doc update [\#112](https://github.com/youzan/zent/pull/112) ([liaoyu](https://github.com/liaoyu))
- remove docs postcss unused config [\#111](https://github.com/youzan/zent/pull/111) ([cookfront](https://github.com/cookfront))
- Lc doc portal [\#109](https://github.com/youzan/zent/pull/109) ([cpylua](https://github.com/cpylua))
- doc: update pop doc [\#108](https://github.com/youzan/zent/pull/108) ([cpylua](https://github.com/cpylua))
- style: readme修改 [\#107](https://github.com/youzan/zent/pull/107) ([ctyu](https://github.com/ctyu))
- feat: 更新input的文档 [\#106](https://github.com/youzan/zent/pull/106) ([jinphen](https://github.com/jinphen))
- docs site style [\#105](https://github.com/youzan/zent/pull/105) ([cookfront](https://github.com/cookfront))
- Popover mousemove event throttled [\#103](https://github.com/youzan/zent/pull/103) ([LucasIcarus](https://github.com/LucasIcarus))
- doc: rewrite icon doc [\#101](https://github.com/youzan/zent/pull/101) ([cpylua](https://github.com/cpylua))
- Add doc zhengxin [\#100](https://github.com/youzan/zent/pull/100) ([lama-pacos](https://github.com/lama-pacos))
- Hotfix/rh doc 170323 [\#99](https://github.com/youzan/zent/pull/99) ([ronghang](https://github.com/ronghang))
- Hotfix/fix zent select bug 20170322 [\#98](https://github.com/youzan/zent/pull/98) ([lama-pacos](https://github.com/lama-pacos))
- Update datepicker [\#93](https://github.com/youzan/zent/pull/93) ([xuhong](https://github.com/xuhong))

## [zent@2.0.6](https://github.com/youzan/zent/tree/zent@2.0.6) (2017-03-22)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.5...zent@2.0.6)

处理的 Issue

- zent-table: column align [\#82](https://github.com/youzan/zent/issues/82)
- zent-tree: logic issues, some style fix [\#24](https://github.com/youzan/zent/issues/24)
- zent-select: 'warning: unknown props' with react v15.4.2 and others.. [\#21](https://github.com/youzan/zent/issues/21)

合并的 Pull Request

- Hotfix/select bugfix 0313 [\#96](https://github.com/youzan/zent/pull/96) ([huangsy](https://github.com/huangsy))
- 增加文本对齐功能 [\#95](https://github.com/youzan/zent/pull/95) ([linxixuan](https://github.com/linxixuan))
- fix pagination分页 [\#94](https://github.com/youzan/zent/pull/94) ([linxixuan](https://github.com/linxixuan))
- style: 支持新ui [\#89](https://github.com/youzan/zent/pull/89) ([ctyu](https://github.com/ctyu))
- 修改zent-tabs文档示例代码的错误 [\#88](https://github.com/youzan/zent/pull/88) ([hunnble](https://github.com/hunnble))
- 更新getControlGroup，支持在control-group上添加自定义样式类 [\#87](https://github.com/youzan/zent/pull/87) ([w91](https://github.com/w91))
- fix the way of Icon font-face generating without superman [\#86](https://github.com/youzan/zent/pull/86) ([LucasIcarus](https://github.com/LucasIcarus))
- Hotfix/select bugfix 0313 [\#84](https://github.com/youzan/zent/pull/84) ([huangsy](https://github.com/huangsy))
- Code style consistency of zent-pagination [\#76](https://github.com/youzan/zent/pull/76) ([LucasIcarus](https://github.com/LucasIcarus))

## [zent@2.0.5](https://github.com/youzan/zent/tree/zent@2.0.5) (2017-03-16)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.4...zent@2.0.5)

合并的 Pull Request

- feat: 优化tree组建案例，优化样式 [\#81](https://github.com/youzan/zent/pull/81) ([wangchao0502](https://github.com/wangchao0502))
- 添加 zent menu 组件 [\#75](https://github.com/youzan/zent/pull/75) ([lama-pacos](https://github.com/lama-pacos))

## [zent@2.0.4](https://github.com/youzan/zent/tree/zent@2.0.4) (2017-03-15)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.3...zent@2.0.4)

处理的 Issue

- zent-radio: disabled cursor and text color [\#20](https://github.com/youzan/zent/issues/20)
- zent-checkbox: disabled style not consistent; group disabled logic. [\#16](https://github.com/youzan/zent/issues/16)

合并的 Pull Request

- bugfix & update readme [\#80](https://github.com/youzan/zent/pull/80) ([w91](https://github.com/w91))
- Code style consistency of zent-steps [\#79](https://github.com/youzan/zent/pull/79) ([LucasIcarus](https://github.com/LucasIcarus))
- Update form doc & example [\#78](https://github.com/youzan/zent/pull/78) ([w91](https://github.com/w91))
- Code style consistency of zent-popover [\#77](https://github.com/youzan/zent/pull/77) ([LucasIcarus](https://github.com/LucasIcarus))
- 在不可用状态下，讲整个区域的数标都置成not-allowed [\#73](https://github.com/youzan/zent/pull/73) ([NinoFocus](https://github.com/NinoFocus))

## [zent@2.0.3](https://github.com/youzan/zent/tree/zent@2.0.3) (2017-03-14)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.2...zent@2.0.3)

合并的 Pull Request

- 修改form导出方式 [\#72](https://github.com/youzan/zent/pull/72) ([w91](https://github.com/w91))
- 修复select部分bug [\#71](https://github.com/youzan/zent/pull/71) ([huangsy](https://github.com/huangsy))
- 修复steps组件间隔样式及有时margin计算不准确 [\#70](https://github.com/youzan/zent/pull/70) ([liaoyu](https://github.com/liaoyu))
- Code\_style consistency [\#69](https://github.com/youzan/zent/pull/69) ([LucasIcarus](https://github.com/LucasIcarus))
- Fix/readme phonetic [\#65](https://github.com/youzan/zent/pull/65) ([LucasIcarus](https://github.com/LucasIcarus))

## [zent@2.0.2](https://github.com/youzan/zent/tree/zent@2.0.2) (2017-03-09)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.1...zent@2.0.2)

合并的 Pull Request

- Fix range parse [\#68](https://github.com/youzan/zent/pull/68) ([xuhong](https://github.com/xuhong))

## [zent@2.0.1](https://github.com/youzan/zent/tree/zent@2.0.1) (2017-03-08)
[Full Changelog](https://github.com/youzan/zent/compare/zent@2.0.0...zent@2.0.1)

## [zent@2.0.0](https://github.com/youzan/zent/tree/zent@2.0.0) (2017-03-08)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.11...zent@2.0.0)

处理的 Issue

- Popover does not allow string/number as its children [\#40](https://github.com/youzan/zent/issues/40)
- Support SSR [\#39](https://github.com/youzan/zent/issues/39)
- zent-pagination: example dynamicPageSize 'warning: unknown props' with react v15.4.2 [\#19](https://github.com/youzan/zent/issues/19)
- zent-form: 'warning: unknown props' with react v15.4.2; warning with extral input; [\#17](https://github.com/youzan/zent/issues/17)
- zent-button: link mode 'warning: unknown props' with react v15.4.2  [\#15](https://github.com/youzan/zent/issues/15)

合并的 Pull Request

- form 文档的一点微调 [\#67](https://github.com/youzan/zent/pull/67) ([LucasIcarus](https://github.com/LucasIcarus))
- form 文档调整 [\#66](https://github.com/youzan/zent/pull/66) ([LucasIcarus](https://github.com/LucasIcarus))
- Button组件添加htmlType [\#64](https://github.com/youzan/zent/pull/64) ([hunnble](https://github.com/hunnble))
- Update readme and bugfix [\#63](https://github.com/youzan/zent/pull/63) ([xuhong](https://github.com/xuhong))
- Add breadcrumb nav [\#62](https://github.com/youzan/zent/pull/62) ([lama-pacos](https://github.com/lama-pacos))
- 文档更新: zent-utils [\#61](https://github.com/youzan/zent/pull/61) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-tree [\#60](https://github.com/youzan/zent/pull/60) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-tabs [\#59](https://github.com/youzan/zent/pull/59) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-table [\#58](https://github.com/youzan/zent/pull/58) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-switch [\#57](https://github.com/youzan/zent/pull/57) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-sweet [\#56](https://github.com/youzan/zent/pull/56) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-steps [\#55](https://github.com/youzan/zent/pull/55) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-radio [\#54](https://github.com/youzan/zent/pull/54) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-portal [\#53](https://github.com/youzan/zent/pull/53) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-popover [\#52](https://github.com/youzan/zent/pull/52) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-pop [\#51](https://github.com/youzan/zent/pull/51) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-pagination [\#50](https://github.com/youzan/zent/pull/50) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-notify [\#49](https://github.com/youzan/zent/pull/49) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-loading [\#48](https://github.com/youzan/zent/pull/48) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-layout [\#47](https://github.com/youzan/zent/pull/47) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-input [\#46](https://github.com/youzan/zent/pull/46) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-icon [\#45](https://github.com/youzan/zent/pull/45) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新: zent-dialog [\#44](https://github.com/youzan/zent/pull/44) ([LucasIcarus](https://github.com/LucasIcarus))
- Fix issues\#15 [\#42](https://github.com/youzan/zent/pull/42) ([LucasIcarus](https://github.com/LucasIcarus))
- Form upgrade [\#41](https://github.com/youzan/zent/pull/41) ([w91](https://github.com/w91))
- 文档更新-zent-datetimepicker [\#35](https://github.com/youzan/zent/pull/35) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新-zent-checkbox [\#34](https://github.com/youzan/zent/pull/34) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新-zent-button [\#33](https://github.com/youzan/zent/pull/33) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新-zent-breadcrumb [\#32](https://github.com/youzan/zent/pull/32) ([LucasIcarus](https://github.com/LucasIcarus))
- 文档更新-zent-alert [\#31](https://github.com/youzan/zent/pull/31) ([LucasIcarus](https://github.com/LucasIcarus))

## [zent@1.0.11](https://github.com/youzan/zent/tree/zent@1.0.11) (2017-02-24)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.10...zent@1.0.11)

处理的 Issue

- zent-tree remove object.assign package [\#30](https://github.com/youzan/zent/issues/30)

合并的 Pull Request

- fix: 添加 table header 的 unmount 逻辑, 删除事件监听 [\#38](https://github.com/youzan/zent/pull/38) ([lama-pacos](https://github.com/lama-pacos))

## [zent@1.0.10](https://github.com/youzan/zent/tree/zent@1.0.10) (2017-02-24)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.9...zent@1.0.10)

合并的 Pull Request

- Refactor pop [\#37](https://github.com/youzan/zent/pull/37) ([cpylua](https://github.com/cpylua))
- feat: zent-tabs空间支持tab传react组件 [\#36](https://github.com/youzan/zent/pull/36) ([ctyu](https://github.com/ctyu))
- npm\_sync shell [\#27](https://github.com/youzan/zent/pull/27) ([LucasIcarus](https://github.com/LucasIcarus))

## [zent@1.0.9](https://github.com/youzan/zent/tree/zent@1.0.9) (2017-02-22)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.8...zent@1.0.9)

处理的 Issue

- zent-table [\#25](https://github.com/youzan/zent/issues/25)
- zent-tabs: style bugs [\#23](https://github.com/youzan/zent/issues/23)
- zent-input: example 02/03/04  'warning: unknown props' with react v15.4.2 [\#18](https://github.com/youzan/zent/issues/18)

合并的 Pull Request

- Hotfix/20170222 fix zent tabs style lcj [\#26](https://github.com/youzan/zent/pull/26) ([ctyu](https://github.com/ctyu))
- Pop arrow at center [\#13](https://github.com/youzan/zent/pull/13) ([cpylua](https://github.com/cpylua))

## [zent@1.0.8](https://github.com/youzan/zent/tree/zent@1.0.8) (2017-02-17)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.7...zent@1.0.8)

合并的 Pull Request

- fix range time display logic [\#10](https://github.com/youzan/zent/pull/10) ([xuhong](https://github.com/xuhong))
- fix: update package.json description [\#9](https://github.com/youzan/zent/pull/9) ([cpylua](https://github.com/cpylua))
- feat: add onShow and onClose callback for Pop [\#8](https://github.com/youzan/zent/pull/8) ([cpylua](https://github.com/cpylua))
- Fix year panel display [\#7](https://github.com/youzan/zent/pull/7) ([xuhong](https://github.com/xuhong))
- DateTimePicker组件的单元测试 [\#6](https://github.com/youzan/zent/pull/6) ([LucasIcarus](https://github.com/LucasIcarus))

## [zent@1.0.7](https://github.com/youzan/zent/tree/zent@1.0.7) (2017-02-16)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.6...zent@1.0.7)

## [zent@1.0.6](https://github.com/youzan/zent/tree/zent@1.0.6) (2017-02-15)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.4...zent@1.0.6)

合并的 Pull Request

- 修改table的垂直居中，支持em等其他单位的宽度 [\#5](https://github.com/youzan/zent/pull/5) ([linxixuan](https://github.com/linxixuan))

## [zent@1.0.4](https://github.com/youzan/zent/tree/zent@1.0.4) (2017-02-15)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.3...zent@1.0.4)

合并的 Pull Request

- table的空样式 [\#4](https://github.com/youzan/zent/pull/4) ([linxixuan](https://github.com/linxixuan))

## [zent@1.0.3](https://github.com/youzan/zent/tree/zent@1.0.3) (2017-02-15)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.2...zent@1.0.3)

合并的 Pull Request

- Fix value return [\#3](https://github.com/youzan/zent/pull/3) ([xuhong](https://github.com/xuhong))
- flex-style-table [\#1](https://github.com/youzan/zent/pull/1) ([linxixuan](https://github.com/linxixuan))

## [zent@1.0.2](https://github.com/youzan/zent/tree/zent@1.0.2) (2017-02-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.1...zent@1.0.2)

## [zent@1.0.1](https://github.com/youzan/zent/tree/zent@1.0.1) (2017-02-13)
[Full Changelog](https://github.com/youzan/zent/compare/zent@1.0.0...zent@1.0.1)

合并的 Pull Request

- Fix format bug [\#2](https://github.com/youzan/zent/pull/2) ([xuhong](https://github.com/xuhong))

## [zent@1.0.0](https://github.com/youzan/zent/tree/zent@1.0.0) (2017-02-10)


\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*