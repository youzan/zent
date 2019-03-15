import * as React from 'react';
import { PureComponent } from 'react';

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
  input: HTMLInputElement | null = null;

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.focused = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.focused && nextProps.ready) {
      setTimeout(() => {
        this.input && this.input.focus();
      }, 150);
      this.focused = true;
    }
  }

  changeHandler(ev) {
    this.props.onChange(ev.target.value);
  }

  render() {
    const { prefixCls, placeholder, keyword } = this.props;

    return (
      <div className={`${prefixCls}-search`}>
        <input
          type="text"
          ref={input => (this.input = input)}
          placeholder={placeholder}
          className={`${prefixCls}-filter`}
          value={keyword}
          onChange={this.changeHandler}
        />
      </div>
    );
  }
}

export default Search;
