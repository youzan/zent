import * as React from 'react';

export interface ISearchTriggerProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

class SearchTrigger extends React.Component<ISearchTriggerProps> {
  inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.inputRef.current!.focus({
      preventScroll: true,
    });
  }

  render() {
    const { placeholder, value, onChange } = this.props;

    return (
      <input
        ref={this.inputRef}
        placeholder={placeholder}
        className="zent-cascader--search"
        value={value}
        onChange={onChange}
      />
    );
  }
}

export default SearchTrigger;
