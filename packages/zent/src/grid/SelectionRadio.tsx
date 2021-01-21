import { PureComponent } from 'react';
import Radio, { IRadioProps } from '../radio';
import Pop from '../pop';
import Store from './Store';

interface IGridSelectionRadioProps {
  disabled?: boolean;
  reason?: React.ReactNode;
  rowIndex: number | string;
  store: Store;
  onChange: IRadioProps<unknown>['onChange'];
}

interface IGridSelectionRadioState {
  checked: boolean;
}

const getRowCheckedState = (
  rowInfo: Pick<IGridSelectionRadioProps, 'rowIndex' | 'store'>
) => {
  const { store, rowIndex } = rowInfo;
  return (store.getState('selectedRowKeys') ?? []).indexOf(rowIndex) !== -1;
};

class SelectionCheckbox extends PureComponent<
  IGridSelectionRadioProps,
  IGridSelectionRadioState
> {
  constructor(props: IGridSelectionRadioProps) {
    super(props);

    this.state = {
      checked: getRowCheckedState({
        store: props.store,
        rowIndex: props.rowIndex,
      }),
    };
  }

  static getDerivedStateFromProps(props: IGridSelectionRadioProps, state) {
    const checked = getRowCheckedState({
      store: props.store,
      rowIndex: props.rowIndex,
    });
    if (checked === state.checked) {
      return null;
    }

    return {
      checked,
    };
  }

  unsubscribe?: () => void;

  subscribe = () => {
    const { store, rowIndex } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      const checked = getRowCheckedState({
        store,
        rowIndex,
      });
      if (this.state.checked !== checked) {
        this.setState({ checked });
      }
    });
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe?.();
  }

  render() {
    const { onChange, disabled, reason } = this.props;
    const { checked } = this.state;
    return reason && disabled ? (
      <Pop content={reason} trigger="hover" position="top-left" centerArrow>
        <span>
          <Radio onChange={onChange} checked={checked} disabled={disabled} />
        </span>
      </Pop>
    ) : (
      <Radio onChange={onChange} checked={checked} disabled={disabled} />
    );
  }
}

export default SelectionCheckbox;
