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

class SelectionCheckbox extends PureComponent<
  IGridSelectionRadioProps,
  IGridSelectionRadioState
> {
  constructor(props: IGridSelectionRadioProps) {
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

  getCheckState = (props: IGridSelectionRadioProps) => {
    const { store, rowIndex } = props;
    return (store.getState('selectedRowKeys') ?? []).indexOf(rowIndex) !== -1;
  };

  componentDidMount() {
    this.subscribe();
  }

  // 等重构再删了吧，改不动
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(
    nextProps: IGridSelectionRadioProps,
    nextState: IGridSelectionRadioState
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
        <Radio onChange={onChange} checked={checked} disabled={disabled} />
      </Pop>
    ) : (
      <Radio onChange={onChange} checked={checked} disabled={disabled} />
    );
  }
}

export default SelectionCheckbox;
