## Change Log

You can find detailed change logs for versions prior to 3.5.3 at [Github Log](github_changelog#zent-3-5-2-2017-09-07).

### Upgrade guides

- [Upgrade to 9.x](./changelog-v9)
- [Upgrade to 7.x](./changelog-v7)
- [Upgrade to 3.x](../migrating/3x)
- [Upgrade to 2.1.x](../migrating/21x)

### 9.8.0(2021-07-15)

- ✨ Rework all icons with a few new icons
- 🦀️ Fix UI not updated when `selection` changes in `Grid`
- 🦀️ Fix `Select` popup width when changing from `display: none` at mount to visible
- 🦀️ Rewrite and cleanup `eslint` rules
- 📚 Migrate site layout backbone to `TypeScript`

### 9.7.3(2021-07-02)

- 🦀️ Expose `file` and `id` properties in `Upload` file object, `_file` and `_id` are still there
- 🦀️ Fix `bootstrap` script
- 📚 Replace `useMAppend` with `useMulti` in `Form` documentation
- Update dependencies
	- `TypeScript` `4.1` to `4.3`
	- `rxjs` `v6` to `v7`
	- `sortablejs` `1.12.0` to `1.13.0`
	- `webpack` `v4` to `v5`, this improves dev mode compile performance
	- `jest` `v24` to `v27`
	- `postcss` `v6` to `v8`
	- Upgrade all other dependencies to the latest versions
- 📚 Replace `react-refresh-webpack-plugin` with `@hot-loader/react-dom`

### 9.7.2(2021-06-25)

- 🦀️ Fix `Tag` cannot be used as `Pop`'s trigger
- 🦀️ Fix `Now` button disable logic in `DatePicker`
- 🦀️ Update `caniuse-lite` database to latest version
- 📚 Fix missing demos in `DataPicker` English documentation

### 9.7.1(2021-06-17)

- `Form`
  - 🦀️ Add use-after-free check in models
  - 🦀️ Fix performance warning text typo
  - 📚 Add model API in documentation
  - 📚 Update `destroyOnUnmount` description in documentation
- 📚 Add long text FAQ in `Pop` documentation

### 9.7.0(2021-06-04)

- ✨ Allow `Field` and `FieldArray` hooks to be used without form context if using `Model` as argument. `FieldSet` hooks always require a form context.
- ✨ Allow referencing models using names in `Model` mode, it was only possible in `View` mode.
- ✨ Deprecate `useModelValue` and `useModelValid`, use `useFieldValue` and `useFieldValid` instead.
- ✨ Add `builder` property to all model objects, only available in `Model` mode
- ✨ Expose `removeChild` and `registerChild` in `FieldSetModel` and `FormModel`
- ✨ Overload `push`, `unshift` and `splice` method in `FieldArrayModel` to allow using model objects as arguments
- ✨ Add `useNamedChildModel` to subscribe child model remove/register actions
- 📚 Update docs with a new demo showing how to add or remove child models in `Model` mode

### 9.6.0(2021-05-28)

- ✨ Add `threshold` to `InfiniteScroller` to control the distance before the end of the items that will trigger a call to `loadMore`
- ✨ Support controlled mode for menu selection and expansion in `inline` `Menu`
- ✨ Support inline `style` in `Checkbox`
- 🦀️ Fix trigger and popup widths not in sync when `width` is not a number and `popupWidth` is not set in `Select`
- 📚 Update `Collapse` typings and docs

### 9.5.0(2021-05-07)

- ✨ Support non `window` container in `Affix`
- ✨ Add `ref` support to `InfiniteScroller`
- `Form`
  - ✨ Support customize scroll DOM node in `willScrollToError`
  - 🦀️ Remove `null` in `ArrayBuilder` typings
  - 🦀️ Internal code path no longer triggers subscription performance warnings
- 🦀️ Fix incorrect handling of `Fragment` in `Popover` triggers
- 🦀️ Fix incorrect handling of `Fragment` in `ButtonDirective`
- 🦀️ Fix `onChange` not fired within `IMEComposition` in some browsers, e.g. Safari
- `Grid`
  - 🦀️ Update single/multiple/expand column styles
  - 🦀️ Rename `nowrap` to `noWrap` in column config, `nowrap` still works
  - 📚 Remove `Table` comparison in documentation
- 📚 Update `Form` documentation

### 9.4.2(2021-03-26)

- 🦀️ Change `children` to optional in `Badge` TS definition
- 🦀️ Upgrade `@wojtekmaj/enzyme-adapter-react-17` to latest version
- `Upload`
  - 🦀️ Fix `getUploadSuccessOverrideProps` not working
  - 🦀️ Fix typos in code and doc
- `Form`
  - 🦀️ Add warning when setting default value in `props.props` in `FormInputField`, `FormImageUploadField` and `FormUploadField`
  - 📚 Fix issues caused by using array index as `key` in `Model` strategy example
  - 📚 Restructure documentation for better readbility
- 📚 Fix crash in `Select` virtual scroll demo
- Documentation
  - 📚 Add sync to Gitee Pages step in Github Action
  - 📚 Send Wechat Work notification after releasing a new version in Github Action
  - 📚 Update logo and design site link

### 9.4.1(2021-03-11)

- ✨ Export `useFormChild` in `Form`
- 🦀️ Fix incorrect selection state after `options` changes in `Cascader`
- 📚 Use relative url for links to old versions of docs
- 📚 Upgrade `prismjs` to fix security issues
- 📚 Add `Dialog` UI changes to breaking changes in `v9` change log

### 9.4.0(2021-02-26)

- ✨ `Popover` / `Pop` / `Tooltip` hover mode handles disabled `input` and `button` correctly, but only with zent native inputs and buttons
- `Select`
  - ✨ Add `meta` `onKeywordChange` to distinguish event source
  - 🦀️ Suppress `onChange` events during IME composition

### 9.3.0(2021-01-28)

- ✨ `MenuCascader` supports selection merge with `simplifySelection`
- `Form`
  - ✨ Add`clearError` to form models
  - ✨ Add two new hooks `useModelValue` and `useModelValid` which don't rely on `FormContext`
- 📚 Add missing description of `Table` in v9 changelog

### 9.2.0(2021-01-21)

- ✨ `Grid` now supports single selection
- `DatePicker`
  - 🦀️ Fix year and month selection disable logic
  - 🦀️ Update UI interaction in `CombinedDatePicker`
  - 🦀️ `disabled` and `canClear` in `DateRangePicker` can be an array
- 🦀️ Fix `min` and `max` not working in `DateRangeQuickPicker`
- 🦀️ Fix typings in `Select`, `Switch` and `CheckboxGroup`
- 🦀️ Fix React warning in `Form` with `willScrollToError`
- 🦀️ Update arrow style in `Select` and `Cascader`

### 9.1.2(2021-01-11)

- 🦀️ Fix incorrect checkbox state in `Grid`
- 🦀️ Fix `expandAll` not reacting to props change in `Tree`
- 🦀️ Fix `FormInputField` demo in `Form` doc

### 9.1.1(2021-01-05)

- ✨ Add a new icon
- `Form`
  - ✨ Supports custom offsets through `willScrollToError` when scrolling to first error
  - 🦀️ Changed vertical margin between fields to 24px

### 9.1.0(2020-12-21)

- 💥 Fix generic types in `Select`, from one type parameter to two type parameters, `Select<ISelecItem<number>>` => `Select<number>`
- ✨ New simple file upload component
- ✨ Supports custom step in `NumberInput`
- 🦀️ Fix border style issue in disabled `Button`

### 9.0.2(2020-12-18)

- ✨ `Swiper` supports custom previous/next button

### 9.0.1(2020-12-18)

- `Select`
  - ✨ Add value reviver support to Select
  - ✨ Support custom tag list render in multiple mode
- `Grid`
  - ✨ `batchRender` adds position information
  - 🦀️ Fix incorrect height with float grouped header
- 🦀️ `DateRangeQuickPicker` formats the endtime of today to current time

### 9.0.0(2020-12-14)

See [Upgrade to 9.x](./changelog-v9).

### 8.6.3(2021-03-19)

- 🦀️ Fix `onUpload` return value being ignored in `Upload`

### 8.6.2(2021-01-11)

- 🦀️ Fix `expandAll` not reacting to prop change in `Tree`

### 8.6.1(2020-12-18)

- `Grid`
  - 🦀️ Fix the fixed cloumns' height when head groups
  - 🦀️ `batchRender` supports second optional parameter about position

### 8.6.0(2020-12-15)

- ✨ Supports `rgba` in theme colors
- 🦀️ Adjust `Radio` right margin to `24px`

### 8.5.12(2020-11-05)

- 🦀️ Fix wrong file order when uploading in `Upload`
- 🦀️ Fix custom row component prop type in `Grid`

### 8.5.11(2020-10-28)

- 🦀️ Fix type definitions in `Form`
- 🦀️ Fix `WindowEventHandler` compatibilty issue with SSR
- 🦀️ Hide clear button when `Input` is not editable

### 8.5.10(2020-10-22)

- Fix a bug that prevents moving an item to the front in `Sortable`

### 8.5.9(2020-10-12)

- `Form`
  - 🦀️ Fix cannot assign value to `FormModel.prototype.owner`
  - 🦀️ Optimize async subscribe logic in `value-listener`
  - 🦀️ Optimize TypeScript definitions
- 🦀️ Fix incorrect handleing of `disabled` in `Button`
- 🦀️ Fix runtime error in `Portal` when used in SSR mode
- 🦀️ Fix `ClampLines` render issues when text is empty

### 8.5.8(2020-09-11)

- 🦀️ Adjust space between succesive `Button`s
- `Form`
  - ✨ Add `form.resetValue` to reset all fields to `initialValue`
  - 🦀️ Fix unnessary creation of `ZentForm`
- `Input`
  - ✨ Add a new `onIconClick` callback
  - ✨ `TextareaInput` add `maxCharacterCount` prop to support textarea's value out of range

### 8.5.7(2020-08-28)

- 🦀️ Fix `Progress` of `circle`'s `normalColor`, `successColor`, `exceptionColor` and `strokeWidth` not working

### 8.5.6(2020-08-21)

- 🦀️ Fix `Slider` value out of range
- 🦀️ Adjust space between succesive `Checkbox`s
- `Form`
  - 🦀️ Export `IMaybeError` and `ValidatorContext`
  - 🦀️ Fix `FormSelectField` type definition

### 8.5.5(2020-08-14)

- ✨ `Loading` has a new prop `colorPreset`
- ✨ `ColorPicker` now supports `disabled`, and is compatible with `Disabled` component
- 🦀️ Fix `Table`'s `renderBody` TypeScript definition
- 🦀️ Fix `Form`'s `scrollToError` scrolls to wrong position
- 🦀️ Remove unused dependency `formulr`
- 🦀️ Updated two icons: `calendar-o` and `gift`
- 📚 Update `prismjs` to `1.21.0` for documentation code highlight

### 8.5.4(2020-08-04)

- 🦀️ Fix unmatched `TypeScript` and `tslib` version in `8.5.3`
- 🦀️ Fix label text color in disabled `Checkbox`
- 📚 Add a new demo for custom `Form` field

### 8.5.3(2020-07-22)

- ✨ Add a new icon `thumbnail`
- `Form`
  - ✨ Merge `formulr` into `Zent` repository
  - ✨ Add `FormContext`, only supports `labelStyle` for now
  - 🦀️ Ensure `FieldArray`'s child has an `id`, no need to use array indices for `key`
  - 🦀️ Fix a React warning
- 🦀️ Fix an issue in `Grid` when `batchComponents` is an empty array
- 🦀️ Fix style lint when building custom theme
- 🦀️ Allow word wrap in `ClampLines`
- 📚 Add `babel-plugin-zent` link in doc site side nav
- 📚 Fix some style issue in doc site

### 8.5.2(2020-06-23)

- `Form`
  - 🦀️ Fix some minor issues
  - 🦀️ `FormSelectField` is compatible with `tags` mode
  - 🦀️ Export validator types
- 🦀️ Fix `Swiper` transition issue in some edge cases
- 🦀️ Fix `ScrollAlert` children check

### 8.5.1(2020-06-10)

- ✨ `Tooltip` now passes `display` prop to `Popover`
- ✨ New icon: `drag`
- 🦀️ Update `Dialog` TypeScript definition
- 🦀️ Fix `NumberInput` TypeScript definition
- 🦀️ Fix `Form` warning in React >= 16.13
- 📚 More docs on `Form` `ValidateOption`

### 8.5.0(2020-05-07)

- ✨ Add 4 new icons: `folder-o`, `open-folder-o`, `refresh`, `save-o`
- ✨ Remove `Upload` default help text, don't render help text if `tips` is not present
- `Alert`
  - ✨ Add `hint` style
  - ✨ Add `ScrollAlert` for rolling alert
- `Form`
  - ✨ `Field`'s `validate` now propagates to `FieldArray` or `FieldSet`
  - ✨ Add `ValidatorMiddlewares`, these middlewares can be used to dynamically change validators behavior
  - ✨ `FormSelectField` pass through `children`
  - 🦀️ Fix `Form` `submit` use after unmount
  - 🦀️ Fix `Select`、`Option`、`FormInputField` type definition
- 🦀️ Fix `Grid` shadow after `scroll.x` changes
- 🦀️ Fix `Collapse` type definition
- 🦀️ Fix `Pagination` page jump not working in some cases

### 8.4.0-1(2020-11-17)

- 🦀️ Fix CSS Variable support in some components

### 8.4.0(2020-03-16)

- ✨ `Upload` item UI can be customized
- ✨ Update `Tabs` button like style
- 🦀️ Fix development compatibility issue on `Windows`
- 🦀️ Fix an issue where `DatePicker` modifies `Date` values in props directly
- `Grid`
  - 🦀️ Fix shadow of fixed column when window resizes
  - 🦀️ Fix background color when row hover highlight is disabled
  - 🦀️ Fix TypeScript definition of `getCheckboxProps`
- `Form`
  - 🦀️ Export `BasicForm`
  - 🦀️ Fix mishandling of type conversion for `required`

### 8.3.0(2020-02-26)

- `Grid`
  - ✨ Add `disableHoverHighlight` to disable row hover highlight
  - 🦀️ Fix wrong selection data after reverting [Select All]
- 🦀️ Fix some broken style in documentation
- `Form`
  - 🦀️ Update styles
  - 🦀️ Fix `FieldSet` type definition
  - 🦀️ Export `ValidateOption`
- 📚 Upgrade documentation site dependencies

### 8.2.0(2020-02-18)

- ✨ `BlockHeader` has a new minimum style
- ✨ `Grid` stick header offset top can be customized
- 🦀️ Fix style issue when value is outside range in `Progress`
- `Form`
  - 🦀️ Fix error style
  - 🦀️ Fix TypeScript definition

### 8.1.0(2020-02-10)

- `Grid`
  - ✨ Support sticky header
  - ✨ Row checkbox can have a tooltip for the reason
- `Form`
  - ✨ Add field interaction demo
  - ✨ Allow `validators` in `Field` when `model` is used
  - 🦀️ Fix a `FormNumberInputField` bug that causes data and view in an inconsistent state
  - 🦀️ Updated line height for non input fields
- 🦀️ Improved dragging performance in `ColorPicker`
- 🦀️ Fix item not selected when `Select` mounts
- `Upload`
  - 🦀️ Include failed files when calculating file numbers
  - 🦀️ Export `FILE_UPLOAD_STATUS` as static property on component

### 8.0.1(2020-01-19)

- `Upload`
  - 🦀️ Use a different CSS class name from the old version
  - 🦀️ Fix a pagination bug when removing items

### 8.0.0(2020-01-17)

- 🎉 New component `Waypoint`
- 🎉 New component `Dropdown`
- 🎉 [breaking change] Rewrite `Upload`, use `@zent/compat` if you want the old version
- `Cascader`
  - ✨ Add support to `disabled`
  - ✨ Remove `prefix`
  - 🦀️ `onChange` is passed the same option item from props
  - 🦀️ Update placeholder text color
  - 🦀️ [breaking change] Namespace all CSS selectors
- `Select`
  - ✨ Remove `prefix`
  - 🦀️ Update caret style
  - 🦀️ [breaking change] Namespace all CSS selectors
- `Affix`
  - ✨ Rewrite using `Waypoint`
  - ✨ [breaking change] `offsetTop` has no default value
  - ✨ `offsetTop` and `offsetBottom` can be used together
- `InfiniteScroller`
  - ✨ Rewrite using `Waypoint`
  - ✨ [breaking change] Remove `offset`, `useCapture` and `prefix`
  - ✨ [breaking change] Rename `initialLoad` to `skipLoadOnMount`
  - ✨ [breaking change] `hasMore` defaults to `false`
  - ✨ [breaking change] `useWindow` defaults to `false`
- ✨ Optimize event handlers in every place
- `Icon`
  - ✨ New icons `filter-o` and `scan-code-o`
  - ✨ Rename `text-guide` to `text-guide-o`
  - ✨ Rename `video-guide` to `video-guide-o`
- ✨ `QuickDateRangePicker` can select a default preset on mount
- ✨ Replace `tslint` with `eslint`
- 🦀️ Update `Dialog` close button style
- `Form`
  - ✨ Add `useFieldValue` hook
  - ✨ `Form` gets a `getSubmitValue` method
  - 🦀️ Update error style
  - 🦀️ Update TypeScript definition
  - 🦀️ Export `FormDescription` component
  - 🦀️ `FormSelectField` properly handles `withoutLabel`
  - 🦀️ `layout` is optional
- 🦀️ Fix `CopyButton` TypeScript definition
- 🦀️ Update `Pagination` font style
- 🦀️ Fix `Rate` icon issue when using fraction values
- 🦀️ Fix incorrect rewrite rules used in `babel-plugin-zent`

### 7.4.5(2021-03-11)

- 🦀️ Back port [PR#1406](https://github.com/youzan/zent/pull/1406)

### 7.4.4(2020-05-11)

- 🦀️ Fix a state bug in `NumberInput`

### 7.4.3(2019-12-19)

- 🦀️ Fix `FormSelectField`'s `destroyOnUnmount` not working
- 🦀️ Update `Form` TypeScript definition
- 🦀️ All props are under `props` in `FormNumberInputField`(`integer`) and `FormSelectField`(`tags`, `data`)
- 🦀️ Update form error style

### 7.4.2(2019-12-13)

- 🦀️ Fix a style issue in `Grid`
- 🦀️ Fix TypeScript definition in `DateRangeQuickPicker`

### 7.4.1(2019-12-13)

- ✨ New icons：`doc`, `video`, `audio`
- ✨ Replace `tinycolor2` with an internal slim version
- 🦀️ Fix SSR for `Layout`
- 🦀️ Add back support for `a.b.c` for column name in `Grid`, only for compatibility, not recommended for daily use
- 🦀️ Fix repeated initialization in `Sortable` and TypeScript definition bugs
- 🦀️ Fix `TextMark` TypeScript definition
- 🦀️ Enlarge icon size in time pickers
- 🦀️ Change `title` to `ReactNode` in `BlockHeader`
- 🦀️ Cleanup unused `createAlias` usage

### 7.4.0(2019-12-06)

- ✨ New `Tooltip` component
- ✨ Replace `lodash-es` with built-ins and language features
- 🦀️ **[breaking change]** All time related pickers' `isFooterVisble` prop is renamed to `isFooterVisible`.
- 🦀️ Fix Enter to select not working after filter in `Select`
- 🦀️ Fix `Upload` crash if you remove some item during upload
- 🦀️ Don't reassign unique internal id after DnD sort in `Upload`

### 7.3.2(2019-11-29)

- ✨ `Link` moves to its own directory, compatible with `Disabled`

### 7.3.1(2019-11-27)

- ✨ New `Link` component to replace `zent-link` CSS class
- ✨ Add `labelStyle` to `Radio` and `Checkbox`
- 🦀️ Fix `ButtonDirective` children style issue
- 🦀️ Fix inconsistent package version between build and publish
- 🦀️ Revert `Radio` label's `display` to `inline`
- 🦀️ Fix elements other than `Radio` are invisible inside `RadioGroup`
- 🦀️ Fix elements other than `Checkbox` are invisible inside `CheckboxGroup`

### 7.3.0(2019-11-25)

- 🎉 Isolate styles in different zent versions
- 🎉 Add a few compile time constants to TypeScript and SCSS compiler, like `__FILE__` in C
- 🦀️ Update icon color in `BlockHeader`
- 🦀️ Fix style issue in `Grid` when batch operation and fixed header are both present
- 🦀️ Fix `FormRadioGroupField` `defaultValue` test issue

### 7.2.0(2019-11-18)

- 🎉 New `IMEComposition` component
- ✨ Add batch operation to `Grid`
- ✨ Add tooltip when hover on next page in `Pagination`
- ✨ Upgrade `date-fns` to 2.x
- ✨ Fork `fecha` and rewrite in TypeScript
- 📚 Add more docs on `Form` usage
- 🦀️ Enlarge icon size in `BlockHeader`
- 🦀️ Fix height issue in `Radio` and `Checkbox`
- 🦀️ Fix data missing when using `useFieldArrayValue`
- 🦀️ Fix the handling of `undefined` values in default error render of `Form` fields
- 🦀️ Fix type definitions in `FormSelectField`, `Form` and `FieldSet`
- 🦀️ Fix type definitions in `Switch`, `CopyButton` and `DatePicker`

### 7.1.0(2019-11-08)

- ✨ `Select` adds an `retainNullOption` option to allow Options with `null` value to be selected
- ✨ New `Notify.info` method
- 📚 Brand new icon grid
- 🦀️ Fix `Progress` style when page is zoomed in/out in Safari
- 🦀️ Fix type definition for `Form` and `Cascader`
- 🦀️ Update `i18n` usage in `Pagination` and `QuarterPicker`

### 7.0.1 (2019-11-01)

- Add `default export` to `Form`

### 7.0.0 (2019-11-01)

This is major release with lots of breaking changes, read the [full change log](./changelog-v7).

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

- ✨ Support `tags` mode in `FormSelectField` (_reverted_)
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
  - ✨ Add `max` and `min` support
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
- 🦀️ Fix can not edit hex in `ColorPicker`
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
	}
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
- 🦀️ Fix disable logic in `MonthPicker`
- 🦀️ Fix `emptyLabel` type in `Table`
- 🦀️ Fix TypeScript definition for `Button`

### 3.9.5 (2017-11-13)

- ✨ You can search components in doc site now.
- 🦀️ Fix disable logic in `DatePicker`

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
