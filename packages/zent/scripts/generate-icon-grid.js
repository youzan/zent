#!/usr/bin/env node

/* eslint-disable */

const codes = require('zenticons/lib/codes.json');
const fs = require('fs');
const path = require('path');
const util = require('util');
const chalk = require('chalk');

const readFileP = util.promisify(fs.readFile);
const writeFileP = util.promisify(fs.writeFile);

const X_CAT_PREFIX = 'x-cat-';

function generate() {
  const groups = codes
    .filter(c => !c.keywords.some(k => k === 'duplicate'))
    .reduce((groups, c) => {
      const cat = c.keywords.find(x => x.startsWith(X_CAT_PREFIX));
      if (!cat) {
        throw new Error(`x-cat- not found on icon ${c.name}`);
      }

      if (!groups[cat]) {
        groups[cat] = [];
      }

      groups[cat].push(c);
      return groups;
    }, {});

  const icons = Object.keys(groups)
    .map(k => {
      const grp = groups[k];

      const groupIcons = grp
        .map(c => {
          const name = c.name;
          // const icodepoint = c.hexCodepoint;
          const keywords = c.keywords
            .filter(k => !k.startsWith(X_CAT_PREFIX))
            .join('');
          const fulltext_index = `${name}${keywords}`;

          return `
            <CopyButton
              text={this.getIconString("${name}")}
              onCopySuccess="${name} 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="${fulltext_index}"
              >
                <Icon type="${name}" />
                <span className="zi-grid-item-name">${name}</span>
              </div>
            </CopyButton>`;
        })
        .join('');

      return `
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.${k}}</div>
          <div className="zi-grid-group-items">
            ${groupIcons}
          </div>
        </div>
      `;
    })
    .join('');

  const component = `\`\`\`jsx
import { Icon, Input, RadioGroup, Radio, CopyButton } from 'zent';

class IconGrid extends Component {
  state = {
    search: '',
    copyType: 'jsx',
  };

  onChange = evt => {
    this.setState({
      search: evt.target.value.trim().toLowerCase()
    });
  };

  onCopyOptionChange = evt => {
    this.setState({
      copyType: evt.target.value
    });
  };

  getIconString = name => () => {
    const { copyType } = this.state;

    if (copyType === 'jsx') {
      return \`<Icon type="\${name}" />\`;
    }

    return name;
  };

  render() {
    const { search } = this.state;
    return (
      <div className="zi-grid">
        <div className="zi-grid-toolbar">
          {search && <style>{\`.zi-grid-item:not([data-index*="\${search}"]) { display: none; }\`}</style>}
          <Input
            className="zi-search-input"
            icon="search"
            placeholder="{i18n.searchPlaceholder}"
            value={search}
            onChange={this.onChange}
          />

          <RadioGroup onChange={this.onCopyOptionChange} value={this.state.copyType}>
            <Radio value="jsx">{i18n.jsx}</Radio>
            <Radio value="name">{i18n.name}</Radio>
          </RadioGroup>
        </div>
${icons}
      </div>
    );
  }
}

ReactDOM.render(<IconGrid />, mountNode);
\`\`\``;

  return component;
}

function main() {
  const mdPath = path.resolve(__dirname, '../src/icon/demos/all.md');
  readFileP(mdPath, { encoding: 'utf-8' })
    .then(mdContent => {
      const component = generate();
      return writeFileP(
        mdPath,
        mdContent.replace(/```jsx[\s\S]+```/, component)
      );
    })
    .catch(ex => {
      console.log(chalk.read(ex.stack || ex));
      process.exit(1);
    });
}

main();
