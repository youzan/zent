import * as React from 'react';
import * as PropTypes from 'prop-types';
import { I18nReceiver as Receiver } from '../../../i18n';
import Input from '../../../input';

import BasePageJumper from './BasePageJumper';

const INPUT_WIDTH = 56;

export default class PageJumper extends BasePageJumper {
  static propTypes = {
    current: PropTypes.number,
    onJump: PropTypes.func,
  };

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
