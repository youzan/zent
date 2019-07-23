import * as React from 'react';
import { PureComponent } from 'react';
import includes from 'lodash-es/includes';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Store from './Store';

interface IGridSelctionCheckboxProps {
  disabled?: boolean;
  rowIndex: number | string;
  store: Store;
  onChange: ICheckboxProps<unknown>['onChange'];
}

interface IGridSelctionCheckboxState {
  checked: boolean;
}

class SelectionCheckbox extends PureComponent<
  IGridSelctionCheckboxProps,
  IGridSelctionCheckboxState
> {
  constructor(props: IGridSelctionCheckboxProps) {
    super(props);

    this.state = {
      checked: this.getCheckState(props),
    };
  }

  unsubscribe?: () => void;

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      const checked = this.getCheckState(this.props);
      if (this.state.checked !== checked) {
        this.setState({ checked });
      }
    });
  };

  getCheckState = (props: IGridSelctionCheckboxProps) => {
    const { store, rowIndex } = props;
    return includes(store.getState('selectedRowKeys'), rowIndex);
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(
    nextProps: IGridSelctionCheckboxProps,
    nextState: IGridSelctionCheckboxState
  ) {
    const checked = this.getCheckState(nextProps);
    if (checked !== nextState.checked) {
      this.setState({ checked });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { onChange, disabled } = this.props;
    const { checked } = this.state;
    return (
      <Checkbox onChange={onChange} checked={checked} disabled={disabled} />
    );
  }
}

export default SelectionCheckbox;
