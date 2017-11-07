## Writing Documentation

#### File Format

It's Markdown.

But in order to support demos and internationalization, there're some things you need to know.

Keep reading.

#### Title

Titles begin from `h2`(e.g. `##` in Markdown), `h3` and `h4` is enough in most cases.

Don't nesting too many levels.

#### Description

You can put a component description below the first title. Be concise.

#### Guides (Optional)

You can have a usage guide following the description, starts with an `h3`.

#### Demos

Demos are written in separate files in `demos` sub-directory.

Demos are automatically inserted into the final documentation by our loader.

    
    ---
    order: 1                          // `order` defines the order in the final documentation, smaller first
    zh-CN:                            // Start of Chinese string definitions
      title: 基础用法                  // Required, demo title
      content: 公告内容                // `content` will be replace as `公告内容` in Chinese documentaion
    en-US:                            // Start of English string definitions
      title: Basic                    // Required, demo title
      content: Alert content          // `content` will be replace as `Alert content` in English documentaion
    ---
    
    ```jsx
    import { Alert } from 'zent';
    ReactDOM.render(                  // ReactDOM.render is the entry point
      <Alert>{i18n.content}</Alert>   // The component you want to render
      , mountNode                     // `mountNode` is predefined
    );
    ```
    
    // It's precss
    <style>
      .zent-badge {
        .nested {
          background: red;
        }
      }
    <style>


A demo can have three parts:

- YAML configuration
  - `order` and `title` are required
- JavaScript code
  - Use `i18n.varName` as a placeholder to texts, and define `varName` in YAML.
- styles(optional)
  - You don't need this in most cases

Some rules for writing demos:

- Start from the basics
- Orthogonal: one demo for one senario

#### API

Use a table for your APIs, the table should have these columns:

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | -------------- | -------- | ---------- | ---------- | ----------------- |
| visible      | Show or hide   | bool     |  No        |   `false`  | `true` \| `false` |
