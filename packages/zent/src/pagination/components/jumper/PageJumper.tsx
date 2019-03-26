import * as React from 'react';
import { I18nReceiver as Receiver } from '../../../i18n';
import Input from '../../../input';

import BasePageJumper, { IPaginationBaseJumperProps } from './BasePageJumper';

const INPUT_WIDTH = 56;

export interface IPaginationPageJumperProps
  extends IPaginationBaseJumperProps {}

export class PageJumper extends BasePageJumper<IPaginationPageJumperProps> {
  render() {
    const { value } = this.state;
    const input = (
      <Input
        value={value}
        onChange={this.onChange}
        onPressEnter={this.onConfirm}
        width={INPUT_WIDTH}
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

  handleJump(pageNumber) {
    this.props.onJump(pageNumber);

    this.setState({
      value: '',
    });
  }
}

export default PageJumper;
