import * as React from 'react';
import { PureComponent } from 'react';

export interface ISelectTagProps {
  prefixCls: string;
  cid: string;
  text: any;
  onDelete(cid: string): void;
}

class Tag extends PureComponent<ISelectTagProps, any> {
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
