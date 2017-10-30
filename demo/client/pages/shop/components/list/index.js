import React, { Component } from 'react';
import { Button, Table, Pop } from 'zent';
import formatNumber from 'zan-utils/money/formatLargeNumber';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import CopyUrl from '../copy-url';

import './style.pcss';

export default class List extends Component {
  render() {
    const { store } = this.props;

    return (
      <div className="paper-list">
        <div className="paper-list__actions">
          <Button type="primary" href={`${_global.url.demo}/paper/create`}>
            新建微页面
          </Button>
        </div>

        <div className="paper-list__table">
          <Table
            columns={this.getTableColumns()}
            datasets={store.list}
            onChange={this.onTableChange}
            pageInfo={store.page}
          />
        </div>
      </div>
    );
  }

  onTableChange = conf => {
    const { store: { actions } } = this.props;
    const { current } = conf;
    actions.fetch(current);
  };

  getTableColumns = () => {
    return [
      {
        title: '标题',
        bodyRender(data) {
          return (
            <a target="_blank" href={data.url} rel="noopener noreferrer">
              {data.title}
            </a>
          );
        }
      },
      {
        title: '创建时间',
        name: 'created_time'
      },
      {
        title: '商品数',
        bodyRender(data) {
          return formatNumber(data.goods_num);
        }
      },
      {
        title: '访客数/浏览量',
        name: 'bro_uvpv'
      },
      {
        title: '商品访客数/商品浏览量',
        name: 'shop_uvpv'
      },
      {
        title: '操作',
        bodyRender: data => {
          const { store } = this.props;
          const { actions } = store;
          const { item_id: id, url } = data;

          /* eslint-disable */
          return (
            <div className="paper-list__table-actions">
              <Action
                id={id}
                action={actions.copy}
                className="paper-list__table-action-copy"
              >
                复制
              </Action>
              <Action
                id={id}
                action={`${_global.url.demo}/paper/edit/${id}`}
                className="paper-list__table-action-edit"
              >
                编辑
              </Action>

              <Action className="paper-list__table-action-remove">
                <Pop
                  trigger="click"
                  content="确定删除？"
                  position="left-center"
                  centerArrow
                  onConfirm={actions.remove.bind(id)}
                >
                  <a>删除</a>
                </Pop>
              </Action>

              <Action className="paper-list__table-action-link">
                <Pop
                  trigger="click"
                  content={<CopyUrl url={url} />}
                  position="left-center"
                  centerArrow
                >
                  <a>链接</a>
                </Pop>
              </Action>

              {data.is_homepage ? (
                <span className="paper-list__table-action-homepage">店铺主页</span>
              ) : (
                <Action
                  id={id}
                  action={actions.setAsHomepage}
                  className="paper-list__table-action-homepage"
                >
                  设为主页
                </Action>
              )}
            </div>
          );
          /* eslint-enable */
        }
      }
    ];
  };
}

class Action extends Component {
  render() {
    const { children, className, action } = this.props;
    const isFn = isFunction(action);
    const isStr = isString(action);

    /* eslint-disable */
    return (
      <span className={cx('paper-list__table-action-item', className)}>
        {isFn && (
          <a href="javascript:void(0);" onClick={this.handleAction}>
            {children}
          </a>
        )}
        {isStr && <a href={action}>{children}</a>}
        {!isFn && !isStr && children}
      </span>
    );
    /* eslint-enable */
  }

  handleAction = () => {
    const { action, id } = this.props;
    isFunction(action) && action(id);
  };
}
