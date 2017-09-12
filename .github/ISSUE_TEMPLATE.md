# 请认真写 Issue 的标题，会用于生成 change log。

## 标题规则
[bug fix / breaking change / new feature] 组件名字：修改内容描述

说明：
* 前面方括号用来区分 Issue / PR 的 类型：bug fix - 改 bug；breaking change: 不兼容的改动；new feature：新功能
* 修改内容尽可能言简意赅，总结 PR 的改动或者描述 Issue
* 描述请用中文
* 组件名字请用英文，首字母大写

示例：
* [bug fix] Button: 修改颜色
* [breaking change] Loading: 删除  `static` 属性
* [new feature] Form: 增加 `FormSelection` 支持
* [new feature] 新增 Abc 组件

## ChangeLog 说明
* 默认情况下所有加了 bug / enhancement 这两个 tag 的 PR ／ Issue 都会输出到 ChangeLog 去，如果不想某个 PR ／ Issue 出现在 ChangeLog，请去掉这两个 tag。
* 如果一个改动既有 Issue 又有 PR，以 Issue 为准，不要给 PR 打 tag，保证这个改动只在 ChangeLog 中出现一次。
* 某些很小的修改（例如改个错别字之类的）可以直接发 PR 而不用建 Issue，但是这个 PR 必须打上 tag。

**Do you want to request a *feature* or report a *bug*?**

**What is the current behavior?**

**If the current behavior is a bug, please provide the steps to reproduce and if possible a minimal demo of the problem via https://jsfiddle.net or similar (template: https://jsfiddle.net/n879nke7/).**

**What is the expected behavior?**

**Which versions of Zent and React, and which browser / OS are affected by this issue? Did this work in previous versions of Zent?**
