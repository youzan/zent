## Change Log

You can find detailed change logs for versions prior to 3.5.3 at [Github Log](github_changelog#zent-3-5-2-2017-09-07).

### Upgrade guides

- [Upgrade to 3.x](../migrating/3x)
- [Upgrade to 2.1.x](../migrating/21x)

### 6.6.2 (2019-02-26)

- `Form` 
  - 🦀️ Fix field error even if async validation is passed
  - 🦀️ Update `createForm` TypeScript definition
- 🦀️ Handle DOM not exist exception for `Affix` and `Avatar`

### 6.6.1 (2019-01-30)

- 🦀️ Fix bug in `Grid` header scroll

### 6.6.0 (2019-01-29)

- ✨ `Grid` supports head groups
- 🦀️ Fix `undefined` error in `Table`, `Grid` and `WindowResizeHandler`

### 6.5.3 (2019-01-13)

- ✨ `Pop` `position` now supports function value, same as `Popover.Position.create`
- `Form`
  - 📚 Add docs about custom validation function
  - 🦀️ Fix form scroll when using `Fragment`
- 🦀️ Fix `ClampLines` not updating when changing `text`
- 🦀️ Fix use after unmount bug in some components, e.g. `Table`, `Select`, `Grid` and `ClampLines`

### 6.5.2 (2018-12-12)

- ⚠️ Reverts an regression introduced in `6.4.0`. When using `FormSelectField` in `tags` mode, the value in `onChange` callback is broken. `Select` itself is not affected.

### 6.5.1 (2018-12-07)

⚠️ `6.5.2` reverted a regression for `FormSelectField` in `tags` mode.

- ✨ Add a new icon
- `Table`
  - ✨ Support indeterminate state for row selection checkbox
  - 🦀️ Fix right align not working
- 🦀️ Fix `Form` component validation in propTypes definition
- 🦀️ Fix some TypeScript definition bugs

### 6.5.0 (2018-10-29)

⚠️ `6.5.2` reverted a regression for `FormSelectField` in `tags` mode.

⚠️ `Form`'s change may reveal bugs in working code, you can handle these unhandled exceptions in `onSubmitFail`.

- ✨ Add a few new icons
- 🦀️ `Form` will re-throw unhandled exceptions during submit
- 🦀️ Replace `Object.assign` with `lodash/assign`
- 🦀️ Fix incorrect z-index in `SKU`
- 🦀️ Fix `Grid`'s `TypeScript` definition

### 6.4.1 (2018-10-16)

⚠️ `6.5.2` reverted a regression for `FormSelectField` in `tags` mode.

- ✨ `Tabs` can have custom content through `navExtraContent`

### 6.4.0 (2018-09-26)

⚠️ `6.5.2` reverted a regression for `FormSelectField` in `tags` mode.

- ✨ Support `tags` mode in `FormSelectField` (*reverted*)
- 🦀️ Fix `Select` placeholder color
- 🦀️ Fix `Upload` broken style when uploading multiple audio files

### 6.3.0 (2018-09-07)

- ✨ `TimePicker` add `disabledTime` support
- ✨ `Loading` supports show delay
- ✨ Add ES module output
- ✨ `babel-plugin-zent@1.2.1` now has an option to only transform styles imports, use with ES module to support tree shaking(requires bundle tool support)
- `InfiniteScroller`
  - 🦀️ Fix `loadMore` repeatedly get called
  - 🦀️ Fix documentation

### 6.2.0 (2018-08-24)

- 🎉 Add `ClampLines` component
- ✨ `Grid` suppports DnD
- ✨ `Menu` add sub menu click and expand/collapse callback
- 🦀️ Disable input auto complete in `DatePicker`
- 🦀️ Fix bug when initializing `FieldArray`

### 6.1.0 (2018-08-03)

- `Grid` 
  - ✨ Support a default text for each column
  - 🦀️ Fix `selection.getCheckboxProps` not updated
- ✨ Add some new `Icon`s
- ✨ `Cascader` menu trigger can be controlled by `expandTrigger`
- ✨ Add `containerSelector` support for `Pop`
- `Button`
  - ✨ Style update
  - ✨ Add a space between button text iff button text consists of two Chinese characters
- 🦀️ Fix a floating point number parsing issue in `NumberInput`
- 🦀️ Rows in `Table` now can be configured as selected and disabled
- 🦀️ Fix `FieldArray` not updating in `Form`
- 🦀️ Fix lots of `TypeScript` definition issues

### 6.0.1 (2018-07-13)

> ⚠️ `Icon`'s ttf file may be broken on Windows in previous versions, use this version if Windows means a lot to you.

- 🦀️ Fix broken `Icon`s in Windows

### 6.0.0 (2018-07-04)

> React <= 15.3 is no longer supported

> Documentation site is now on [github pages](https://youzan.github.io/zent)

- 💥 [breaking change] Remove `on`, `off` and `newInstance` static methods in `Loadign`
- 💥 [breaking change] Fix `WeekPicker` disable and selection logic
- 💥 [breaking change] `Table` cell now uses `border-box`
- 💥 [breaking change] Remove `zent-select` from `Select` popover, this class should only be on the trigger
- 🎉 New component `Mention`
- 🎉 New component `Timeline`
- 🎉 Rewrite `Tree`, add `useNew` prop to use this new version. APIs are compatible with the old one, and a controlled mode is added in this new version.
- `Form`
  - ✨ `FieldArray` supports calling calling date date manipulation funcitons in a chain, e.g. `push`, `shift`
  - ✨ `DateRangePickerField` and `DateRangeQuickPickerField` supports passing `format` prop to the underlying componets using `dateFormat`
  - ✨ Add missing `DatePicker` related `Field`s，e.g. `FormWeekPickerField`
  - ✨ `FieldArray` supports initialization using `setFieldsValue` and `initialize`
- `Grid`
  - ✨ Add missing `TypeScript` definition
  - ✨ Add support for row expansion using the same `expandation` prop as `Table`
  - ✨ Add a new `onExpand` callback when a row is expanded
  - ✨ Support page size in `onChange` 
  - 🦀️ Remove `cloneDeep` usage，cloning a react element in React 16 results an error
  - 🦀️ Fix `rowKey` not working
  - 📚 Update documentation
- `ErrorBoundary`
  - ✨ Add a new `catchError` HOC，useful when using decorator
  - 📚 Fix `withErrorBoundary` documentation
- `Cascader`
  - ✨ Add `displayText` to customize value display
  - 🦀️ Fix a bug if `value` does not exist
- ✨ `AutoComplete` now handles `TAB`
- ✨ `SplitButton` supports dropdown position configuration
- ✨ `Table` now passes page size in its `onChange` callback
- ✨ `Pagination` now triggers `onPageSizeChange` callback when page size changes
- ✨ The `onChange` callback now supports page size in `Table`
- 🦀️ Fix `BlockHeader` HTML tag nesting bug(a `div` cannot be inside a `p`)
- 🦀️ Fix `Avatar`'s `TypeScript` definition
- 🦀️ Fix `Sortable`'s `TypeScript` definition
- 🦀️ Fix `SplitButton`'s `TypeScript` definition
- 🦀️ Fix `Tabs`'s `TypeScript` definition
- 🦀️ Add a few more icons
- 🦀️ Fix `addonBefore` and `addonAfter` style in `Input`
- 🦀️ Fix a bug in `Swiper` when removing the second last element
- 🦀️ Fix error when closing `Loading` in React 16
- `Dialog`
  - 🦀️ Fix a bug when closing dialog
  - 🦀️ Fix a bug when used in SSR
- 🦀️ Fix some typo in `Button`
- 🦀️ Fix `Collapse` prop type
- 🦀️ Fix `DatePicker` time disable logic
- 🦀️ Fix a bug when calling `focus` in `Select`
- 🦀️ Remove some unused style in `Card`
- 📚 Fix typo `babel`

#### Breaking change workaronds

> `Loading` `on`, `off`, `newInstance` workaround：

Replace `Loading.on` and `Loading.off` with a `Loading` instance, and controll it using component state.

```js
<Loading float show={this.state.loading} />
```

If you use `newInstance`, just render multile `<Loading>` instances.

> `WeekPicker` workaround:

- If you are not using `disabledDate`, then you're mostly fine.
- `WeekPicker` now returns only the dates can be selected, but in old versions it will return the whole week including those disabled dates.
- The `[start, end]` value in `disabledDate` has some change in time part. The `start` has time set to `00:00:00:000` while the `end` has time set to `23:59:59:999`.
- If your code relies on the time part when comparing two `Date` objects, you are likely in trouble with this new bahavior. Either ajust your logic to get the time part correct, or don't rely on time part when comparing two `Date` objects.

> `Table` cell style workaround:

`Table`'s cell `box-sizing` has changed to `border-box`, so you may have to adjust your column width.

> `Select` `zent-select` workaround:

If you rely on `zent-select` when overwriting `Select` popover style, use `zent-select__popover` instead.

### 5.1.1 (2018-04-19)

- 🦀️ Fix missing `Dialog` close animation in some cases
- 🦀️ Fix incorrect `Table` cell width
- 🦀️ Allow non `ControlGroup` in `Form` when scrolling to first error
- ✨ Upgrade `lerna` to latest version

### 5.1.0 (2018-04-17)

- 🎉 New component `ErrorBoundary`, requires `React` >= 16
- 🎉 New component `SplitButton`
- ✨ `previewImage` now supports image zoom
- ✨ `BlockHeader` adds a new prop `childAlign` to control child position
- ✨ Refactor `Portal`, add `PurePortal` and `LayeredPortal`
- ✨ Upgrade DnD library in `Design`
- ✨ Add open/close animation to `Dialog`
- `YearPicker`
  - ✨ Add  `max` and `min` support
  - ✨ `value` supports `Date` type
- 🦀️ Fix `Loading` `height` ignored in some cases
- 🦀️ Fix `BlockHeader` style
- 🦀️ Fix `Popover` wrong position in `React` 16
- 🦀️ Fix `Form` `asyncValidate` not returning `Promise` in some cases
- 🦀️ Fix `Pagination` style
- 🦀️ `tag` mode in `Select` will not scroll when content overflows
- 🦀️ Fix `Cascader` tests in `React` 16
- 📚 Update screenshots in docs

### 5.0.1 (2018-03-20)

- 🦀️ Fix text overflow issues in `WeekPicker`
- 🦀️ Fix some build issues

### 5.0.0 (2018-03-16)

> ⚠️ `Upload` is broken in this version, do NOT use.

> `React` 16 is now offically supported.

- 🎉 Upgrade to `React` 16
- `Button`
  - ✨ Add support for `Icons`
  - ✨ New `Button.Group` component
- ✨ `Steps` now has a new state: `process`, and default state value is changed to `process`
- 🦀️ Fix height bug in `Loading`
- 🦀️ Fix `BlockHeader` style
- `Tree`
  - 🦀️ Fix `expand` not working
  - 📚 Add doc about `loadMore`
- `Upload`
  - ✨ Allow custom error messages through `errorMessages`
  - 🦀️ Move CSS class name to `zent-upload` namespace

### 4.3.2 (2018-03-07)

> ⚠️ `Loading` style is broken in this version, do NOT use.

- 🦀️ Update `Loading` height logic
- 🦀️ Fix text in `Pagination`
- 🦀️ Fix bugs when using nested `Radio` and `Checkbox`
- 🦀️ `Radio` and `Checkbox` will ignore `readonly` and `disabled` settings on itself if it is within a group
- 🦀️ Fix `Upload` style issues

### 4.3.1 (2018-03-05)

- 🦀️ Fix wrong placeholder indentation when using tag style in `Select`
- 🦀️ Fix calling `adjustPosition` in `Popover` in some cases
- 🦀️ Adjust font size in `Tree`
- 🦀️ Fix `Grid` style issues in Windows
- 🦀️ Fix wrong selection in `CopyButton`

### 4.3.0 (2018-02-14)

> Happy Valentine's Day and happy Chinese New Year!

- 🎉 New component `AutoComplete`
- 🎉 New component `Rate`
- 🦀️ Optimize `Notify` animation
- 🦀️ Remove unnecessary `!important` in `Tabs` style
- 🦀️ Fix input focus lost in `Select`

### 4.2.3 (2018-02-09)

- 🦀️ Fix bug in `Sortable` when `items` is missing

### 4.2.2 (2018-02-07)

- ✨ Add vertical style to `Steps`
- 🦀️ Fix header height in `Grid`
- 🦀️ Fix styles missing after build

### 4.2.1 (2018-02-06)

> ⚠️ Styles are broken due to a building problem in this version, do NOT use.

- 🦀️ Fix `Upload` file type bug

### 4.2.0 (2018-02-05)

> ⚠️ Styles are broken due to a building problem in this version, do NOT use.

- 🎉 New component `Avatar`
- 🎉 New component `Collapase`
- ✨ `Menu` adds inline style
- ✨ `Cascader` adds menu style
- ✨ `Input` adds `fromClearButton` in callback event
- ✨ Add missing `TypeScript` definitions
- ✨ `Badge` supports custom offset
- ✨ `NumberInput` supports presss enter to confirm input
- ✨ `onUpload` can return a `Promise` in `Upload`
- 🦀️ Fix a bug in `Sortable` when `onMove`, `onEnd` and `onChange` are present at the same time
- 🦀️ Fix can not start new line in textarea when using `Form`
- 🦀️ Fix styles in `InfiniteScroller`
- 🦀️ Fix keyboard events not working in `Select`
- 🦀️ Fix border style in `Grid`
- 🦀️ Fix infinite loop in `Select`

### 4.1.0 (2018-01-29)

- 🎉 New component: `TimePicker` and `TimeRangePicker`
- 🎉 New compponent: `Placeholder`, a composable placeholder
- 🎉 New documation site
- `Card`
  - ✨ Supports `loading` state
  - ✨ Supports nested cards
  - 🦀️ Update styles
- ✨ Add `canClear` to `DatePicker` to control reset
- `Upload`
  - ✨ Category id can be passed from outside
  - 🦀️ Fix file amount can exceed `maxAmount`
  - 🦀️ Fix auto open bug
- 🦀️ Fix `Notify` background color

### 4.0.0 (2018-01-23)

- 💥 Remove combine mode in `DateRangePicker`, `type` prop is removed.
- `Upload` 
  - ✨ Supports file groups
  - ✨ Supports i18n
- ✨ Add support for icons in `Menu` 
- `DatePicker`
  - 🦀️ Fix minimum time not respected in some cases
  - 🦀️ Fix minimum time test bug
- `Design`
  - 🦀️ Fix styles in demos
  - 🦀️ `DesignEditor` no longer inherits `PureComponent`
- 🦀️ Fix style in `Slider`
- 🦀️ Fix anchor not working in documentation site
- 🦀️ Fix header not synchronized in `Grid`
- 🦀️ Tune `Notify` animation
- `Select`
  - 🦀️ Fix compatibility bug in some browsers
  - 🦀️ Fix `emptyText` not working
- 🦀️ Fix demos in `Sortable`

### 3.12.3 (2018-01-10)

- 🦀️ Fix `Slider` background
- 🦀️ Support `image/bmp` in `Upload`
- 🦀️ Fix button styles and layout in `Design`

### 3.12.2 (2018-01-09)

- ✨ Remove mask background when `Loading` has no `children`
- ✨ Rename files to follow the project naming style
- 🦀️ Fix `Grid` header style
- 🦀️ Fix font size in large `Button`
- 🦀️ Fix year not checked in `MonthPicker`
- 📚 New internationalization documentation

### 3.12.1 (2018-01-05)

- 🦀️ Fix `CombineDateRangePicker` closes before select the second date
- 🦀️ Fix exit animation in `Notify`

### 3.12.0 (2018-01-04)

- 🎉 New component `Sortable`
- 🎉 i18n support for components
- ✨ `Tag` visibility can be controlled using props
- ✨ `Input` supports clear button
- ✨ `Grid` supports scroll with fixed header
- ✨ `Notify` supports pile many instances with enter/leave animation
- `Form`
  - ✨ `Field` supports `displayError` to control error message display
  - ✨ `Field` supports `relatedFields` to specify validation dependencies.
  - ✨ Rewrite `FieldArray`
- ✨ `Swiper` supports add/remove images dynamically
- ✨ `Design` supports `settings` and `onSettingsChange` to manage dynamic global settings
- ✨ `Sweetalert` can configure close button and click on mask to close
- 🦀️ Fix `DateRangePicker` disabled style
- 🦀️ Fix `Loading` not centered
- 🦀️ Fix `DatePicker` wrong value in `onChange` 
- 🦀️ Fix `NumberInput` inconsistent `onBlur` and `onChange` values
- 🦀️ Fix `Upload` image order after uploading
- 🦀️ Fix `Select` item order in tag mode
- 🦀️ Fix can not edit hex in  `ColorPicker` 
- 🦀️ Fix `textarea` height tingle
- 🦀️ Fix some typo
- 🦀️ Fix `yarn new-component` command

### 3.11.0 (2017-12-20)

- 🎉 New component `QuarterPicker`
- ✨ `Select` can have a reset option
- ✨ Support vertical scroll with fixed header in `Grid`
- ✨ No more confirm in `DatePicker` when used without time selection
- ✨ Support image drag-and-drag in `Upload`
- ✨ Support autoresize for `textarea`
- ✨ Support character count in `textarea`
- ✨ Update pop position in `BlockHeader`
- `Design`
  - ✨ New image ad demo
  - ✨ New richtext demo
  - ✨ Allow custom content after preview section
- ✨ Add `onPositionUpdated` to `Popover` and `Pop`
- `Form`
  - ✨ Change `required` rule，`null` is considered an error
  - ✨ Add option to disable form submition triggered by pressing Enter in input
  - 🦀️ Fix rerender when `validationOnChange` is `false`
  - 🦀️ Support functional component in scroll to first error
- `Swiper`
  - 🦀️ Fix bug with only one image
  - 🦀️ Fix animation when quickly click on prev/next button
- 🦀️ Fix image not centered in `Loading`
- 🦀️ Allow `scroll` function to run in `node.js`
- 🦀️ Fix bug when using `batchcomponents` in `Form`
- 📚 Fix `InfiniteScroller` documentation
- 📚 Fix `Button` demo

### 3.10.7 (2017-12-07)

- ✨ Allow custom styles to be applied in `Menu`
- 🦀️ Fix single file uploading in `Upload`

### 3.10.6 (2017-12-06)

- ✨ `Form` supports scroll to first error
- 🦀️ `Upload` adds support for file filter

### 3.10.5 (2017-12-05)

- 🦀️ Revert `Design`'s preview width to `320px`

### 3.10.4 (2017-12-04)

- `Design`
  - ✨ Preview width is now `375px`
  - 🦀️ Update styles
- ✨ `Pop` and `Popover` exports `adjustPosition`, it is rarely needed but can be used to trigger manual position update in some cases.
- 🦀️ Fix `Button` broken style in some cases.
- `Upload`
  - 🦀️ Update styles
  - 🦀️ Fix some ES6 compatibility issues

### 3.10.3 (2017-11-29)

- `Upload`
  - 🦀️ Fix `accept` not working
  - 🦀️ Fix audio uplaod
- 🦀️ Fix `Pagination` style
- `Design`
  - ✨ Update add component button style
  - ✨ Optimize add component
  - 🦀️ Remove auto scroll when adding/removing component

### 3.10.2 (2017-11-28)

- 🦀️ Fix `accept` not working in `Upload`

### 3.10.1 (2017-11-27)

- 🎉 Add a new style for `NumberInput`, just set `showCounter` to `true`
- `Upload`
  - ✨ Enhance file type check
  - ✨ Supports audio upload
  - 🦀️ Fix remove wrong image
- `Design`
  - 🦀️ Fix some style issues
  - ✨ Add `canInsert`, `canDelete` to control Add/Delete button visiblity
- 🦀️ Fix `Form` cannot submit when containing async validations
- 🦀️ Fix `Pop`'s TypeScript definition

### 3.10.0 (2017-11-24)

- 🎉 New `YearPicker` component
- `Design`
  - ✨ New add component UI
  - ✨ Remove dependency on `react-dnd`
- 🦀️ Allow empty data in `Cascader`

If your `Desgin` componets rely on `react-dnd`, you may have to inject `react-dnd`'s context into your app.

```jsx
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

export default class YourApp {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      /* ... */
      </DragDropContextProvider>
    );
  };
}
```

### 3.9.9 (2017-11-22)

- `Design`
  - 🦀️ Fix font color in add component popup
  - 🦀️ Temporarily removed the scroll into screen behavior when selecting a component
- `Form`
  - 🦀️ Fix `FieldArray` validation error after removing element
  - 🦀️ Fix corrupted data in nested `FieldArray`
  - 🦀️ Fix typo in documentation
  - 🦀️ Fix `setFieldsValue` and `initialize` cannot set value to `0`
  - 🦀️ Fix non-submit validation still reports error when `validateOnChange` and `validateOnBlur` both are `false`

### 3.9.8 (2017-11-21)

- 🦀️ Update add/remove component UI in `Design`

### 3.9.7 (2017-11-20)

- 🦀️ Fix grouped style in `Design`

### 3.9.6 (2017-11-20)

- `Design`
  - ✨ Supports tooltip if component count reaches limit
  - ✨ Style updates
- `Input`
  - ✨ Add `select` method to support text selection; and a corresponding `autoSelect` prop
  - 🦀️ Fix styles in `disabled` state
- 🦀️ Fix cannot upload the same image twice in `Upload`
- 🦀️ Fix exceptions when `data` in `undefined` or `null` in `Select`
- 🦀️ Fix disable logic in  `MonthPicker`
- 🦀️ Fix `emptyLabel` type in `Table`
- 🦀️ Fix TypeScript definition for `Button`

### 3.9.5 (2017-11-13)

- ✨ You can search components in doc site now.
- 🦀️ Fix disable logic in  `DatePicker`

### 3.9.4 (2017-11-09)

- 🦀️ Update English documentation

### 3.9.3 (2017-11-09)

- 🎉 New documentation site with English support
- ✨ `Progress` adds the ability to customize colors
- ✨ Form components(`Input`, `Select` etc.) now supports `width=xx` to set width
- ✨ `Notify` now has a `config` method to set duration globally
- ✨ `DatePicker` adds time support in `max` and `min`
- 🦀️ Fix async validations that haven't triggered before not triggered when submitting
- 🦀️ Fix `getBoundingClientRect` errors in `Popover`

### 3.9.2 (2017-11-06)

- ✨ `Design` now supports custom component type when creating new instance
- 🦀️ Fix cross page selection not working in some circumstances
- 🦀️ Fix some compatibility issues in React 16

### 3.9.1 (2017-11-02)

- 🦀️ Fix some style issues in `Design`

### 3.9.0 (2017-10-31)

- ✨ Add global normalization style，just like `normalize.css` and `reset.css`
- `Grid`:
  - 🦀️ Fix `colums` cannot be changed at runtime
  - 🦀️ Fix unmatched height between left and right fixed columns when line height is larger than default height
  - 🦀️ Fix right fixed column's shadow does not disappear when scroll to the right edge
- 🦀️ Fix a variable name in `Design`
- 🦀️ Fix `Form`'s `ControlGroup` cannot render functional component
- 📚 Update this site's styles

### 3.8.1 (2017-10-26)

- 🎉 New demo page, you can find it [here](demos)
- 🎉 A new script to help create new components: `yarn new-component`
- ✨ Support row selection in `Table`, use `canRowSelect` to control this behavior, off by default
- `Design`:
  - 🦀️ Fix `defaultSelectedIndex`'s logic
  - 🦀️ Fix button style in Chrome 62
- 🦀️ Fix `data` unexpectedly mutated in `Select`

### babel-plugin-zent@1.1.0 (2017-10-26)

- ✨ New `useRawStyle` option to support import postcss files, requires Zent >= 3.8.1

### 3.8.0 (2017-10-20)

- 🎉 New component `InfiniteScroller`, implements the scroll-to-load interaction.
- `Form`:
  - 🎉 Add `FormSection` and `FieldArray` support
  - 🎉 Add `setFieldsValue` adn `initialize`
  - 🎉 More builtin form fields: `FormColorPickerField`, `FormDateRangePickerField`, `FormNumberInputField`, `FormSwitchField`
  - 🎉 Add `notice` to `Field` to support notice
  - ✨ Add `setFormDirty` and `isFieldDirty`
- ✨ Some optimizations in `Select`
- ✨ Add support to abort add component operation in `Design`
- ✨ `onBeforeClose` and `onBeforeShow` can abort current operation in `Popover`
- 🦀️ `Slider` now highlights dot and line correctly
- 🦀️ Fix TypeScript definition for `DateRangePicker`
- 🦀 Fix a style issue in `SearchInput`

### 3.7.0 (2017-09-28)

- 🎉 New component `Grid`, a rewrite of `Table` using HTML's `table`, some features are still missing in `Grid`
- 🎉 Zent now supports custom themes, add [Colors](colors) and [Theme](theme) documentations
- `Steps`:
  - ✨ Add support for `onStepChange` and `sequence`
  - ✨ Update UI for `number` style
- 🦀️ Fix warnings with React 16
- 🦀️ Fix warnings in `Slider`'s documentation
- 🦀️ Update styles for `DateRangeQuickPicker`
- 🦀️ Fix selection not reset after reseting `data` in `Select`

### 3.6.1 (2017-09-21)

- 🦀️ Fix a style issue in `Design`

### 3.6.0 (2017-09-21)

- `Design`:
  - ✨ Supports grouped mode in add components area
  - ✨ Supports instance limit for each component
- ✨ `DatePicker` adds `onBeforeConfirm` and `onBeforeClear` hooks
- ️🦀️ Fix select-all checkbox not disabled when there's no selectable rows in `Table`
- 🦀️ Fix incorrect position in `Popover` after scrolling the page
- 🦀️ Fix disabled month is still selectable in `MonthPicker`

### 3.5.4 (2017-09-15)

- `Swiper`：
  - 🦀️ Fix UI issue when there's only one slide
  - 📚 Add instance API in documentaion
- 🦀️ Fix select-all not working in cross page mode in `Table`
- 🦀️ Revert `Select`'s width style
- 🦀️ Fix `beforeunload` callback leaks in `Design`
- 🦀️ Fix Typescript definition for `Tabs`
- 📚 Add [contribute guide](contribute) in this site

### 3.5.3 (2017-09-13)

- 🦀️ Fix `z-index` issue when opening more than two `Dialog`s
- 🦀️ Fix today is not included in the last 7 days in `DateRangeQuickPicker`
- 🦀️ Fix tab cannot be selected when `activeId` is zero in `Tabs`
- 🦀️ Fix missing form validation errors if `validateOnChange` and `validateOnBlur` are both set to `false` in `Form`
- `Table`:
  - 🦀️ Fix missing `clearfix` style
  - 🦀️ Fix `totalItem` not respected
  - 📚 Fix `title` type description
- 🦀️ Fix `Select`'s height
