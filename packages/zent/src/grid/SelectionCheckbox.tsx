import * as React from 'react';
import { PureComponent } from 'react';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Store from './Store';

interface IGridSelectionCheckboxProps {
  disabled?: boolean;
  rowIndex: number | string;
  store: Store;
  onChange: ICheckboxProps<unknown>['onChange'];
}

interface IGridSelectionCheckboxState {
  checked: boolean;
}

class SelectionCheckbox extends PureComponent<
  IGridSelectionCheckboxProps,
  IGridSelectionCheckboxState
> {
  constructor(props: IGridSelectionCheckboxProps) {
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

  getCheckState = (props: IGridSelectionCheckboxProps) => {
    const { store, rowIndex } = props;
    return (store.getState('selectedRowKeys') ?? []).indexOf(rowIndex) !== -1;
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(
    nextProps: IGridSelectionCheckboxProps,
    nextState: IGridSelectionCheckboxState
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
