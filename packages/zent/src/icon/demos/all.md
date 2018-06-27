---
order: 3
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

        <div className="zi-grid-item" data-index="summary-o0xe800summaryoutline">
          <Icon type="summary-o" />
          <span className="zi-grid-item-name">summary-o(0xe800)</span>
        </div>
        <div className="zi-grid-item" data-index="summary0xe801summaryfilled">
          <Icon type="summary" />
          <span className="zi-grid-item-name">summary(0xe801)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-o0xe802shopoutline">
          <Icon type="shop-o" />
          <span className="zi-grid-item-name">shop-o(0xe802)</span>
        </div>
        <div className="zi-grid-item" data-index="shop0xe803shopfilled">
          <Icon type="shop" />
          <span className="zi-grid-item-name">shop(0xe803)</span>
        </div>
        <div className="zi-grid-item" data-index="goods-o0xe804goodsoutline">
          <Icon type="goods-o" />
          <span className="zi-grid-item-name">goods-o(0xe804)</span>
        </div>
        <div className="zi-grid-item" data-index="goods0xe805goodsfilled">
          <Icon type="goods" />
          <span className="zi-grid-item-name">goods(0xe805)</span>
        </div>
        <div className="zi-grid-item" data-index="order-o0xe806orderoutline">
          <Icon type="order-o" />
          <span className="zi-grid-item-name">order-o(0xe806)</span>
        </div>
        <div className="zi-grid-item" data-index="order0xe807orderfilled">
          <Icon type="order" />
          <span className="zi-grid-item-name">order(0xe807)</span>
        </div>
        <div className="zi-grid-item" data-index="customer-o0xe808customeroutline">
          <Icon type="customer-o" />
          <span className="zi-grid-item-name">customer-o(0xe808)</span>
        </div>
        <div className="zi-grid-item" data-index="customer0xe809customerfilled">
          <Icon type="customer" />
          <span className="zi-grid-item-name">customer(0xe809)</span>
        </div>
        <div className="zi-grid-item" data-index="chart-o0xe80adatachartoutline">
          <Icon type="chart-o" />
          <span className="zi-grid-item-name">chart-o(0xe80a)</span>
        </div>
        <div className="zi-grid-item" data-index="chart0xe80bdatachartfilled">
          <Icon type="chart" />
          <span className="zi-grid-item-name">chart(0xe80b)</span>
        </div>
        <div className="zi-grid-item" data-index="capital-o0xe80ccapitaloutline">
          <Icon type="capital-o" />
          <span className="zi-grid-item-name">capital-o(0xe80c)</span>
        </div>
        <div className="zi-grid-item" data-index="capital0xe80dcapitalfilled">
          <Icon type="capital" />
          <span className="zi-grid-item-name">capital(0xe80d)</span>
        </div>
        <div className="zi-grid-item" data-index="casher0xe80ecasher">
          <Icon type="casher" />
          <span className="zi-grid-item-name">casher(0xe80e)</span>
        </div>
        <div className="zi-grid-item" data-index="marketing0xe80fmarketing">
          <Icon type="marketing" />
          <span className="zi-grid-item-name">marketing(0xe80f)</span>
        </div>
        <div className="zi-grid-item" data-index="settings-o0xe810settingsoutline">
          <Icon type="settings-o" />
          <span className="zi-grid-item-name">settings-o(0xe810)</span>
        </div>
        <div className="zi-grid-item" data-index="settings0xe811settingsfilled">
          <Icon type="settings" />
          <span className="zi-grid-item-name">settings(0xe811)</span>
        </div>
        <div className="zi-grid-item" data-index="youzan-o0xe812youzanlogooutline">
          <Icon type="youzan-o" />
          <span className="zi-grid-item-name">youzan-o(0xe812)</span>
        </div>
        <div className="zi-grid-item" data-index="youzan0xe813youzanlogofilled">
          <Icon type="youzan" />
          <span className="zi-grid-item-name">youzan(0xe813)</span>
        </div>
        <div className="zi-grid-item" data-index="close0xe814closenaked">
          <Icon type="close" />
          <span className="zi-grid-item-name">close(0xe814)</span>
        </div>
        <div className="zi-grid-item" data-index="close-circle-o0xe815closecircleoutline">
          <Icon type="close-circle-o" />
          <span className="zi-grid-item-name">close-circle-o(0xe815)</span>
        </div>
        <div className="zi-grid-item" data-index="close-circle0xe816closecirclefilled">
          <Icon type="close-circle" />
          <span className="zi-grid-item-name">close-circle(0xe816)</span>
        </div>
        <div className="zi-grid-item" data-index="message0xe817messagefilled">
          <Icon type="message" />
          <span className="zi-grid-item-name">message(0xe817)</span>
        </div>
        <div className="zi-grid-item" data-index="message-o0xe818messageoutline">
          <Icon type="message-o" />
          <span className="zi-grid-item-name">message-o(0xe818)</span>
        </div>
        <div className="zi-grid-item" data-index="bell0xe819bellfilled">
          <Icon type="bell" />
          <span className="zi-grid-item-name">bell(0xe819)</span>
        </div>
        <div className="zi-grid-item" data-index="bell-o0xe81abelloutline">
          <Icon type="bell-o" />
          <span className="zi-grid-item-name">bell-o(0xe81a)</span>
        </div>
        <div className="zi-grid-item" data-index="calendar0xe81bcalendarfilled">
          <Icon type="calendar" />
          <span className="zi-grid-item-name">calendar(0xe81b)</span>
        </div>
        <div className="zi-grid-item" data-index="calendar-o0xe81ccalendaroutline">
          <Icon type="calendar-o" />
          <span className="zi-grid-item-name">calendar-o(0xe81c)</span>
        </div>
        <div className="zi-grid-item" data-index="search0xe81dsearch">
          <Icon type="search" />
          <span className="zi-grid-item-name">search(0xe81d)</span>
        </div>
        <div className="zi-grid-item" data-index="customer-service0xe81ecustomer-service">
          <Icon type="customer-service" />
          <span className="zi-grid-item-name">customer-service(0xe81e)</span>
        </div>
        <div className="zi-grid-item" data-index="feedback0xe81ffeedback">
          <Icon type="feedback" />
          <span className="zi-grid-item-name">feedback(0xe81f)</span>
        </div>
        <div className="zi-grid-item" data-index="error-circle-o0xe820errorcircleoutline">
          <Icon type="error-circle-o" />
          <span className="zi-grid-item-name">error-circle-o(0xe820)</span>
        </div>
        <div className="zi-grid-item" data-index="error-circle0xe821errorcirclefilled">
          <Icon type="error-circle" />
          <span className="zi-grid-item-name">error-circle(0xe821)</span>
        </div>
        <div className="zi-grid-item" data-index="check-circle-o0xe822checkcircleoutline">
          <Icon type="check-circle-o" />
          <span className="zi-grid-item-name">check-circle-o(0xe822)</span>
        </div>
        <div className="zi-grid-item" data-index="check-circle0xe823checkcirclefilled">
          <Icon type="check-circle" />
          <span className="zi-grid-item-name">check-circle(0xe823)</span>
        </div>
        <div className="zi-grid-item" data-index="help-circle-o0xe824helpcircleoutline">
          <Icon type="help-circle-o" />
          <span className="zi-grid-item-name">help-circle-o(0xe824)</span>
        </div>
        <div className="zi-grid-item" data-index="help-circle0xe825helpcirclefilled">
          <Icon type="help-circle" />
          <span className="zi-grid-item-name">help-circle(0xe825)</span>
        </div>
        <div className="zi-grid-item" data-index="clock-o0xe826clockoutline">
          <Icon type="clock-o" />
          <span className="zi-grid-item-name">clock-o(0xe826)</span>
        </div>
        <div className="zi-grid-item" data-index="clock0xe827clockfilled">
          <Icon type="clock" />
          <span className="zi-grid-item-name">clock(0xe827)</span>
        </div>
        <div className="zi-grid-item" data-index="countdown0xe828countdown">
          <Icon type="countdown" />
          <span className="zi-grid-item-name">countdown(0xe828)</span>
        </div>
        <div className="zi-grid-item" data-index="download0xe829download">
          <Icon type="download" />
          <span className="zi-grid-item-name">download(0xe829)</span>
        </div>
        <div className="zi-grid-item" data-index="share0xe82ashare">
          <Icon type="share" />
          <span className="zi-grid-item-name">share(0xe82a)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-decorate0xe82bshopdecorate">
          <Icon type="shop-decorate" />
          <span className="zi-grid-item-name">shop-decorate(0xe82b)</span>
        </div>
        <div className="zi-grid-item" data-index="shop-template0xe82cshoptemplate">
          <Icon type="shop-template" />
          <span className="zi-grid-item-name">shop-template(0xe82c)</span>
        </div>
        <div className="zi-grid-item" data-index="gift0xe82dgift">
          <Icon type="gift" />
          <span className="zi-grid-item-name">gift(0xe82d)</span>
        </div>
        <div className="zi-grid-item" data-index="caret-up0xe82ecaretup">
          <Icon type="caret-up" />
          <span className="zi-grid-item-name">caret-up(0xe82e)</span>
        </div>
        <div className="zi-grid-item" data-index="caret-down0xe82fcaretdown">
          <Icon type="caret-down" />
          <span className="zi-grid-item-name">caret-down(0xe82f)</span>
        </div>
        <div className="zi-grid-item" data-index="arrow-up0xe830arrowup">
          <Icon type="arrow-up" />
          <span className="zi-grid-item-name">arrow-up(0xe830)</span>
        </div>
        <div className="zi-grid-item" data-index="arrow-down0xe831arrowdown">
          <Icon type="arrow-down" />
          <span className="zi-grid-item-name">arrow-down(0xe831)</span>
        </div>
        <div className="zi-grid-item" data-index="right0xe832right">
          <Icon type="right" />
          <span className="zi-grid-item-name">right(0xe832)</span>
        </div>
        <div className="zi-grid-item" data-index="right-circle0xe833rightfilled">
          <Icon type="right-circle" />
          <span className="zi-grid-item-name">right-circle(0xe833)</span>
        </div>
        <div className="zi-grid-item" data-index="plus0xe834addplus">
          <Icon type="plus" />
          <span className="zi-grid-item-name">plus(0xe834)</span>
        </div>
        <div className="zi-grid-item" data-index="star-o0xe835staroutline">
          <Icon type="star-o" />
          <span className="zi-grid-item-name">star-o(0xe835)</span>
        </div>
        <div className="zi-grid-item" data-index="star0xe836starfilled">
          <Icon type="star" />
          <span className="zi-grid-item-name">star(0xe836)</span>
        </div>
        <div className="zi-grid-item" data-index="check0xe837check">
          <Icon type="check" />
          <span className="zi-grid-item-name">check(0xe837)</span>
        </div>
        <div className="zi-grid-item" data-index="info-circle-o0xe838infocircleoutline">
          <Icon type="info-circle-o" />
          <span className="zi-grid-item-name">info-circle-o(0xe838)</span>
        </div>
        <div className="zi-grid-item" data-index="info-circle0xe839infocirclefilled">
          <Icon type="info-circle" />
          <span className="zi-grid-item-name">info-circle(0xe839)</span>
        </div>
        <div className="zi-grid-item" data-index="warning-o0xe83awarningtriangleoutline">
          <Icon type="warning-o" />
          <span className="zi-grid-item-name">warning-o(0xe83a)</span>
        </div>
        <div className="zi-grid-item" data-index="warning0xe83bwarningtrianglefilled">
          <Icon type="warning" />
          <span className="zi-grid-item-name">warning(0xe83b)</span>
        </div>
        <div className="zi-grid-item" data-index="lock0xe83clocklocked">
          <Icon type="lock" />
          <span className="zi-grid-item-name">lock(0xe83c)</span>
        </div>
        <div className="zi-grid-item" data-index="unlock0xe83dunlockunlocked">
          <Icon type="unlock" />
          <span className="zi-grid-item-name">unlock(0xe83d)</span>
        </div>
        <div className="zi-grid-item" data-index="pending-circle0xe83ependingcircle">
          <Icon type="pending-circle" />
          <span className="zi-grid-item-name">pending-circle(0xe83e)</span>
        </div>
        <div className="zi-grid-item" data-index="forbidden-circle0xe83fforbiddencircle">
          <Icon type="forbidden-circle" />
          <span className="zi-grid-item-name">forbidden-circle(0xe83f)</span>
        </div>
        <div className="zi-grid-item" data-index="business-o0xe840businessoutline">
          <Icon type="business-o" />
          <span className="zi-grid-item-name">business-o(0xe840)</span>
        </div>
        <div className="zi-grid-item" data-index="business0xe841businessfilled">
          <Icon type="business" />
          <span className="zi-grid-item-name">business(0xe841)</span>
        </div>
        <div className="zi-grid-item" data-index="approval-o0xe842approvaloutline">
          <Icon type="approval-o" />
          <span className="zi-grid-item-name">approval-o(0xe842)</span>
        </div>
        <div className="zi-grid-item" data-index="approval0xe843approvalfilled">
          <Icon type="approval" />
          <span className="zi-grid-item-name">approval(0xe843)</span>
        </div>
        <div className="zi-grid-item" data-index="ticket-o0xe844ticketoutline">
          <Icon type="ticket-o" />
          <span className="zi-grid-item-name">ticket-o(0xe844)</span>
        </div>
        <div className="zi-grid-item" data-index="ticket0xe845ticketfilled">
          <Icon type="ticket" />
          <span className="zi-grid-item-name">ticket(0xe845)</span>
        </div>
        <div className="zi-grid-item" data-index="report-o0xe846reportoutline">
          <Icon type="report-o" />
          <span className="zi-grid-item-name">report-o(0xe846)</span>
        </div>
        <div className="zi-grid-item" data-index="report0xe847reportfilled">
          <Icon type="report" />
          <span className="zi-grid-item-name">report(0xe847)</span>
        </div>
        <div className="zi-grid-item" data-index="expand-customer-o0xe848expandcustomeroutline">
          <Icon type="expand-customer-o" />
          <span className="zi-grid-item-name">expand-customer-o(0xe848)</span>
        </div>
        <div className="zi-grid-item" data-index="expand-customer0xe849expandcustomerfilled">
          <Icon type="expand-customer" />
          <span className="zi-grid-item-name">expand-customer(0xe849)</span>
        </div>
        <div className="zi-grid-item" data-index="checkin-o0xe84acheckinoutline">
          <Icon type="checkin-o" />
          <span className="zi-grid-item-name">checkin-o(0xe84a)</span>
        </div>
        <div className="zi-grid-item" data-index="checkin0xe84bcheckinfilled">
          <Icon type="checkin" />
          <span className="zi-grid-item-name">checkin(0xe84b)</span>
        </div>
        <div className="zi-grid-item" data-index="plus-circle-o0xe84caddpluscircleoutline">
          <Icon type="plus-circle-o" />
          <span className="zi-grid-item-name">plus-circle-o(0xe84c)</span>
        </div>
        <div className="zi-grid-item" data-index="subtract-circle-o0xe84dminussubtract circleoutline">
          <Icon type="subtract-circle-o" />
          <span className="zi-grid-item-name">subtract-circle-o(0xe84d)</span>
        </div>
        <div className="zi-grid-item" data-index="remove-o0xe84edeleteremoveoutline">
          <Icon type="remove-o" />
          <span className="zi-grid-item-name">remove-o(0xe84e)</span>
        </div>
        <div className="zi-grid-item" data-index="edit-o0xe84feditoutline">
          <Icon type="edit-o" />
          <span className="zi-grid-item-name">edit-o(0xe84f)</span>
        </div>
        <div className="zi-grid-item" data-index="assess-o0xe850assessoutline">
          <Icon type="assess-o" />
          <span className="zi-grid-item-name">assess-o(0xe850)</span>
        </div>
        <div className="zi-grid-item" data-index="assess0xe851assessfilled">
          <Icon type="assess" />
          <span className="zi-grid-item-name">assess(0xe851)</span>
        </div>
        <div className="zi-grid-item" data-index="upload0xe852uploadfilled">
          <Icon type="upload" />
          <span className="zi-grid-item-name">upload(0xe852)</span>
        </div>
        <div className="zi-grid-item" data-index="hr-o0xe853human resourceoutline">
          <Icon type="hr-o" />
          <span className="zi-grid-item-name">hr-o(0xe853)</span>
        </div>
        <div className="zi-grid-item" data-index="hr0xe854human resourcefilled">
          <Icon type="hr" />
          <span className="zi-grid-item-name">hr(0xe854)</span>
        </div>
        <div className="zi-grid-item" data-index="export0xe855exportfilled">
          <Icon type="export" />
          <span className="zi-grid-item-name">export(0xe855)</span>
        </div>
        <div className="zi-grid-item" data-index="suggestions0xe856suggestionsoutline">
          <Icon type="suggestions" />
          <span className="zi-grid-item-name">suggestions(0xe856)</span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
	<IconGrid />
	, mountNode
);
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

