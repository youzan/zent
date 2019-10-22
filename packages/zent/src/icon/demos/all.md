---
order: 4
zh-CN:
  title: 所有图标
en-US:
  title: All Icons
---

```jsx
import { Icon } from 'zent';

class IconGrid extends Component {
  state = {
    search: ''
  };

  onChange = evt => {
    this.setState({
      search: evt.target.value.trim().toLowerCase()
    });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="zi-grid">
        {search && <style>{`.zi-grid-item:not([data-index*="${search}"]) { display: none; }`}</style>}
        <div className="zi-search-input">
          <input placeholder="Search..." value={search} onChange={this.onChange} />
        </div>

        <div className="zi-grid-item" data-index="up0xe800up">
          <Icon type="up" />
          <span className="zi-grid-item-name">up(0xe800)</span>
        </div>
        <div className="zi-grid-item" data-index="down0xe801down">
          <Icon type="down" />
          <span className="zi-grid-item-name">down(0xe801)</span>
        </div>
        <div className="zi-grid-item" data-index="left0xe802left">
          <Icon type="left" />
          <span className="zi-grid-item-name">left(0xe802)</span>
        </div>
        <div className="zi-grid-item" data-index="right0xe803right">
          <Icon type="right" />
          <span className="zi-grid-item-name">right(0xe803)</span>
        </div>
        <div className="zi-grid-item" data-index="caret-up0xe804caretup">
          <Icon type="caret-up" />
          <span className="zi-grid-item-name">caret-up(0xe804)</span>
        </div>
        <div className="zi-grid-item" data-index="caret-down0xe805caretdown">
          <Icon type="caret-down" />
          <span className="zi-grid-item-name">caret-down(0xe805)</span>
        </div>
        <div className="zi-grid-item" data-index="arrow-up0xe806arrowup">
          <Icon type="arrow-up" />
          <span className="zi-grid-item-name">arrow-up(0xe806)</span>
        </div>
        <div className="zi-grid-item" data-index="arrow-down0xe807arrowdown">
          <Icon type="arrow-down" />
          <span className="zi-grid-item-name">arrow-down(0xe807)</span>
        </div>
        <div className="zi-grid-item" data-index="up-circle-o0xe808upcircleoutline">
          <Icon type="up-circle-o" />
          <span className="zi-grid-item-name">up-circle-o(0xe808)</span>
        </div>
        <div className="zi-grid-item" data-index="up-circle0xe809upcirclefilled">
          <Icon type="up-circle" />
          <span className="zi-grid-item-name">up-circle(0xe809)</span>
        </div>
        <div className="zi-grid-item" data-index="down-circle-o0xe80adowncircleoutline">
          <Icon type="down-circle-o" />
          <span className="zi-grid-item-name">down-circle-o(0xe80a)</span>
        </div>
        <div className="zi-grid-item" data-index="down-circle0xe80bdowncirclefilled">
          <Icon type="down-circle" />
          <span className="zi-grid-item-name">down-circle(0xe80b)</span>
        </div>
        <div className="zi-grid-item" data-index="left-circle-o0xe80cleftcircleoutline">
          <Icon type="left-circle-o" />
          <span className="zi-grid-item-name">left-circle-o(0xe80c)</span>
        </div>
        <div className="zi-grid-item" data-index="left-circle0xe80dleftcirclefilled">
          <Icon type="left-circle" />
          <span className="zi-grid-item-name">left-circle(0xe80d)</span>
        </div>
        <div className="zi-grid-item" data-index="right-circle-o0xe80erightcircleoutline">
          <Icon type="right-circle-o" />
          <span className="zi-grid-item-name">right-circle-o(0xe80e)</span>
        </div>
        <div className="zi-grid-item" data-index="right-circle0xe80frightcirclefilled">
          <Icon type="right-circle" />
          <span className="zi-grid-item-name">right-circle(0xe80f)</span>
        </div>
        <div className="zi-grid-item" data-index="check0xe810check">
          <Icon type="check" />
          <span className="zi-grid-item-name">check(0xe810)</span>
        </div>
        <div className="zi-grid-item" data-index="check-circle-o0xe811checkcircleoutline">
          <Icon type="check-circle-o" />
          <span className="zi-grid-item-name">check-circle-o(0xe811)</span>
        </div>
        <div className="zi-grid-item" data-index="check-circle0xe812checkcirclefilled">
          <Icon type="check-circle" />
          <span className="zi-grid-item-name">check-circle(0xe812)</span>
        </div>
        <div className="zi-grid-item" data-index="close0xe813closenaked">
          <Icon type="close" />
          <span className="zi-grid-item-name">close(0xe813)</span>
        </div>
        <div className="zi-grid-item" data-index="close-circle-o0xe814closecircleoutline">
          <Icon type="close-circle-o" />
          <span className="zi-grid-item-name">close-circle-o(0xe814)</span>
        </div>
        <div className="zi-grid-item" data-index="close-circle0xe815closecirclefilled">
          <Icon type="close-circle" />
          <span className="zi-grid-item-name">close-circle(0xe815)</span>
        </div>
        <div className="zi-grid-item" data-index="error-circle-o0xe816errorcircleoutline">
          <Icon type="error-circle-o" />
          <span className="zi-grid-item-name">error-circle-o(0xe816)</span>
        </div>
        <div className="zi-grid-item" data-index="error-circle0xe817errorcirclefilled">
          <Icon type="error-circle" />
          <span className="zi-grid-item-name">error-circle(0xe817)</span>
        </div>
        <div className="zi-grid-item" data-index="warning-o0xe818warningtriangleoutline">
          <Icon type="warning-o" />
          <span className="zi-grid-item-name">warning-o(0xe818)</span>
        </div>
        <div className="zi-grid-item" data-index="warning0xe819warningtrianglefilled">
          <Icon type="warning" />
          <span className="zi-grid-item-name">warning(0xe819)</span>
        </div>
        <div className="zi-grid-item" data-index="info-circle-o0xe81ainfocircleoutline">
          <Icon type="info-circle-o" />
          <span className="zi-grid-item-name">info-circle-o(0xe81a)</span>
        </div>
        <div className="zi-grid-item" data-index="info-circle0xe81binfocirclefilled">
          <Icon type="info-circle" />
          <span className="zi-grid-item-name">info-circle(0xe81b)</span>
        </div>
        <div className="zi-grid-item" data-index="help-circle-o0xe81chelpcircleoutline">
          <Icon type="help-circle-o" />
          <span className="zi-grid-item-name">help-circle-o(0xe81c)</span>
        </div>
        <div className="zi-grid-item" data-index="help-circle0xe81dhelpcirclefilled">
          <Icon type="help-circle" />
          <span className="zi-grid-item-name">help-circle(0xe81d)</span>
        </div>
        <div className="zi-grid-item" data-index="pending-circle0xe81ependingcircle">
          <Icon type="pending-circle" />
          <span className="zi-grid-item-name">pending-circle(0xe81e)</span>
        </div>
        <div className="zi-grid-item" data-index="clock-o0xe81fclockoutline">
          <Icon type="clock-o" />
          <span className="zi-grid-item-name">clock-o(0xe81f)</span>
        </div>
        <div className="zi-grid-item" data-index="clock0xe820clockfilled">
          <Icon type="clock" />
          <span className="zi-grid-item-name">clock(0xe820)</span>
        </div>
        <div className="zi-grid-item" data-index="plus-circle-o0xe821addpluscircleoutline">
          <Icon type="plus-circle-o" />
          <span className="zi-grid-item-name">plus-circle-o(0xe821)</span>
        </div>
        <div className="zi-grid-item" data-index="plus-circle0xe822addpluscirclefilled">
          <Icon type="plus-circle" />
          <span className="zi-grid-item-name">plus-circle(0xe822)</span>
        </div>
        <div className="zi-grid-item" data-index="plus0xe823addplus">
          <Icon type="plus" />
          <span className="zi-grid-item-name">plus(0xe823)</span>
        </div>
        <div className="zi-grid-item" data-index="add-page0xe824addnewpage">
          <Icon type="add-page" />
          <span className="zi-grid-item-name">add-page(0xe824)</span>
        </div>
        <div className="zi-grid-item" data-index="subtract-circle-o0xe825minussubtract circleoutline">
          <Icon type="subtract-circle-o" />
          <span className="zi-grid-item-name">subtract-circle-o(0xe825)</span>
        </div>
        <div className="zi-grid-item" data-index="subtract-circle0xe826minussubtractcirclefilled">
          <Icon type="subtract-circle" />
          <span className="zi-grid-item-name">subtract-circle(0xe826)</span>
        </div>
        <div className="zi-grid-item" data-index="search0xe828search">
          <Icon type="search" />
          <span className="zi-grid-item-name">search(0xe828)</span>
        </div>
        <div className="zi-grid-item" data-index="remove-o0xe829deleteremoveoutline">
          <Icon type="remove-o" />
          <span className="zi-grid-item-name">remove-o(0xe829)</span>
        </div>
        <div className="zi-grid-item" data-index="more0xe82amore">
          <Icon type="more" />
          <span className="zi-grid-item-name">more(0xe82a)</span>
        </div>
        <div className="zi-grid-item" data-index="customer-service0xe82bcustomer-service">
          <Icon type="customer-service" />
          <span className="zi-grid-item-name">customer-service(0xe82b)</span>
        </div>
        <div className="zi-grid-item" data-index="hotline-o0xe82chotlineoutline">
          <Icon type="hotline-o" />
          <span className="zi-grid-item-name">hotline-o(0xe82c)</span>
        </div>
        <div className="zi-grid-item" data-index="message-o0xe82dmessageoutline">
          <Icon type="message-o" />
          <span className="zi-grid-item-name">message-o(0xe82d)</span>
        </div>
        <div className="zi-grid-item" data-index="message0xe82emessagefilled">
          <Icon type="message" />
          <span className="zi-grid-item-name">message(0xe82e)</span>
        </div>
        <div className="zi-grid-item" data-index="bell-o0xe82fbelloutline">
          <Icon type="bell-o" />
          <span className="zi-grid-item-name">bell-o(0xe82f)</span>
        </div>
        <div className="zi-grid-item" data-index="bell0xe830bellfilled">
          <Icon type="bell" />
          <span className="zi-grid-item-name">bell(0xe830)</span>
        </div>
        <div className="zi-grid-item" data-index="calendar-o0xe831calendaroutline">
          <Icon type="calendar-o" />
          <span className="zi-grid-item-name">calendar-o(0xe831)</span>
        </div>
        <div className="zi-grid-item" data-index="calendar0xe832calendarfilled">
          <Icon type="calendar" />
          <span className="zi-grid-item-name">calendar(0xe832)</span>
        </div>
        <div className="zi-grid-item" data-index="star-o0xe833staroutline">
          <Icon type="star-o" />
          <span className="zi-grid-item-name">star-o(0xe833)</span>
        </div>
        <div className="zi-grid-item" data-index="star0xe834starfilled">
          <Icon type="star" />
          <span className="zi-grid-item-name">star(0xe834)</span>
        </div>
        <div className="zi-grid-item" data-index="lock0xe835locklocked">
          <Icon type="lock" />
          <span className="zi-grid-item-name">lock(0xe835)</span>
        </div>
        <div className="zi-grid-item" data-index="unlock0xe836unlockunlocked">
          <Icon type="unlock" />
          <span className="zi-grid-item-name">unlock(0xe836)</span>
        </div>
        <div className="zi-grid-item" data-index="upload0xe837uploadfilled">
          <Icon type="upload" />
          <span className="zi-grid-item-name">upload(0xe837)</span>
        </div>
        <div className="zi-grid-item" data-index="download0xe838download">
          <Icon type="download" />
          <span className="zi-grid-item-name">download(0xe838)</span>
        </div>
        <div className="zi-grid-item" data-index="export0xe839exportfilled">
          <Icon type="export" />
          <span className="zi-grid-item-name">export(0xe839)</span>
        </div>
        <div className="zi-grid-item" data-index="share0xe83ashare">
          <Icon type="share" />
          <span className="zi-grid-item-name">share(0xe83a)</span>
        </div>
        <div className="zi-grid-item" data-index="nav-line0xe83bnavline">
          <Icon type="nav-line" />
          <span className="zi-grid-item-name">nav-line(0xe83b)</span>
        </div>
        <div className="zi-grid-item" data-index="nav-grid0xe83cnavgrid">
          <Icon type="nav-grid" />
          <span className="zi-grid-item-name">nav-grid(0xe83c)</span>
        </div>
        <div className="zi-grid-item" data-index="back0xe83dback">
          <Icon type="back" />
          <span className="zi-grid-item-name">back(0xe83d)</span>
        </div>
        <div className="zi-grid-item" data-index="link0xe83elink">
          <Icon type="link" />
          <span className="zi-grid-item-name">link(0xe83e)</span>
        </div>
        <div className="zi-grid-item" data-index="qrcode0xe83fqrcode">
          <Icon type="qrcode" />
          <span className="zi-grid-item-name">qrcode(0xe83f)</span>
        </div>
        <div className="zi-grid-item" data-index="edit-o0xe840editoutline">
          <Icon type="edit-o" />
          <span className="zi-grid-item-name">edit-o(0xe840)</span>
        </div>
        <div className="zi-grid-item" data-index="suggestions0xe841suggestionsoutline">
          <Icon type="suggestions" />
          <span className="zi-grid-item-name">suggestions(0xe841)</span>
        </div>
        <div className="zi-grid-item" data-index="feedback0xe842feedback">
          <Icon type="feedback" />
          <span className="zi-grid-item-name">feedback(0xe842)</span>
        </div>
        <div className="zi-grid-item" data-index="smile0xe843smile">
          <Icon type="smile" />
          <span className="zi-grid-item-name">smile(0xe843)</span>
        </div>
        <div className="zi-grid-item" data-index="photo0xe844photo">
          <Icon type="photo" />
          <span className="zi-grid-item-name">photo(0xe844)</span>
        </div>
        <div className="zi-grid-item" data-index="tools-o0xe845toolsoutline">
          <Icon type="tools-o" />
          <span className="zi-grid-item-name">tools-o(0xe845)</span>
        </div>
        <div className="zi-grid-item" data-index="summary-o0xe846summaryoutline">
          <Icon type="summary-o" />
          <span className="zi-grid-item-name">summary-o(0xe846)</span>
        </div>
        <div className="zi-grid-item" data-index="summary0xe847summaryfilled">
          <Icon type="summary" />
          <span className="zi-grid-item-name">summary(0xe847)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-o0xe848shopoutline">
          <Icon type="shop-o" />
          <span className="zi-grid-item-name">shop-o(0xe848)</span>
        </div>
        <div className="zi-grid-item" data-index="shop0xe849shopfilled">
          <Icon type="shop" />
          <span className="zi-grid-item-name">shop(0xe849)</span>
        </div>
        <div className="zi-grid-item" data-index="goods-o0xe84bgoodsoutline">
          <Icon type="goods-o" />
          <span className="zi-grid-item-name">goods-o(0xe84b)</span>
        </div>
        <div className="zi-grid-item" data-index="goods0xe84cgoodsfilled">
          <Icon type="goods" />
          <span className="zi-grid-item-name">goods(0xe84c)</span>
        </div>
        <div className="zi-grid-item" data-index="order-o0xe84dorderoutline">
          <Icon type="order-o" />
          <span className="zi-grid-item-name">order-o(0xe84d)</span>
        </div>
        <div className="zi-grid-item" data-index="order0xe84eorderfilled">
          <Icon type="order" />
          <span className="zi-grid-item-name">order(0xe84e)</span>
        </div>
        <div className="zi-grid-item" data-index="customer-o0xe84fcustomeroutline">
          <Icon type="customer-o" />
          <span className="zi-grid-item-name">customer-o(0xe84f)</span>
        </div>
        <div className="zi-grid-item" data-index="customer0xe850customerfilled">
          <Icon type="customer" />
          <span className="zi-grid-item-name">customer(0xe850)</span>
        </div>
        <div className="zi-grid-item" data-index="chart-o0xe851datachartoutline">
          <Icon type="chart-o" />
          <span className="zi-grid-item-name">chart-o(0xe851)</span>
        </div>
        <div className="zi-grid-item" data-index="chart0xe852datachartfilled">
          <Icon type="chart" />
          <span className="zi-grid-item-name">chart(0xe852)</span>
        </div>
        <div className="zi-grid-item" data-index="capital-o0xe853capitaloutline">
          <Icon type="capital-o" />
          <span className="zi-grid-item-name">capital-o(0xe853)</span>
        </div>
        <div className="zi-grid-item" data-index="capital0xe854capitalfilled">
          <Icon type="capital" />
          <span className="zi-grid-item-name">capital(0xe854)</span>
        </div>
        <div className="zi-grid-item" data-index="cashier0xe856cashier">
          <Icon type="cashier" />
          <span className="zi-grid-item-name">cashier(0xe856)</span>
        </div>
        <div className="zi-grid-item" data-index="marketing0xe857marketing">
          <Icon type="marketing" />
          <span className="zi-grid-item-name">marketing(0xe857)</span>
        </div>
        <div className="zi-grid-item" data-index="settings-o0xe858settingsoutline">
          <Icon type="settings-o" />
          <span className="zi-grid-item-name">settings-o(0xe858)</span>
        </div>
        <div className="zi-grid-item" data-index="settings0xe859settingsfilled">
          <Icon type="settings" />
          <span className="zi-grid-item-name">settings(0xe859)</span>
        </div>
        <div className="zi-grid-item" data-index="countdown0xe85acountdown">
          <Icon type="countdown" />
          <span className="zi-grid-item-name">countdown(0xe85a)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-decorate0xe85bshopdecorate">
          <Icon type="shop-decorate" />
          <span className="zi-grid-item-name">shop-decorate(0xe85b)</span>
        </div>
        <div className="zi-grid-item" data-index="gift0xe85cgift">
          <Icon type="gift" />
          <span className="zi-grid-item-name">gift(0xe85c)</span>
        </div>
        <div className="zi-grid-item" data-index="business-o0xe85dbusinessoutline">
          <Icon type="business-o" />
          <span className="zi-grid-item-name">business-o(0xe85d)</span>
        </div>
        <div className="zi-grid-item" data-index="business0xe85ebusinessfilled">
          <Icon type="business" />
          <span className="zi-grid-item-name">business(0xe85e)</span>
        </div>
        <div className="zi-grid-item" data-index="approval-o0xe85fapprovaloutline">
          <Icon type="approval-o" />
          <span className="zi-grid-item-name">approval-o(0xe85f)</span>
        </div>
        <div className="zi-grid-item" data-index="approval0xe860approvalfilled">
          <Icon type="approval" />
          <span className="zi-grid-item-name">approval(0xe860)</span>
        </div>
        <div className="zi-grid-item" data-index="ticket-o0xe861ticketoutline">
          <Icon type="ticket-o" />
          <span className="zi-grid-item-name">ticket-o(0xe861)</span>
        </div>
        <div className="zi-grid-item" data-index="ticket0xe862ticketfilled">
          <Icon type="ticket" />
          <span className="zi-grid-item-name">ticket(0xe862)</span>
        </div>
        <div className="zi-grid-item" data-index="report-o0xe863reportoutline">
          <Icon type="report-o" />
          <span className="zi-grid-item-name">report-o(0xe863)</span>
        </div>
        <div className="zi-grid-item" data-index="report0xe864reportfilled">
          <Icon type="report" />
          <span className="zi-grid-item-name">report(0xe864)</span>
        </div>
        <div className="zi-grid-item" data-index="expand-customer-o0xe865expandcustomeroutline">
          <Icon type="expand-customer-o" />
          <span className="zi-grid-item-name">expand-customer-o(0xe865)</span>
        </div>
        <div className="zi-grid-item" data-index="expand-customer0xe866expandcustomerfilled">
          <Icon type="expand-customer" />
          <span className="zi-grid-item-name">expand-customer(0xe866)</span>
        </div>
        <div className="zi-grid-item" data-index="checkin-o0xe867checkinoutline">
          <Icon type="checkin-o" />
          <span className="zi-grid-item-name">checkin-o(0xe867)</span>
        </div>
        <div className="zi-grid-item" data-index="checkin0xe868checkinfilled">
          <Icon type="checkin" />
          <span className="zi-grid-item-name">checkin(0xe868)</span>
        </div>
        <div className="zi-grid-item" data-index="assess-o0xe869assessoutline">
          <Icon type="assess-o" />
          <span className="zi-grid-item-name">assess-o(0xe869)</span>
        </div>
        <div className="zi-grid-item" data-index="assess0xe86aassessfilled">
          <Icon type="assess" />
          <span className="zi-grid-item-name">assess(0xe86a)</span>
        </div>
        <div className="zi-grid-item" data-index="hr-o0xe86bhuman resourceoutline">
          <Icon type="hr-o" />
          <span className="zi-grid-item-name">hr-o(0xe86b)</span>
        </div>
        <div className="zi-grid-item" data-index="hr0xe86chuman resourcefilled">
          <Icon type="hr" />
          <span className="zi-grid-item-name">hr(0xe86c)</span>
        </div>
        <div className="zi-grid-item" data-index="hc-manage-o0xe86dhc-manageoutline">
          <Icon type="hc-manage-o" />
          <span className="zi-grid-item-name">hc-manage-o(0xe86d)</span>
        </div>
        <div className="zi-grid-item" data-index="hc-manage0xe86ehc-managefilled">
          <Icon type="hc-manage" />
          <span className="zi-grid-item-name">hc-manage(0xe86e)</span>
        </div>
        <div className="zi-grid-item" data-index="visit-o0xe86fvisitoutline">
          <Icon type="visit-o" />
          <span className="zi-grid-item-name">visit-o(0xe86f)</span>
        </div>
        <div className="zi-grid-item" data-index="im-o0xe870imoutline">
          <Icon type="im-o" />
          <span className="zi-grid-item-name">im-o(0xe870)</span>
        </div>
        <div className="zi-grid-item" data-index="knowledge-o0xe871knowledgeoutline">
          <Icon type="knowledge-o" />
          <span className="zi-grid-item-name">knowledge-o(0xe871)</span>
        </div>
        <div className="zi-grid-item" data-index="flow-o0xe872resourceflowoutline">
          <Icon type="flow-o" />
          <span className="zi-grid-item-name">flow-o(0xe872)</span>
        </div>
        <div className="zi-grid-item" data-index="strategy-o0xe873strategyoutline">
          <Icon type="strategy-o" />
          <span className="zi-grid-item-name">strategy-o(0xe873)</span>
        </div>
        <div className="zi-grid-item" data-index="contract-o0xe874contractoutline">
          <Icon type="contract-o" />
          <span className="zi-grid-item-name">contract-o(0xe874)</span>
        </div>
        <div className="zi-grid-item" data-index="channel-o0xe875channeloutline">
          <Icon type="channel-o" />
          <span className="zi-grid-item-name">channel-o(0xe875)</span>
        </div>
        <div className="zi-grid-item" data-index="qa-o0xe876qualityassuranceoutline">
          <Icon type="qa-o" />
          <span className="zi-grid-item-name">qa-o(0xe876)</span>
        </div>
        <div className="zi-grid-item" data-index="rights-list-o0xe877rights-listoutline">
          <Icon type="rights-list-o" />
          <span className="zi-grid-item-name">rights-list-o(0xe877)</span>
        </div>
        <div className="zi-grid-item" data-index="report-forms-o0xe878reportformsoutline">
          <Icon type="report-forms-o" />
          <span className="zi-grid-item-name">report-forms-o(0xe878)</span>
        </div>
        <div className="zi-grid-item" data-index="report-forms0xe879reportformsfilled">
          <Icon type="report-forms" />
          <span className="zi-grid-item-name">report-forms(0xe879)</span>
        </div>
        <div className="zi-grid-item" data-index="coupon-o0xe87acouponoutline">
          <Icon type="coupon-o" />
          <span className="zi-grid-item-name">coupon-o(0xe87a)</span>
        </div>
        <div className="zi-grid-item" data-index="coupon0xe87bcouponfilled">
          <Icon type="coupon" />
          <span className="zi-grid-item-name">coupon(0xe87b)</span>
        </div>
        <div className="zi-grid-item" data-index="inventory-o0xe87cinventoryoutline">
          <Icon type="inventory-o" />
          <span className="zi-grid-item-name">inventory-o(0xe87c)</span>
        </div>
        <div className="zi-grid-item" data-index="inventory0xe87dinventoryfilled">
          <Icon type="inventory" />
          <span className="zi-grid-item-name">inventory(0xe87d)</span>
        </div>
        <div className="zi-grid-item" data-index="procurement-o0xe87eprocurementoutline">
          <Icon type="procurement-o" />
          <span className="zi-grid-item-name">procurement-o(0xe87e)</span>
        </div>
        <div className="zi-grid-item" data-index="procurement0xe87fprocurementfilled">
          <Icon type="procurement" />
          <span className="zi-grid-item-name">procurement(0xe87f)</span>
        </div>
        <div className="zi-grid-item" data-index="development-doc0xe880developmentdoc">
          <Icon type="development-doc" />
          <span className="zi-grid-item-name">development-doc(0xe880)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-analyze-o0xe881shopanalyzeoutline">
          <Icon type="shop-analyze-o" />
          <span className="zi-grid-item-name">shop-analyze-o(0xe881)</span>
        </div>
        <div className="zi-grid-item" data-index="cashier-desk-o0xe882cashierdeskoutline">
          <Icon type="cashier-desk-o" />
          <span className="zi-grid-item-name">cashier-desk-o(0xe882)</span>
        </div>
        <div className="zi-grid-item" data-index="withdraw-cash-o0xe883withdrawcashoutline">
          <Icon type="withdraw-cash-o" />
          <span className="zi-grid-item-name">withdraw-cash-o(0xe883)</span>
        </div>
        <div className="zi-grid-item" data-index="pending-payment-o0xe884paymentpendingoutline">
          <Icon type="pending-payment-o" />
          <span className="zi-grid-item-name">pending-payment-o(0xe884)</span>
        </div>
        <div className="zi-grid-item" data-index="salesman-o0xe885salesmanoutline">
          <Icon type="salesman-o" />
          <span className="zi-grid-item-name">salesman-o(0xe885)</span>
        </div>
        <div className="zi-grid-item" data-index="tendency-o0xe886tendencyoutline">
          <Icon type="tendency-o" />
          <span className="zi-grid-item-name">tendency-o(0xe886)</span>
        </div>
        <div className="zi-grid-item" data-index="distribution-o0xe887distributionoutline">
          <Icon type="distribution-o" />
          <span className="zi-grid-item-name">distribution-o(0xe887)</span>
        </div>
        <div className="zi-grid-item" data-index="member-o0xe888memberoutline">
          <Icon type="member-o" />
          <span className="zi-grid-item-name">member-o(0xe888)</span>
        </div>
        <div className="zi-grid-item" data-index="video-guide0xe889video-guideoutlineguide">
          <Icon type="video-guide" />
          <span className="zi-grid-item-name">video-guide(0xe889)</span>
        </div>
        <div className="zi-grid-item" data-index="text-guide0xe88atext-guideoutlineguide">
          <Icon type="text-guide" />
          <span className="zi-grid-item-name">text-guide(0xe88a)</span>
        </div>
        <div className="zi-grid-item" data-index="youzan-o0xe88byouzanlogooutline">
          <Icon type="youzan-o" />
          <span className="zi-grid-item-name">youzan-o(0xe88b)</span>
        </div>
        <div className="zi-grid-item" data-index="youzan0xe88cyouzanlogofilled">
          <Icon type="youzan" />
          <span className="zi-grid-item-name">youzan(0xe88c)</span>
        </div>
        <div className="zi-grid-item" data-index="mini-apps-o0xe88dwechatminiappoutline">
          <Icon type="mini-apps-o" />
          <span className="zi-grid-item-name">mini-apps-o(0xe88d)</span>
        </div>
        <div className="zi-grid-item" data-index="mini-apps0xe88ewechatminiappfilled">
          <Icon type="mini-apps" />
          <span className="zi-grid-item-name">mini-apps(0xe88e)</span>
        </div>
        <div className="zi-grid-item" data-index="wechat0xe88fwechatfilled">
          <Icon type="wechat" />
          <span className="zi-grid-item-name">wechat(0xe88f)</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<IconGrid />, mountNode);
```

<style>
.zenticon {
	font-size: 20px;
}

.zenticon-youzan {
	color: #EB0B19;
}

.zi-grid {
	display: flex;
	flex-wrap: wrap;

	.zenticon {
		vertical-align: middle;
		font-size: 20px;
		color: #333;
	}

	.zi-search-input {
		width: 100%;
		margin-bottom: 20px;

		input {
			width: 100%;
			outline: none;
			font-size: 20px;
			box-sizing: border-box;
			padding: 0.3em 0.5em;
			border-radius: 4px;
			border: 1px solid #bbb !important;

			&:focus {
				border: 1px solid #3388FF !important;
			}
		}
	}

	.zi-grid-item {
		box-sizing: border-box;
		width: 50%;
		margin: 10px 0;

		.zi-grid-item-name {
			margin-left: 8px;
		}
	}
}
</style>
