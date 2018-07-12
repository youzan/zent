import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Tag extends PureComponent {
  constructor(props) {
    super(props);
    this.deleteTagHandler = this.deleteTagHandler.bind(this);
  }

  deleteTagHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.props.onDelete(this.props.cid);
  }

  render() {
    const { prefixCls, text } = this.props;

    return (
      <span>
        {text ? (
          <span className={`${prefixCls}-tag`}>
            {text}
            <i
              className={`${prefixCls}-delete`}
              onClick={this.deleteTagHandler}
            />
          </span>
        ) : (
          ''
        )}
      </span>
    );
  }
}

Tag.propTypes = {
  prefixCls: PropTypes.string,
  cid: PropTypes.string,
  value: PropTypes.any,
  text: PropTypes.any,
  onFocus: PropTypes.func,
};

export default Tag;
