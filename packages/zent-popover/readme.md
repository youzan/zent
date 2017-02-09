# @youzan/zent-popover

通用的可定位弹层，可以自定义触发方式、弹层显示方式以及定位算法。

[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-popover.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-popover.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-popover

## 组件设计

这是一个通用的基础组件，是基于`Portal`的一个可定位组件，可以用来实现有交互或者定位需求的弹层，比如select, tooltip等。

组件由三个部分组成：

* Trigger, 用来控制弹层的触发逻辑，内置三个实现：click, hover, focus，除此以外可以实现任意自定义的trigger。
* Position: 用来控制弹层的定位逻辑，内置12种定位（4 x 3，每个方位三种），可以实现自定义的定位。
* Content: 用来控制弹层的绘制，内置一种基于`Portal`的实现。

使用示例：

```jsx
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

API 主要分为几块：`Popover`, `Trigger`, `Content`, `Position`以及一些工具函数。

### `Popover` API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| position | 定位的方式，参见`Popover.Positon` | `Positon` | | |
| cushion | 定位的偏移量，通常用来预留空间给小箭头等东西 | number | `0` | |
| display | 在文档流里的出现形式 | string | `'block'` | 所有CSS中合法的`display`值 |
| onShow | 弹层显示后的回掉函数 | func | noop | |
| onClose | 弹层关闭后的回掉函数 | func | noop | |
| onBeforeShow | 弹层打开前的回掉函数 | func | noop | |
| onBeforeClose | 弹层关闭后的回掉函数 | func | noop | |
| containerSelector | 弹层的父节点CSS selector | string | 'body' | 所有合法的CSS selector |
| className | 自定义额外类名 | string | '' | '' |
| prefix | 自定义前缀 | string | 'zent' | null |

### `Trigger` API

每个trigger都可以有特有的API来控制行为，实现自定义trigger的时候可以按需指定trigger的参数。

#### `Trigger.Click` API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| autoClose | 是否点击‘外面’自动关闭弹层 | bool | `true` | `false`, `true` | 
| isOutside | 判断一个节点是否在‘外面’，点击在外面会关闭弹层。默认trigger和弹层以外的节点都是‘外面’ | func: Node => bool | () => false | |


#### `Trigger.Hover` API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| showDelay | 打开弹层前的延迟（单位毫秒），如果在这段时间内鼠标移出弹层范围，弹层不会打开 | number | `150` | | 
| hideDelay | 关闭弹层前的延迟（单位毫秒），如果在这段时间内鼠标重新移入弹层范围，弹层不会关闭 | number | `150` | | 
| isOutside | 判断一个节点是否在‘外面’。默认trigger和弹层以外的节点都是‘外面’ | func: Node => bool | () => false | |


#### `Trigger.Focus` API

这个trigger没有参数

#### `Trigger.Base`

所有trigger的基类，实现自定义trigger需继承这个类，继承时一般需要重写`getTriggerProps`方法给trigger添加事件，然后在事件
处理函数中打开／关闭弹层。

Trigger的`props`上有以下API可以在基类中使用。

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| getTriggerNode | 获取trigger的DOM node | func: () => Node | | | 
| getContentNode | 获取弹层的DOM node | func: () => Node | | | 
| open | 打开弹层 | func: () => () | | |
| close | 关闭弹层 | func: () => () | | |
| contentVisible | 弹层当前是否打开 | bool | | |
| onTriggerRefChange | trigger的ref改变的时候需要调用的回掉函数，只有在重写render函数的时候需要这个函数 | func: instance => () | | |


### Content API

没有参数，弹层的内容写在`Content`里。


### Position API

Positon是用来给弹层定位的，内置12种定位，可以自定义定位算法。`Popover`上的`cushion`参数会影响定位，通常用来加上一定量的偏移量。

```text
                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

#### Position.create

通过这个工厂函数创建自定义的position，这个函数接受一个函数作为参数，函数的原型：

```
type Position = {
	getCSSStyle: () => object,
	name: string
}

(anchorBoundingBox, containerBoundingBox, contentDimension, options) => Position
```

示例：

```javascript
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

这个高阶组件暴露了Popover内部的几个重要方法，可能的使用场景：在Content内部手动关闭弹层。

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| getTriggerNode | 获取trigger的DOM node | func: () => Node | | | 
| getContentNode | 获取弹层的DOM node | func: () => Node | | | 
| open | 打开弹层 | func: () => () | | |
| close | 关闭弹层 | func: () => () | | |

示例：

```javascript
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
