import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'zent';

import './style.pcss';

const Simple = activeArr => {
  const isSuperStore = window._global.isSuperStore;

  const Header = (
    <Breadcrumb className="zent-breadcrumb-nav">
      <Breadcrumb.Item
        name="全部订单"
        href="#list?type=all"
        className={activeArr === 'all' && 'zent-breadcrumb-nav-active'}
      />
      {isSuperStore && (
        <Breadcrumb.Item
          name="网点订单"
          href="#list?ext_type=multistore"
          className={activeArr === 'multistore' && 'zent-breadcrumb-nav-active'}
        />
      )}
      <Breadcrumb.Item
        name="同城送订单"
        href="#list?express_type=city&disable_express_type=1"
        className={activeArr === 'city' && 'zent-breadcrumb-nav-active'}
      />
      <Breadcrumb.Item
        name="自提订单"
        href="#list?express_type=selffetch"
        className={activeArr === 'selffetch' && 'zent-breadcrumb-nav-active'}
      />
      <Breadcrumb.Item
        name="分销订单"
        href="#list?type=fenxiao"
        className={activeArr === 'fenxiao' && 'zent-breadcrumb-nav-active'}
      />
      <Breadcrumb.Item
        name="货到付款订单"
        href="#list?buy_way=codpay"
        className={activeArr === 'codpay' && 'zent-breadcrumb-nav-active'}
      />
    </Breadcrumb>
  );
  const navContent = document.getElementById('js-page-nav');
  ReactDOM.render(Header, navContent);
};

export default Simple;
