import React, { Component } from 'react';
import { Pop, Notify, Input, CopyButton } from 'zent';

import './styles.pcss';

export default Pop.withPop(
  class CopyUrlContent extends Component {
    onCopy = () => {
      const { pop } = this.props;
      pop.close();
      Notify.success('复制成功');
    };

    render() {
      const { url } = this.props;

      return (
        <div className="paper-list__table-action-link-copy">
          <Input value={url} disabled />
          <CopyButton text={url} onCopySuccess={this.onCopy} />
        </div>
      );
    }
  }
);
