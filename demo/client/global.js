export const prefix =
  process.env.NODE_ENV === 'production' &&
  process.env.ZENT_DEPLOY_DEMO_YOUZAN_PRIVATE
    ? 'https://www.youzanyun.com/zanui/demo/zent'
    : '';

window._global = {
  env: process.env.NODE_ENV,
  url: {
    demo: prefix,
    www: '//www.youzan.com',
    imgcdn: '//img.yzcdn.cn',
    byzcdn: '//b.yzcdn.cn'
  },
  kdt_id: 1,
  user_id: '9066245',
  run_mode: 'online',
  debug: false,
  online_debug: false,
  js: {
    js_compress: true,
    css_compress: true,
    use_js_cdn: true,
    use_css_cdn: true,
    message_report: true,
    checkbrowser: true,
    hide_wx_nav: true,
    qn_public: 'kdt_img',
    qn_private: 'kdt-private'
  },
  account: '+86-18888888888',
  sign: '',
  nick_name: 'Zent Demo',
  gender: 0,
  avatar: 'https://img.yzcdn.cn/upload_files/avatar.png',
  shop_id: '45621',
  shop_type: 1,
  mp_data: {
    team_name: 'Zent Demo',
    business: '[{"value":"26","text":"\\u6c7d\\u8f66\\u517b\\u62a4"}]',
    business_id: '26',
    store_url: '',
    contact_name: '',
    mobile: '18888888888',
    country_code: '+86',
    qq: '18888888888',
    company_id: 0,
    logo:
      'http://img.yzcdn.cn/upload_files/2017/05/25/FvgC685sh3OrEfCFdHaLR4Ybqqfu.png',
    team_type: '0'
  },
  isNewUI: true,
  isSuperStore: false,
  sourceType: 0,
  isWishOpen: 1,
  lock_create_showcase: false,
  paidcontent_auth: true
};
