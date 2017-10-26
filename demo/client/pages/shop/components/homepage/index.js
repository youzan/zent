import React, { Component } from 'react';
import { Button, Pop } from 'zent';
import fullfillImage from 'zan-utils/fullfillImage';
import { withRouter } from 'react-router-dom';

import CopyUrl from '../copy-url';

import './style.pcss';

export default withRouter(
  class HomePage extends Component {
    render() {
      const { homepage } = this.props;

      return (
        <div className="paper-homepage">
          <div className="paper-homepage__detail">
            <img
              className="paper-homepage__detail-logo"
              alt="shop-logo"
              src={fullfillImage(window._global.mp_data.logo, '!100x100.jpg')}
            />
            <div className="paper-homepage__detail-shop">
              <h3 className="paper-homepage__detail-shop-title">
                <strong>店铺主页</strong>
                ({homepage.title})
              </h3>
              <div className="paper-homepage__detail-shop-createtime">
                创建时间：{homepage.created_time}
              </div>
            </div>
          </div>

          <div className="paper-homepage__actions">
            <Button
              type="primary"
              outline
              className="paper-homepage__action-item"
              onClick={this.editHomepage}
            >
              编辑
            </Button>

            <Pop
              trigger="click"
              position="left-center"
              centerArrow
              content={<CopyUrl url={homepage.url} />}
            >
              <Button
                type="primary"
                outline
                className="paper-homepage__action-item"
              >
                链接
              </Button>
            </Pop>
          </div>
        </div>
      );
    }

    editHomepage = () => {
      const { homepage, history } = this.props;
      const href = `/paper/edit/${homepage.id}`;
      history.push(href);
    };
  }
);
