import { PureComponent } from 'react';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Pop from '../pop';
import Store from './Store';

interface IGridSelectionCheckboxProps {
  disabled?: boolean;
  reason?: React.ReactNode;
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

  // 等重构再删了吧，改不动
  // eslint-disable-next-line react/no-deprecated
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
    const { onChange, disabled, reason } = this.props;
    const { checked } = this.state;
    return reason && disabled ? (
      <Pop content={reason} trigger="hover" position="top-left" centerArrow>
        <Checkbox onChange={onChange} checked={checked} disabled={disabled} />
      </Pop>
    ) : (
      <Checkbox onChange={onChange} checked={checked} disabled={disabled} />
    );
  }
}

export default SelectionCheckbox;
