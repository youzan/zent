## Change Log

You can find detailed change logs for versions prior to 3.5.3 at [Github Log](github_changelog#zent-3-5-2-2017-09-07).

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
