import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';

class Tag extends PureComponent<any, any> {
  static propTypes = {
    prefixCls: PropTypes.string,
    cid: PropTypes.string,
    value: PropTypes.any,
    text: PropTypes.any,
    onFocus: PropTypes.func,
  };

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

export default Tag;
