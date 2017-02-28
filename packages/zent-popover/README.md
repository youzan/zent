# zent-popover

[![npm version](https://img.shields.io/npm/v/zent-popover.svg?style=flat)](https://www.npmjs.com/package/zent-popover) [![downloads](https://img.shields.io/npm/dt/zent-popover.svg)](https://www.npmjs.com/package/zent-popover)

弹层组件, 支持定位, 支持自定义触发方式、显示方式及定位算法.

## 使用场景

实现有交互或者定位需求的弹层

## 组件原理



#### 基于 zent-portal

组件由三个部分组成：

-  Trigger: 用来控制弹层的触发逻辑, 内置三个实现: click, hover, focus, 除此以外可以实现任意自定义的 trigger.

-  Position: 用来控制弹层的定位逻辑, 内置12种定位 (4 x 3, 每个方位三种), 同时支持自定义定位.

-  Content: 用来控制弹层的内容, 基于 zent-portal 实现.

#### 使用示例:

```js
<Popover position={Popover.Position.BottomLeft} display="inline">
  <Popover.Trigger.Click>
    <button>click me</button>
  </Popover.Trigger.Click>
  <Popover.Content>
    <div>popover content</div>
    <div>line two</div>
  </Popover.Content>
</Popover>
```

## API

API 主要以下几个部分:

### Popover

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| position | 定位的方式, 参见 `Popover.Positon` | Positon | | |
| cushion | 可选, 定位的偏移量, 通常用来预留空间给小箭头等东西 | number | `0` | |
| display | 可选, 在文档流里的出现形式 | string | `'block'` | 所有CSS中合法的 `display` 值 |
| onShow | 可选, 弹层显示后的回调函数 | func | `noop` | |
| onClose | 可选, 弹层关闭后的回调函数 | func | `noop` | |
| onBeforeShow | 可选, 弹层打开前的回调函数, 只有用户触发的打开操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | |
| onBeforeClose | 可选, 弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | |
| containerSelector | 可选, 弹层的父节点CSS selector | string | `'body'` | 所有合法的CSS selector |
| visible | 可选, 手动控制弹层的显示隐藏, 必须和 `onVisibleChange` 一起使用 | bool | | |
| onVisibleChange | 可选, 手动控制时的回调函数, 必须和`visible`一起使用, 只有用户手动触发的打开／关闭操作才会调用 | func | | |
| className | 可选, 自定义额外类名 | string | `''` |  |
| wrapperClassName | 可选, trigger外层包裹div的类名 | string | `''` |  |
| prefix | 可选, 自定义前缀 | string | `'zent'` |  |

### Trigger

每种 trigger 都有特有的 API 来控制组件行为, 自定义 trigger 可以按需指定 trigger 的参数.

#### Trigger.Click

| 参数        | 说明                                               | 类型                   | 默认值           |
| --------- | ------------------------------------------------ | -------------------- | ------------- |
| autoClose | 可选, 是否点击‘外面’自动关闭弹层                                   | bool                 | `true`        |
| isOutside | 可选, 判断一个节点是否在‘外面’, 点击在外面会关闭弹层。默认trigger和弹层以外的节点都是‘外面’ | func: (node) => bool | `() => false` |

#### Trigger.Hover

| 参数        | 说明                                       | 类型                   | 默认值           |
| --------- | ---------------------------------------- | -------------------- | ------------- |
| showDelay | 可选, 打开弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标移出弹层范围, 弹层不会打开   | number               | `150`         |
| hideDelay | 可选, 关闭弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标重新移入弹层范围, 弹层不会关闭 | number               | `150`         |
| isOutside | 可选, 判断一个节点是否在‘外面’。默认trigger和弹层以外的节点都是‘外面’    | func: (node) => bool | `() => false` |

#### Trigger.Base

所有trigger的基类, 实现自定义 trigger 需继承这个类, 继承时一般需要重写 `getTriggerProps` 方法给 trigger 添加事件, 然后在事件
处理函数控制弹层的开/闭.

| 参数                 | 说明                                               | 类型                     |
| ------------------ | ------------------------------------------------ | ---------------------- |
| getTriggerNode     | 获取trigger的DOM node                               | func: () => node       |
| getContentNode     | 获取弹层的DOM node                                    | func: () => node       |
| open               | 打开弹层                                             | func                   |
| close              | 关闭弹层                                             | func                   |
| contentVisible     | 弹层当前是否打开                                         | bool                   |
| onTriggerRefChange | trigger的ref改变的时候需要调用的回掉函数, 只有在重写 render 函数的时候需要这个函数 | func:(instance) |

### Position API

Positon用于给弹层提供定位的, 内置12种定位, 可以添加自定义定位算法. Popover 上的 `cushion` 参数会影响定位, 通常用来提供一定量的偏移量。

```text
                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

#### Position.create

通过这个工厂函数创建自定义的 position, 这个函数接受一个函数作为参数, 函数的伪代码:

```
type Position = {
	getCSSStyle: () => object,
	name: string
}

(anchorBoundingBox, containerBoundingBox, contentDimension, options) => Position
```

示例：

```js
const position = Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  return {
    getCSSStyle() {
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        opacity: 0
      };
    },

    name: 'position-example'
  };
});
```

### withPopover 高阶组件

这个高阶组件暴露了Popover内部的几个重要方法, 可能的使用场景: 在Content内部手动关闭弹层.

| 参数             | 说明                    | 类型               |
| -------------- | --------------------- | ---------------- |
| getTriggerNode | 获取 trigger 的 DOM node | func: () => node |
| getContentNode | 获取弹层的 DOM node        | func: () => node |
| open           | 打开弹层                  | func             |
| close          | 关闭弹层                  | func             |

示例：

```js
// 点击close按钮可以关闭弹层
const HoverContent = withPopover(function HoverContent({ popover }) {
  return (
    <div>
      <div>popover content</div>
      <button onClick={popover.close}>close</button>
    </div>
  );
});

<Popover position={Popover.Position.RightTop} display="inline">
  <Popover.Trigger.Hover showDelay={500} hideDelay={200}>
    <button style={{ marginLeft: 100 }}>hover on me</button>
  </Popover.Trigger.Hover>
  <PopoverContent>
    <HoverContent />
  </PopoverContent>
</Popover>
```
