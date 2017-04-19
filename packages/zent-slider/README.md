# 注意: 不要单独使用，这是`zent-kit`初始化项目时的模版，请配合[zent-kit](https://github.com/youzan/zent-kit)使用。

## zent-slider

!!! 请在此处填写你的文档最简单描述 !!!

### 使用场景

简单介绍组件使用场景

### 代码演示

请写在本段落

### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | '' | '' |
| prefix | 自定义前缀 | string | 'zent' | null |

# 欢迎使用zent-kit来初始化你的`zent-slider`组件

接下来就可以愉快的开发了~

*注意：*

> 请遵循上面的段落规范进行开发
> 本部分和以下部分为文档，正式发布前请删除

# zent-kit

[zent组件库](https://github.com/youzan/zent)开发脚手架

[![NPM](https://nodei.co/npm/zent-kit.png)](https://nodei.co/npm/zent-kit/)

## Install

```bash
npm install zent-kit -g
```

### 初始化组件

```bash
zent-kit init <your component name>
```

初始化一个组件目录，组件的模版从[zent-seed](https://github.com/youzan/zent-seed)下载。

### 开发模式

```bash
zent-kit dev
```

创建一个本地服务器，同时watch本地代码修改。

### 测试

```bash
zent-kit test
```

集成了[Jest](https://facebook.github.io/jest/)测试框架，用来跑组件的单元测试。

### 打包

```bash
zent-kit prepublish
```

打包`src`目录下的文件，babel转码的文件会输出到`lib`目录下，同时`dist`目录下会生成一个包含所有代码的UMD模块文件。

### File Structure

```bash
// 源文件(由开发者编写)
-- src
    // 组件源文件目录
-- assets
    // sass源文件目录
-- examples
    // demo文件目录
-- package.json

// 生成文件(由zent-kit生成)
-- README.md
    // 由package.json和src下文件生成
-- lib
    // 经过babel转码的组件文件以及编译过的css
-- dist
    // 经过webpack打包的，符合UMD规范的组件文件
```

### Style

* 考虑到让用户更加容易自定义样式，尽量不要在组件源文件当中import样式文件，应该在examples目录下的文件中进行import
* 用户如果需要使用组件样式，可以直接引入我们在assets文件夹下的sass源文件，或者lib文件夹下编译完成的css文件

### README

README文件的规范包含：

```bash
-- 描述
    // 必选项：简单描述包特性(写在package.json中)
-- 使用场景
    // 可选项：简单描述组件场景(写在src下文件中)
-- tips
    // 可选项：一些简单的设计思想的描述,或者特殊接口的介绍(写在src下文件中)
-- API
    // 必选项：介绍本组件的使用方式(写在src下文件中)
```

### package.json

如果不使用zent-kit init，自行编写的package.json需参考以下代码

```json
{
  ...
  "name": "组件名称",
  "description": "这是一个React组件的描述",
  "main": "./lib/index.js",
  "scripts": {
    "dev": "zent-kit dev",
    "lint": "eslint ./src",
    "prepublish": "npm run lint && zent-kit prepublish"
  },
  "files": [
    "src/",
    "assets/",
    "examples/",
    "lib/",
    "dist/"
  ],
  "dependencies": {
      ...
  },
  "devDependencies": {
      ...
  }
  ...
}
```

