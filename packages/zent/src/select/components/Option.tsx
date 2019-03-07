import * as React from 'react';
import { PureComponent } from 'react';

export interface ISelectOptionProps {
  prefixCls?: string;
  cid?: string;
  value?: any;
  text: any;
  placeholder?: string;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onClick: (evt: React.MouseEvent<HTMLElement>, cid: string) => void;
}

class Option extends PureComponent<ISelectOptionProps, any> {
  constructor(props) {
    super(props);
    this.optionClickHandler = this.optionClickHandler.bind(this);
  }

  optionClickHandler(ev) {
    this.props.onClick(ev, this.props.cid);
  }

  render() {
    const { className, text } = this.props;
    return (
      <span
        className={className}
        onClick={this.optionClickHandler}
        onMouseEnter={this.props.onMouseEnter}
      >
        {text}
      </span>
    );
  }
}

export default Option;
