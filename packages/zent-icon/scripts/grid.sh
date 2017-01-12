#!/bin/sh

basepath=$(dirname $0)

make_icons() {
  jq -c '.[]' $basepath/../build/codes.json | while read i; do
    iname=$(echo $i | jq '.name' | tr -d '"')
    icodepoint=$(echo $i | jq '.hexCodepoint' | tr -d '"')
    ikeywords=$(echo $i | jq '.keywords | join("")' | tr -d '"')
    fulltext_index=$iname$icodepoint$ikeywords
    echo "        <div className=\"zi-grid-item\" data-index=\"$fulltext_index\">"
    echo "          <Icon type=\"$iname\" />"
    echo "          <span className=\"zi-grid-item-name\">$iname($icodepoint)</span>"
    echo "        </div>"
  done
}

cat > $basepath/../examples/01-grid.js <<EOF
//
// DO NOT EDIT!! Auto generated
//

import React, { Component } from 'react';
import Icon from '../src';

import '../assets/index.scss';
import '../assets/grid.scss';

/*
zenticon的所有图标，图标支持全文搜索。
*/
export default class IconGrid extends Component {
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
          <input placeholder="type to search..." value={search} onChange={this.onChange} />
        </div>
$(make_icons)
      </div>
    );
  }
}
EOF
