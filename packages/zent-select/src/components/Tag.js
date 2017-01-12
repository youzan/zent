/**
 * Tag
 */

import React, { Component, PropTypes } from 'react';

class Tag extends Component {

  constructor(props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  deleteTagHandler() {
    this.props.onDelete(this.props.cid);
  }

  render() {
    let {
      prefixCls,
      text
    } = this.props;

    return (
      <span>{
        text ?
          <span className={`${prefixCls}-tag`}>
          {text}
            <i
              className={`${prefixCls}-delete`}
              onClick={this.deleteTagHandler}
          ></i></span>
        : ''
      }</span>
    );
  }
}

Tag.propTypes = {
  prefixCls: PropTypes.string,
  cid: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  onFocus: PropTypes.func
};

export default Tag;
