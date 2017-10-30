// 筛选类目
export const orderLabelMap = {
  order_no: '订单号',
  outer_transaction_number: '外部单号',
  user_name: '收货人姓名',
  tel: '收货人手机号',
  tel_last4: '收货人手机号后四位'
};

// 订单类型
export const typeMap = {
  all: '全部',
  normal: '普通订单',
  peerpay: '代付订单',
  gift: '送礼订单',
  wish: '心愿订单',
  fenxiao: '分销订单',
  cashier: '扫码收款',
  hotel: '酒店订单',
  feedback: '维权订单',
  period: '周期购订单',
  tuan: '多人拼团订单',
  knowledge: '知识付费订单'
};

// 订单状态(根据订单类型联动)
export const stateMap = {
  all: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  normal: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  feedback: { all: '全部', sellertodo: '退款处理中', feedback_closed: '退款结束' },
  selffetch: {
    all: '全部',
    topay: '待付款',
    totuan: '待接单',
    tosend: '待提货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  gift: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭'
  },
  wish: { all: '全部', topay: '待付款', tosend: '待发货', send: '已发货', success: '已完成' },
  peerpay: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭'
  },
  fenxiao: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭'
  },
  period: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭'
  },
  codpay: { all: '全部', tosend: '待发货', send: '已发货', success: '已完成' },
  cashier: { all: '全部' },
  newsettlement: {
    all: '全部',
    doing: '进行中',
    refund: '退款',
    success: '成功',
    failed: '失败'
  },
  tuan: {
    all: '全部',
    topay: '待付款',
    totuan: '待成团',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  pointstore: {
    all: '全部',
    topay: '待付款',
    tosend: '待发货',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  hotel: {
    all: '全部',
    topay: '待付款',
    tosend: '待接单',
    send: '已接单',
    success: '已完成',
    cancel: '已关闭',
    refunding: '退款中'
  },
  knowledge: {
    all: '全部',
    topay: '待付款',
    send: '已发货',
    success: '已完成',
    cancel: '已关闭'
  }
};

// 付款方式
export const buyWayMap = {
  all: '全部',
  wxpay: '微信支付',
  umpay: '银行卡付款',
  aliwap: '支付宝付款',
  prepaidcard: '储值余额付款',
  codpay: '货到付款/到店付款',
  peerpay: '找人代付',
  presentpay: '领取赠品',
  couponpay: '优惠兑换',
  giftpay: '礼品卡付款'
};

// 物流方式
export const expressTypeMap = {
  all: '全部',
  express: '快递发货',
  selffetch: '上门自提',
  city: '同城配送'
};

export const exportTypeMap = {
  default: '普通报表',
  account_check: '对账单',
  peerpay: '代付对账单'
};

// 需要封装keyword[xxx]的变量
export const keywordArr = [
  'period_send_time',
  'start_time',
  'end_time',
  'delivery_start_time',
  'delivery_end_time'
];
