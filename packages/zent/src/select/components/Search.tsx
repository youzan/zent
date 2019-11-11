import * as React from 'react';
import { PureComponent } from 'react';
import Input, { IInputChangeEvent } from '../../input';

export interface ISearchProps {
  prefixCls?: string;
  value?: any;
  placeholder?: string;
  keyword?: string;
  onChange(val: string): void;
  ready?: boolean;
}

class Search extends PureComponent<ISearchProps, any> {
  focused: boolean;
  inputRef = React.createRef<Input>();

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.focused = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.focused && nextProps.ready) {
      setTimeout(() => {
        this.inputRef.current && this.inputRef.current.focus();
      }, 150);
      this.focused = true;
    }
  }

  changeHandler(ev: IInputChangeEvent) {
    this.props.onChange(ev.target.value);
  }

  render() {
    const { prefixCls, placeholder, keyword } = this.props;

    return (
      <Input
        type="text"
        ref={this.inputRef}
        placeholder={placeholder}
        className={`${prefixCls}-search`}
        value={keyword}
        onChange={this.changeHandler}
      />
    );
  }
}

export default Search;
