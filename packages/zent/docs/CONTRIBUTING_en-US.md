## How to Contribute

#### Setup Environment

```bash
yarn
yarn run bootstrap

cd site && yarn
```

#### Code Structure

- There're two npm packages within Zent's repository: `babel-plugin-zent` and `zent`.
- This site's source is in `site`, run `yarn dev` within `site` to view docs locally.

Source code for all components is in `packages/zent`:

```
packages/zent
├── __tests__       # unit tests
├── assets          # styles
├── docs            # documentations
├── scripts         # scripts for testing, building, etc.
├── src             # JavaScript source code
├── typings         # TypeScript definitions
```

#### Add a New Component

Steps:

- Add JavaScript code
- Add styles
- Add tests
- Add documentation
- Add TypeScript definition

The boring part is automated, just run `yarn new-component YOUR-COMPONENT-NAME` in `packages/zent`, all necessary boilerplates are created for you.

Remember to add TypeScript definitions in `packages/zent/typings` for your new component.

#### Naming

* Component file name should be camel case，e.g. `ActionButton`'s file name should be `ActionsButton.js`
* Files export functions should be camel case(first letter is lower case), e.g. `withPop`
* Directory name should be lower case separated by -, e.g. `number-input`
* file name in demos should be lower case separated by -, e.g `with-close-btn`

#### Testing

Beside the unit tests in `__tests__`, remember to update documentation whenever you make a change.

```bash
cd site && yarn dev
```

## How to Write Documentation

There're two READMEs in each component directory, `README_zh-CN.md` is Chinese documentaion and `README_en-US.md` is English documentation. These docs are written in Markdown format.

You can find detailed [instructions here](markdown).

## Tips

#### Component Dependency within Zent

For example, in order to import `Portal` within `Dialog`, you can just write `import Portal from 'portal';`, no relative path required.

#### Export Component

- Each component can have only one export: the default export. Please attach all other variables to the default export variable if you have multiple exports.
- Don't use [Functional Component](https://facebook.github.io/react/docs/refs-and-the-dom.html#refs-and-functional-components) when exporting a component. Functional components can't have `ref`s and `ref`s are discouraged, we should not forbid the use of `ref`s on our componet anyway.

#### Styles

Component styles are written in `precss`, please refer to [precss documentation](https://github.com/jonathantneal/precss).

#### z-index

We have rules for `z-index` within Zent, `z-index` priorities(from high to low) are defined as:

* Special：Notify is always on top，[10000, +∞)
* Popups：Pop, Select, Datetimepicker, ColorPicker, Cascader etc. [2000, 3000)
* Fullscreen components：Dialog, image-preview etc. [1000, 2000)
* Others：Used with one component to control layers, [-10, 10] is recommended, the lower the better.
