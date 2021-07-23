import { I18nReceiver as Receiver, II18nLocalePagination } from '../../../i18n';
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
        value={value}
        onInput={this.onChange}
        onPressEnter={this.onConfirm}
        width={INPUT_WIDTH}
        min={1}
        decimal={0}
      />
    );

    return (
      <Receiver componentName="Pagination">
        {(i18n: II18nLocalePagination) => {
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
      value: '',
    });
  }
}

export default PageJumper;
