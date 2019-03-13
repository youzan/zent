---
title: Design
subtitle: 微页面编辑
path: component/design
group: 业务组件
---

## Design 微页面编辑组件

请使用 `@zent/design` 这个包。

微页面编辑组件，用所见即所得(WYSIWG)的方式创建内容丰富的富文本页面。

### API

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
|------|------|------|--------|--------|
| components | 所有组件的定义数组 | array | [] | 必须 |
| value | 组件当前的值 | array | [] | 可选 |
| onChange | 组件值修改时触发的回调函数 | func(value: array): void | 必须 |
| settings | 组件的配置信息，会传给每个 Design 组件 | object | | 可选 |
| onSettingsChange | 组件配置信息的修改回调函数 | func | | 可选 |
| defaultSelectedIndex| 默认选中的下标（value）| number | -1 | 可选 |
| preview | 用于自定义整个 Design 的渲染 | Component | DesingPreview | 可选 |
| previewFooter | 自定义 Preview 底部的额外信息 | node |  | 可选 | 
| confirmUnsavedLeave| 有未保存数据关闭窗口时需要用户确认 | boolean | true | 可选 |
| cache | 是否将未保存的数据暂存到 localStorage 中 | boolean | false | 可选 |
| cacheId | 配合 cache 使用，用于设置 Design 实例的缓存 id | string | | cache 为 true 时必填 |
| cacheRestoreMessage | 恢复缓存时的提示文案 | node | 提示：在浏览器中发现未提交的内容，是否使用该内容替换当前内容？ | 可选 |
| disabled | 是否禁用编辑 | boolean | false | 可选 |
| globalConfig | 全局参数，通常是 window._global | object | | 可选 |
| children | 渲染在 Design 内部的额外内容 | node | | 可选 |
| scrollTopOffset | 滚动到顶部时的偏移量 | number \| func | | 可选 |
| scrollLeftOffset | 滚动到左侧时的偏移量 | number \| func | | 可选 |
| className | 额外类名 | string | | 可选 |
| prefix | 类名前缀 | string | | 可选 |

`components` 是一个数组，列出了所有支持的组件，每一项需要指定组件的类型，预览和编辑组件，以及是否可以拖拽、编辑等。 

```js
type Component = {
  // 组件类型，必须唯一
  type: string | string[],

  // 组件类型的默认值
  // 如果 type 是数组，可以传一个下标
  // 如果是函数，不管 type 是字符串还是数组都会调用
  defaultType?: number | (string[] | string) => string

  // 渲染预览部分的组件
  preview: ReactComponent,

  // 渲染编辑部分的组件
  editor: ReactComponent,

  // 预览组件的包裹层  
  previewItem?: ReactComponent,

  // 所有预览界面上的事件都是在这个里面处理的
  previewController?: ReactComponent,

  // 编辑组件的包裹层
  editorItem?: ReactComponent,

  // 组件是否可以拖拽
  dragable?: boolean,

  // 组件是否出现在添加组件的列表里面
  appendable?: boolean,

  // 是否显示右下角的编辑区域(编辑/加内容/删除)
  // 如果要自定义编辑区域，可以通过重写 previewController 的方式来做。
  configurable?: boolean,
  
  // 是否显示删除按钮
  canDelete?: boolean,

  // 是否显示添加组件按钮
  canInsert?: boolean,

  // 组件是否可以编辑
  // 可以选中的组件一定是可以编辑的
  // 不可编辑的组件不可选中，只能展示。
  // 右下角的编辑区域由 configurable 单独控制
  editable?: boolean,

  // 选中时是否高亮
  highlightWhenSelect?: boolean,

  // 组件最多可以添加的实例个数，可以是数字或者一个函数
  // 不传或者传 0 表示没有限制
  // 如果是函数，返回 false 表示不可再添加
  limit?: number | (count: number) => boolean,
  
  // 组件不可再添加后，鼠标移上去的提示
  // 如果是个函数，需要返回一个错误信息
  // 如果 limit 是个正整数，limitMessage 会有一个默认的值：该组件最多添加 xx 个
  // 如果 limit 是个负数，limitMessage 默认为：该组件暂不可用
  limitMessage?: node | (count: number) => node,
  
  // 是否可以添加组件的回调函数，返回一个 Promise，resolve 的话可以创建
  // 添加组件的实例时会调用
  shouldCreate?: (comp: Component) => Promise,

  // 传给 editor 的额外 props
  editorProps: (value: object) => object | object,

  // 传给 preview 的额外 props
  previewProps: (value: object) => object | object
}
```

`value` 是一个数组，数组里面每一项都有一个 `type` 属性，用来标识这个值应该由哪个组件来渲染。

### Design.group 方法

原型：`group(name: string): object`

`Design` 组件支持将可添加的组件分组，只需要在 `components` 数组内适当的位置插入 `Design.group('groupName')` 组件即可。

```
[
  config,

  Design.group('分组1'),
  componentA,
  componentB,

  Design.group('分组2'),
  componentC,
  componentD
]
```

### `settings` 和 `onSettingsChange`

可以传入一个可选的 `settings` 以及相应的 `onSettingsChange` 回调函数，这两个属性会被传递给每一个 Design 组件。

`Design` 预定义个了一个设置：`previewBackground`，`Design` 使用 `settings.previewBackground` 来设置预览区域的背景色。

### Design 实例方法

* `design.validate(): Promise`, 触发校验，如果有错误会 reject，否则 resolve
* `design.markAsSaved()`，标记为以保存状态，如果使用了缓存或者离开提示需要手动调用这个函数通知 Design 更改已经保存

### stripUUID

`Design` 上面有一个 `stripUUID` 方法，数据发送到服务器之前可以使用这个函数来剔除 `Design` 内部使用的 id，这样可以减小数据大小。

使用这个函数是可选的，不剔除也不会有问题，只是传输和存储的数据会稍稍大一点。

### 如何实现新的 Design 组件

每个 Design 组件都分为两部分：Preview 以及 Editor。

Preview 比较简单，实现一个组件接受 `{ value: any, globalConfig: any, design: object }` 这些 props即可。

Editor 请继承 `@youzan/design/lib/base/editor/DesignEditor`，这个基类提供了一些常用的方法（例如 `onChange` 事件的处理函数），在子类里面可以直接使用。

Editor 接受如下props：`{ value: any, onChange: func, showError: boolean, validation: object, design object }`。

- `validate(value): Promise` 有错误的时候 resolve 一个错误对象出来。
- `reorder<T>(array: T[], fromIndex: number, toIndex: number): T[]` 用于在拖拽结束后调整数组内容。
- `props.design` 提供了一下可能有用的方法：例如触发组件的校验等。

Editor 必须提供这几个静态属性：`designType, designDescription, getInitialValue, validate`。

Editor 内部支持使用 [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) 实现拖拽，只需要实现 `shouldHandleDragEnd(type: string): boolean` 以及 `onDragEnd(result)` 即可。`react-beautiful-dnd` 的使用请看官方文档以及 `components/image-ad` 下的示例。

#### 一个例子

```js
// Preview
import React, { PureComponent } from 'react';

export default class NoticePreview extends PureComponent {
  render() {
    const { value } = this.props;

    return (
      <div className="rc-design-component-notice-preview">{value}</div>
    );
  }
}

// Editor
import React from 'react';
import { Input } from 'zent';

import { DesignEditor, ControlGroup } from '@youzan/design/base/editor/DesignEditor';

export const PLACEHOLDER = '请填写内容，如果过长，将会在手机上滚动显示';

export default class NoticeEditor extends DesignEditor {
  render() {
    const { value, showError, validation } = this.props;

    return (
      <div className="rc-design-component-notice-editor">
        <ControlGroup
          label="公告:"
          required
          showError={showError || this.getMetaProperty('content', 'touched')}
          error={validation.content}
        >
          <Input
            name="content"
            placeholder={PLACEHOLDER}
            value={value.content}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
          />
        </ControlGroup>
      </div>
    );
  }

  static designType = 'notice';
  static designDescription = '公告';
  static getInitialValue(settings, globalConfig) {
    return {
      content: '',
      scrollable: false
    };
  }

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { content } = value;
      if (!content || !content.trim()) {
        errors.content = '请填写公告内容';
      }

      resolve(errors);
    });
  }
}
```
