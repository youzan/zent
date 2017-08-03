## design 微页面编辑组件

微页面编辑组件，用所见即所得(WYSIWG)的方式创建内容丰富的富文本页面。

### 代码演示

:::demo 基础用法
```js
import { Design, Button, Layout, Notify } from 'zent';

// ⚠️注意：这个示例里面代码的引入和实际使用时有一些区别。

// Please replace 'design/...' with 'zent/lib/design/...' in your own code
import configConf from 'design/components/config';
import ConfigEditor from 'design/components/config/ConfigEditor';
import whitespaceConf from 'design/components/whitespace';

// 我们仅仅提供了少数几个 Design 组件作为示例，更多业务组件需要根据你的业务需求自己实现。
// If you use these two default design components, you have to 
// manually include the styles in your own code:
// import 'zent/css/design-config.css';
// import 'zent/css/design-whitespace.css';

const { Row, Col } = Layout;

const components = [
	Object.assign({}, configConf, {
		 // 是否可以拖拽
    dragable: false,

    // 是否出现在底部的添加组件区域
    appendable: false,

    // 是否可以编辑，UMP里面有些地方config是不能编辑的
    // editable: true,

    configurable: false,

    highlightWhenSelect: false
	}),
	whitespaceConf
];

class Simple extends Component {
  state = {
    value: [
      {
        type: configConf.type,
        ...ConfigEditor.getInitialValue()
      }
    ]
  };

  onChange = newValue => {
    this.setState({
      value: newValue
    });
  };

  render() {
    return (
      <div>
        <Design
          ref={this.saveDesign}
          cache
          cacheId="zent-design-test"
          confirmUnsavedLeave={false}
          components={components}
          value={this.state.value}
          onChange={this.onChange}
					scrollTopOffset={-270}
          globalConfig={window._global}
        />
        <Row className="design-example-actions">
          <Col span={2} offset={1}>
            <Button type="primary" onClick={this.submit}>
              上架
            </Button>
					</Col>
					<Col span={2} offset={1}>
						<Button onClick={this.notImplemented}>
							保存草稿
						</Button>
					</Col>
					<Col span={2} offset={1}>
						<Button onClick={this.notImplemented}>
							预览
						</Button>
          </Col>
        </Row>
      </div>
    );
  }
	
	notImplemented() {
		Notify.error('仅作为演示，功能未开发');
	}

  saveDesign = instance => {
    this.design = instance.getDecoratedComponentInstance();
  };

  triggerDesignValidation() {
    return this.design.validate();
  }

  submit = () => {
    this.triggerDesignValidation()
	.then(() => {
    	// submit this.state.value to server
		this.design.markAsSaved();
		Notify.success('提交成功');
	})
	.catch(validations => {
      console.log(validations);
    });
  };
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
:::

### 设计

`design` 目录下面是框架结构，`Design` 组件负责数据分发和更新，整个组件分为 `Preview` 和 `Editor` 两部分。

`Design` 的重要参数有一下几个：

| 参数 | 说明 | 类型 | 默认值 | 是否必须 |
|------|------|------|--------|--------|
| components | 所有组件的定义数组 | array | [] | 必须 |
| value | 组件当前的值 | array | [] | 可选 |
| onChange | 组件值修改时触发的回调函数 | func(value: array): void | 必须 |
| defaultSelectedIndex| 默认选中的下标（value）| number | -1 | 可选 |
| preview | 用于自定义整个 Design 的渲染 | Component | DesingPreview | 可选 |
| confirmUnsavedLeave| 有未保存数据关闭窗口时需要用户确认 | boolean | true | 可选 |
| cache | 是否将未保存的数据暂存到 localStorage 中 | boolean | false | 可选 |
| cacheId | 配合 cache 使用，用于设置 Design 示例的缓存 id | string | | cache 为 true 时必填 |
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
	type: string,

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
	// 不支持在这里配置编辑区域的按钮，参数太多。
	// 如果要自定义编辑区域，可以通过重写 previewController 的方式来做。
	configurable?: boolean,

	// 组件是否可以编辑
	// 可以选中的组件一定是可以编辑的
	// 不可编辑的组件不可选中，只能展示。
	// 右下角的编辑区域由 configurable 单独控制
	editable?: boolean,

	// 选中时是否高亮
	highlightWhenSelect?: boolean,

	// 传给 editor 的额外 props
	editorProps: (value: object) => object | object,

	// 传给 preview 的额外 props
	previewProps: (value: object) => object | object
}
```

`value` 是一个数组，数组里面每一项都有一个 `type` 属性，用来标识这个值应该由哪个组件来渲染。

### Design 实例方法

* `design.validate(): Promise`, 触发校验，如果有错误会 reject，否则 resolve
* `design.markAsSaved()`，标记为以保存状态，如果使用了缓存或者离开提示需要手动调用这个函数通知 Design 更改已经保存

### 如何实现新的 Design 组件

每个 Design 都分为两部分：Preview 以及 Editor。

Preview 比较简单，实现一个组件接受 `{ value: any, globalConfig: any, design: object }` 这些 props即可。

Editor 请继承 `@youzan/design/lib/base/editor/DesignEditor`，这个基类提供了一些常用的方法（例如 `onChange` 事件的处理函数），在子类里面可以直接使用。

Editor 接受如下props：`{ value: any, onChange: func, showError: boolean, validation: object, design object }`。

Editor 必须提供这几个静态属性：designType, designDescription, getInitialValue, validate。

`validate(value): Promise` 有错误的时候 resolve 一个错误对象出来。

`props.design` 提供了一下可能有用的方法：例如触发组件的校验等。

一个例子

```js
// Preview
import React, { PureComponent, Component } from 'react';

export default class NoticePreview extends (PureComponent || Component) {
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
  static getInitialValue() {
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

#### 预览

`DesignPreview` 组件是整个预览块的包裹层，负责渲染左侧预览的框架。`DesignPreview` 和 `config` 子组件是相关的，`config` 组件是知道 `DesignPreview` 的存在的；而 `DesignPreview` 的渲染是根据 `config` 生成的数据进行的。⚠️注意：`config` 自身有相应的负责渲染预览的模块，这个和 `DesignPreview` 不冲突，可以理解成 `config` 可以控制一些预览界面的全局样式。

预览界面中按模块分成很多区域，每个区域是一个 `DesignPreviewItem`，默认的 `DesignPreviewItem` 实现可以由外部覆盖。负责每个区域的事件交互的是另一个组件 `DesignPreviewController`，这个组件负责处理添加、删除、编辑、选中以及拖拽操作，`DesignPreviewController` 的实现也是可以由外部覆盖的，⚠️注意：重写的时候所有交互都需要再这个组件里面处理。`DesignPreviewController` 内部会渲染该区域对应组件的预览模块，预览模块有两个参数：`value` 和 `design`。`value` 是当前的值，`design` 是 `Design` 组件提供的一些操作，一般用不到。

#### 编辑

`DesignEditorItem` 是每个区域对应的编辑区域，这个区域的显示隐藏由 `Design` 控制。`DesignEditorItem` 可以由外部覆盖重写。

`DesignEditorAddComponent` 这个组件负责枚举所有**可以添加的组件**，暂不支持由外部自定义组件实现。

`DesignEditor` 是所有编辑组件的基类，这个类提供了一些常用的方法（例如 `onChange` 事件的处理函数），在子类里面可以直接使用。

<style>
.design-example-actions {
	margin-top: 20px;
}
</style>
