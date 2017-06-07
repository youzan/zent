#!/usr/bin/env node

/* eslint-disable */

var codes = require('zenticons/lib/codes.json');

var icons = codes
  .map(c => {
    var iname = c.name;
    var icodepoint = c.hexCodepoint;
    var ikeywords = c.keywords.join('');
    var fulltext_index = `${iname}${icodepoint}${ikeywords}`;

    return `
        <div className="zi-grid-item" data-index="${fulltext_index}">
          <Icon type="${iname}" />
          <span className="zi-grid-item-name">${iname}(${icodepoint})</span>
        </div>`;
  })
  .join('');

var component = `import { Icon } from 'zent';

class IconGrid extends Component {
  state = {
    search: ''
  };

  onChange = evt => {
    this.setState({
      search: evt.target.value.trim().toLowerCase()
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="zi-grid">
        {search && <style>{\`.zi-grid-item:not([data-index*="\${search}"]) { display: none; }\`}</style>}
        <div className="zi-search-input">
          <input placeholder="Search..." value={search} onChange={this.onChange} />
        </div>
${icons}
      </div>
    );
  }
}`;

console.log(component);
