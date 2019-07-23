import * as React from 'react';
import { I18nReceiver as Receiver } from '../../../i18n';
import { NumberInput } from '../../../number-input';

import BasePageJumper, {
  IPaginationBaseJumperProps,
  IPaginationBaseJumperState,
} from './BasePageJumper';

const INPUT_WIDTH = 56;

export interface IPaginationPageJumperProps
  extends IPaginationBaseJumperProps {}

export interface IPaginationPageJumperState
  extends IPaginationBaseJumperState {}

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
        {(i18n: any) => {
          if (i18n.mark === 'zh-CN') {
            return (
              <div className="zent-pagination-page-jumper">
                {i18n.jump}
                {input}
                {i18n.page}
              </div>
            );
          }

          return (
            <div className="zent-pagination-page-jumper">
              {i18n.jump} {i18n.page}
              {input}
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
