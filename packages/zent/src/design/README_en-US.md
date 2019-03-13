---
title: Design
path: component/design
group: Domain-specific
---

## Design

Please use `@zent/design`

H5 page editor, build your H5 pages in a WYSIWYG way.

### API

| Property | Description | Type | Default | Required |
|------|------|------|--------|--------|
| components | All available components in Design | array | [] | Yes |
| value | Current value | array | [] | Yes |
| onChange | Callback when value changes | func(value: array): void | Yes |
| settings | Design settings, will be passed to every Design component | object | | No |
| onSettingsChange | Callback to change settings | func | | No |
| defaultSelectedIndex| Default selected index in value array | number | -1 | No |
| preview | Custom Preview component | Component | DesingPreview | No |
| previewFooter | Custom footer after preview section | node |  | No | 
| confirmUnsavedLeave| Show a confirm dialog if there're unsaved changes | boolean | true | No |
| cache | Cache unsaved changes to `localStorage` | boolean | false | No |
| cacheId | Cache id, must be used with `cache` | string | | Yes if `cache` is `true`, No otherwise |
| cacheRestoreMessage | Message to restore cache from `localStorage` | node | 提示：在浏览器中发现未提交的内容，是否使用该内容替换当前内容？ | No |
| disabled | Is Design disabled | boolean | false | No |
| globalConfig | Global config across Design | object | | No |
| children | Additional children inside Design | node | | No |
| scrollTopOffset | Top scroll offset | number \| func | | No |
| scrollLeftOffset | Left scroll offset | number \| func | | No |
| className | Custom class name | string | | No |
| prefix | Custom prefix | string | | No |

`components` is an array, all available componets should be included in this array. Each item in this array is a component description, here are the possible options.

```js
type Component = {
  // Component type, must be unique
  type: string | string[],
  
  // Default component type
  // If `type` is an array, `defaultType` can be a number
  // If `defaultType` is a function, it will be called with `type` as the sole argument
  defaultType?: number | (string[] | string) => string

  // Component to render preview
  preview: ReactComponent,

  // Component responsible for editing
  editor: ReactComponent,

  // Preview component container 
  previewItem?: ReactComponent,

  // Preview controller, responsible for dnd, select and so on
  previewController?: ReactComponent,

  // Editor component container
  editorItem?: ReactComponent,

  // Is this component dragable?
  dragable?: boolean,

  // Should this component appear in the component list?
  appendable?: boolean,

  // Is this component configurable(add/delete on the bottom right corner)?
  configurable?: boolean,
  
  // show delete button
  canDelete?: boolean,

  // show add button
  canInsert?: boolean,

  // Is this component editable? Only editable components are selectable
  editable?: boolean,

  // Highlight preview when selected
  highlightWhenSelect?: boolean,

  // Maximum number of instances this component can have
  // Zero is no limit
  // If passing a function, return false to stop adding more
  limit?: number | (count: number) => boolean,
  
  // Tooltip when a component reaches its limit
  // If limit is a number, limitMessage has a default value.
  limitMessage?: node | (count: number) => node,
  
  // Callback when adding a new instance for component
  // Add only if Promise resolves.
  shouldCreate?: (comp: Component) => Promise,

  // Additional props passed to editor
  editorProps: (value: object) => object | object,

  // Addtional props passed to preview
  previewProps: (value: object) => object | object
}
```

Each item in `value` array must have a `type` property, `Design` uses this property to determine why component in `component` array should be used to render this value.

### Design.group

Declaration：`group(name: string): object`

`Design` supports component grouping in add component area, all you have to do is insert `Desgin.group(groupName)` to the right place in your `components` array.

```js
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

### `settings` and `onSettingsChange`

You can pass in a `settings` object and a corresponding `onSettingsChange` callback. This two props will be pass to every Design component.

There's a predefined setting called `previewBackground`, Design will use this value as the preview background.

### Design Instance Methods

* `design.validate(): Promise`, trigger a validation, resolves only if there's no erro.
* `design.markAsSaved()`, tell `Desgin` data has been saved.

### stripUUID

There's a `stripUUID` method on `Design` instance, you can use this method to strip all internal ids used by `Design` before sending data to server. This may help reduce data size.

Note: calling `stripUUID` before sending data to server is optional.

### How to Implement new Design Component?

Each Desgin component are divided in two parts: Preview and Editor.

Preview is just a component which accepts `{ value: any, globalConfig: any, design: object }` as props and renders a UI with these props.

It is a little bit complex about Editor component. You are recommended to extend the `@youzan/design/lib/base/editor/DesignEditor` base class, this class has some useful methods you can use(e.g. `onChange` event handlers).

Editor has these props:

`{ value: any, onChange: func, showError: boolean, validation: object, design object }`

- `validate(value): Promise` You should resolve an error object if there're errors
- `reorder<T>(array: T[], fromIndex: number, toIndex: number): T[]` Reorder array after drag
- `props.design` There're some useful methods on this prop

A editor component must have these static properties: 

`designType, designDescription, getInitialValue, validate`

You can use [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) to implement drag-and-drop inside an editor, implement these two functions in your editor: `shouldHandleDragEnd(type: string): boolean` and `onDragEnd(result)`. Check `react-beautiful-dnd`'s documentation for detailed instructions. There's also a demo in `components/image-ad`.

#### Example

```jsx
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
