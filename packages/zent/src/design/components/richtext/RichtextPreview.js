import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const emptyRichtext =
  '<p>点此编辑『富文本』内容 ——&gt;</p><p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p><p>还可以在这里加入表格了</p><table><tbody><tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td><td width="93" valign="top" style="word-break: break-all;">发放奖品</td><td width="93" valign="top" style="word-break: break-all;">备注</td></tr><tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td><td width="93" valign="top" style="word-break: break-all;">内测码</td><td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr><tr><td width="93" valign="top" style="word-break: break-all;">大麦</td><td width="93" valign="top" style="word-break: break-all;">积分</td><td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr></tbody></table>';

export default class RichtextPreview extends Component {
  static propTypes = {
    value: PropTypes.object,
    design: PropTypes.object,
  };

  render() {
    const { value } = this.props;
    const content = value.content || emptyRichtext;
    const { fullscreen, color } = value;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line
        className={cx('zent-design-component-richtext-preview', {
          'zent-design-component-richtext-preview--fullscreen': fullscreen,
        })}
        style={{ backgroundColor: color }}
      />
    );
  }
}
