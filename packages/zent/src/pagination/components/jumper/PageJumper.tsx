import { I18nReceiver as Receiver } from '../../../i18n';
import { NumberInput } from '../../../number-input';

import BasePageJumper, {
  IPaginationBaseJumperProps,
  IPaginationBaseJumperState,
} from './BasePageJumper';

const INPUT_WIDTH = 56;

export type IPaginationPageJumperProps = IPaginationBaseJumperProps;

export type IPaginationPageJumperState = IPaginationBaseJumperState;

export class PageJumper extends BasePageJumper<
  IPaginationPageJumperProps,
  IPaginationPageJumperState
> {
  render() {
    const { value } = this.state;
    const input = (
      <NumberInput
        integer
        value={value}
        onChange={this.onChange}
        onPressEnter={this.onConfirm}
        width={INPUT_WIDTH}
      />
    );

    return (
      <Receiver componentName="Pagination">
        {i18n => {
          return (
            <div className="zent-pagination-page-jumper">
              {i18n.jumpTo({ input })}
            </div>
          );
        }}
      </Receiver>
    );
  }

  handleJump(pageNumber: number) {
    this.props.onJump(pageNumber);

    this.setState({
      value: null,
    });
  }
}

export default PageJumper;
