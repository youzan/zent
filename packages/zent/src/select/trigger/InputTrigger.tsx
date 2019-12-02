import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import { I18nReceiver as Receiver, II18nLocaleSelect } from '../../i18n';
import { ISelectTriggerProps } from './BaseTrigger';
import Input from '../../input';

export interface IInputTriggerProps extends ISelectTriggerProps {
  onChange(data: Partial<IInputTriggerProps>): void;
  keyword?: string;
  extraFilter?: boolean;
}

class InputTrigger extends Component<IInputTriggerProps> {
  state = {
    value: '',
  };

  inputRef = React.createRef<Input>();

  componentDidMount() {
    this.props.onChange({
      extraFilter: true,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.keyword === null ? nextProps.value : nextProps.keyword,
    });
  }

  inputChangeHandler = ev => {
    this.props.onChange({
      keyword: ev.target.value,
    });
  };

  render() {
    const { prefixCls, placeholder, keyword, text, visible } = this.props;

    const rootClass = cx(`${prefixCls}-input`, { visible });

    return (
      <Receiver componentName="Select">
        {(i18n: II18nLocaleSelect) => (
          <Input
            ref={this.inputRef}
            className={rootClass}
            placeholder={placeholder || i18n.input}
            type="text"
            value={keyword === null ? text : keyword}
            onChange={this.inputChangeHandler}
            onClick={this.props.onClick}
          />
        )}
      </Receiver>
    );
  }
}

export default InputTrigger;
