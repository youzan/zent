---
order: 4
zh-CN:
	title: 所有图标
	x-cat-base: 基础类
	x-cat-business: 业务类
	x-cat-logo: 标示类
	searchPlaceholder: 搜索图标
	jsx: 复制 JSX
	name: 复制图标名称
en-US:
	title: All Icons
	x-cat-base: Base
	x-cat-business: Business
	x-cat-logo: Logo
	searchPlaceholder: Search icon
	jsx: Copy JSX
	name: Copy icon name
---

```jsx
import { Icon, Input, RadioGroup, Radio, CopyButton } from 'zent';

class IconGrid extends Component {
  state = {
    search: '',
    copyType: 'jsx',
  };

  onChange = evt => {
    this.setState({
      search: evt.target.value.trim().toLowerCase()
    });
  };

  onCopyOptionChange = evt => {
    this.setState({
      copyType: evt.target.value
    });
  };

  getIconString = name => () => {
    const { copyType } = this.state;

    if (copyType === 'jsx') {
      return `<Icon type="${name}" />`;
    }

    return name;
  };

  render() {
    const { search } = this.state;
    return (
      <div className="zi-grid">
        <div className="zi-grid-toolbar">
          {search && <style>{`.zi-grid-item:not([data-index*="${search}"]) { display: none; }`}</style>}
          <Input
            className="zi-search-input"
            icon="search"
            placeholder="{i18n.searchPlaceholder}"
            value={search}
            onChange={this.onChange}
          />

          <RadioGroup onChange={this.onCopyOptionChange} value={this.state.copyType}>
            <Radio value="jsx">{i18n.jsx}</Radio>
            <Radio value="name">{i18n.name}</Radio>
          </RadioGroup>
        </div>

        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-base}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("up")}
              onCopySuccess="up 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="upup"
              >
                <Icon type="up" />
                <span className="zi-grid-item-name">up</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("down")}
              onCopySuccess="down 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="downdown"
              >
                <Icon type="down" />
                <span className="zi-grid-item-name">down</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("left")}
              onCopySuccess="left 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="leftleft"
              >
                <Icon type="left" />
                <span className="zi-grid-item-name">left</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("right")}
              onCopySuccess="right 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="rightright"
              >
                <Icon type="right" />
                <span className="zi-grid-item-name">right</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("caret-up")}
              onCopySuccess="caret-up 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="caret-upcaretup"
              >
                <Icon type="caret-up" />
                <span className="zi-grid-item-name">caret-up</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("caret-down")}
              onCopySuccess="caret-down 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="caret-downcaretdown"
              >
                <Icon type="caret-down" />
                <span className="zi-grid-item-name">caret-down</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("arrow-up")}
              onCopySuccess="arrow-up 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="arrow-uparrowup"
              >
                <Icon type="arrow-up" />
                <span className="zi-grid-item-name">arrow-up</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("arrow-down")}
              onCopySuccess="arrow-down 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="arrow-downarrowdown"
              >
                <Icon type="arrow-down" />
                <span className="zi-grid-item-name">arrow-down</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("up-circle-o")}
              onCopySuccess="up-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="up-circle-oupcircleoutline"
              >
                <Icon type="up-circle-o" />
                <span className="zi-grid-item-name">up-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("up-circle")}
              onCopySuccess="up-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="up-circleupcirclefilled"
              >
                <Icon type="up-circle" />
                <span className="zi-grid-item-name">up-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("down-circle-o")}
              onCopySuccess="down-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="down-circle-odowncircleoutline"
              >
                <Icon type="down-circle-o" />
                <span className="zi-grid-item-name">down-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("down-circle")}
              onCopySuccess="down-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="down-circledowncirclefilled"
              >
                <Icon type="down-circle" />
                <span className="zi-grid-item-name">down-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("left-circle-o")}
              onCopySuccess="left-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="left-circle-oleftcircleoutline"
              >
                <Icon type="left-circle-o" />
                <span className="zi-grid-item-name">left-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("left-circle")}
              onCopySuccess="left-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="left-circleleftcirclefilled"
              >
                <Icon type="left-circle" />
                <span className="zi-grid-item-name">left-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("right-circle-o")}
              onCopySuccess="right-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="right-circle-orightcircleoutline"
              >
                <Icon type="right-circle-o" />
                <span className="zi-grid-item-name">right-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("right-circle")}
              onCopySuccess="right-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="right-circlerightcirclefilled"
              >
                <Icon type="right-circle" />
                <span className="zi-grid-item-name">right-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("check")}
              onCopySuccess="check 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="checkcheck"
              >
                <Icon type="check" />
                <span className="zi-grid-item-name">check</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("check-circle-o")}
              onCopySuccess="check-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="check-circle-ocheckcircleoutline"
              >
                <Icon type="check-circle-o" />
                <span className="zi-grid-item-name">check-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("check-circle")}
              onCopySuccess="check-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="check-circlecheckcirclefilled"
              >
                <Icon type="check-circle" />
                <span className="zi-grid-item-name">check-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("close")}
              onCopySuccess="close 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="closeclosenaked"
              >
                <Icon type="close" />
                <span className="zi-grid-item-name">close</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("close-circle-o")}
              onCopySuccess="close-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="close-circle-oclosecircleoutline"
              >
                <Icon type="close-circle-o" />
                <span className="zi-grid-item-name">close-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("close-circle")}
              onCopySuccess="close-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="close-circleclosecirclefilled"
              >
                <Icon type="close-circle" />
                <span className="zi-grid-item-name">close-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("error-circle-o")}
              onCopySuccess="error-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="error-circle-oerrorcircleoutline"
              >
                <Icon type="error-circle-o" />
                <span className="zi-grid-item-name">error-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("error-circle")}
              onCopySuccess="error-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="error-circleerrorcirclefilled"
              >
                <Icon type="error-circle" />
                <span className="zi-grid-item-name">error-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("warning-o")}
              onCopySuccess="warning-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="warning-owarningtriangleoutline"
              >
                <Icon type="warning-o" />
                <span className="zi-grid-item-name">warning-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("warning")}
              onCopySuccess="warning 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="warningwarningtrianglefilled"
              >
                <Icon type="warning" />
                <span className="zi-grid-item-name">warning</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("info-circle-o")}
              onCopySuccess="info-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="info-circle-oinfocircleoutline"
              >
                <Icon type="info-circle-o" />
                <span className="zi-grid-item-name">info-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("info-circle")}
              onCopySuccess="info-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="info-circleinfocirclefilled"
              >
                <Icon type="info-circle" />
                <span className="zi-grid-item-name">info-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("help-circle-o")}
              onCopySuccess="help-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="help-circle-ohelpcircleoutline"
              >
                <Icon type="help-circle-o" />
                <span className="zi-grid-item-name">help-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("help-circle")}
              onCopySuccess="help-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="help-circlehelpcirclefilled"
              >
                <Icon type="help-circle" />
                <span className="zi-grid-item-name">help-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("pending-circle")}
              onCopySuccess="pending-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="pending-circlependingcircle"
              >
                <Icon type="pending-circle" />
                <span className="zi-grid-item-name">pending-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("clock-o")}
              onCopySuccess="clock-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="clock-oclockoutline"
              >
                <Icon type="clock-o" />
                <span className="zi-grid-item-name">clock-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("clock")}
              onCopySuccess="clock 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="clockclockfilled"
              >
                <Icon type="clock" />
                <span className="zi-grid-item-name">clock</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("plus-circle-o")}
              onCopySuccess="plus-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="plus-circle-oaddpluscircleoutline"
              >
                <Icon type="plus-circle-o" />
                <span className="zi-grid-item-name">plus-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("plus-circle")}
              onCopySuccess="plus-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="plus-circleaddpluscirclefilled"
              >
                <Icon type="plus-circle" />
                <span className="zi-grid-item-name">plus-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("plus")}
              onCopySuccess="plus 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="plusaddplus"
              >
                <Icon type="plus" />
                <span className="zi-grid-item-name">plus</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("add-page")}
              onCopySuccess="add-page 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="add-pageaddnewpage"
              >
                <Icon type="add-page" />
                <span className="zi-grid-item-name">add-page</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("subtract-circle-o")}
              onCopySuccess="subtract-circle-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="subtract-circle-ominussubtract circleoutline"
              >
                <Icon type="subtract-circle-o" />
                <span className="zi-grid-item-name">subtract-circle-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("subtract-circle")}
              onCopySuccess="subtract-circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="subtract-circleminussubtractcirclefilled"
              >
                <Icon type="subtract-circle" />
                <span className="zi-grid-item-name">subtract-circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("search")}
              onCopySuccess="search 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="searchsearch"
              >
                <Icon type="search" />
                <span className="zi-grid-item-name">search</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("remove-o")}
              onCopySuccess="remove-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="remove-odeleteremoveoutline"
              >
                <Icon type="remove-o" />
                <span className="zi-grid-item-name">remove-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("more")}
              onCopySuccess="more 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="moremore"
              >
                <Icon type="more" />
                <span className="zi-grid-item-name">more</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer-service")}
              onCopySuccess="customer-service 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="customer-servicecustomer-service"
              >
                <Icon type="customer-service" />
                <span className="zi-grid-item-name">customer-service</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hotline-o")}
              onCopySuccess="hotline-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hotline-ohotlineoutline"
              >
                <Icon type="hotline-o" />
                <span className="zi-grid-item-name">hotline-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("message-o")}
              onCopySuccess="message-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="message-omessageoutline"
              >
                <Icon type="message-o" />
                <span className="zi-grid-item-name">message-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("message")}
              onCopySuccess="message 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="messagemessagefilled"
              >
                <Icon type="message" />
                <span className="zi-grid-item-name">message</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bell-o")}
              onCopySuccess="bell-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bell-obelloutline"
              >
                <Icon type="bell-o" />
                <span className="zi-grid-item-name">bell-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bell")}
              onCopySuccess="bell 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bellbellfilled"
              >
                <Icon type="bell" />
                <span className="zi-grid-item-name">bell</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("calendar-o")}
              onCopySuccess="calendar-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="calendar-ocalendaroutline"
              >
                <Icon type="calendar-o" />
                <span className="zi-grid-item-name">calendar-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("calendar")}
              onCopySuccess="calendar 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="calendarcalendarfilled"
              >
                <Icon type="calendar" />
                <span className="zi-grid-item-name">calendar</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("star-o")}
              onCopySuccess="star-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="star-ostaroutline"
              >
                <Icon type="star-o" />
                <span className="zi-grid-item-name">star-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("star")}
              onCopySuccess="star 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="starstarfilled"
              >
                <Icon type="star" />
                <span className="zi-grid-item-name">star</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("lock")}
              onCopySuccess="lock 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="locklocklocked"
              >
                <Icon type="lock" />
                <span className="zi-grid-item-name">lock</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("unlock")}
              onCopySuccess="unlock 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="unlockunlockunlocked"
              >
                <Icon type="unlock" />
                <span className="zi-grid-item-name">unlock</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("upload")}
              onCopySuccess="upload 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="uploaduploadfilled"
              >
                <Icon type="upload" />
                <span className="zi-grid-item-name">upload</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("download")}
              onCopySuccess="download 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="downloaddownload"
              >
                <Icon type="download" />
                <span className="zi-grid-item-name">download</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("export")}
              onCopySuccess="export 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="exportexportfilled"
              >
                <Icon type="export" />
                <span className="zi-grid-item-name">export</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("share")}
              onCopySuccess="share 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shareshare"
              >
                <Icon type="share" />
                <span className="zi-grid-item-name">share</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("nav-line")}
              onCopySuccess="nav-line 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="nav-linenavline"
              >
                <Icon type="nav-line" />
                <span className="zi-grid-item-name">nav-line</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("nav-grid")}
              onCopySuccess="nav-grid 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="nav-gridnavgrid"
              >
                <Icon type="nav-grid" />
                <span className="zi-grid-item-name">nav-grid</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("back")}
              onCopySuccess="back 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="backback"
              >
                <Icon type="back" />
                <span className="zi-grid-item-name">back</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("link")}
              onCopySuccess="link 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="linklink"
              >
                <Icon type="link" />
                <span className="zi-grid-item-name">link</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("qrcode")}
              onCopySuccess="qrcode 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="qrcodeqrcode"
              >
                <Icon type="qrcode" />
                <span className="zi-grid-item-name">qrcode</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("edit-o")}
              onCopySuccess="edit-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="edit-oeditoutline"
              >
                <Icon type="edit-o" />
                <span className="zi-grid-item-name">edit-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("suggestions")}
              onCopySuccess="suggestions 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="suggestionssuggestionsoutline"
              >
                <Icon type="suggestions" />
                <span className="zi-grid-item-name">suggestions</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("feedback")}
              onCopySuccess="feedback 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="feedbackfeedback"
              >
                <Icon type="feedback" />
                <span className="zi-grid-item-name">feedback</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("smile")}
              onCopySuccess="smile 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="smilesmile"
              >
                <Icon type="smile" />
                <span className="zi-grid-item-name">smile</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("photo")}
              onCopySuccess="photo 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="photophoto"
              >
                <Icon type="photo" />
                <span className="zi-grid-item-name">photo</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("tools-o")}
              onCopySuccess="tools-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="tools-otoolsoutline"
              >
                <Icon type="tools-o" />
                <span className="zi-grid-item-name">tools-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("doc")}
              onCopySuccess="doc 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="docdocfilled"
              >
                <Icon type="doc" />
                <span className="zi-grid-item-name">doc</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("video")}
              onCopySuccess="video 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="videovideofilled"
              >
                <Icon type="video" />
                <span className="zi-grid-item-name">video</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("voice")}
              onCopySuccess="voice 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="voicevoicefilled"
              >
                <Icon type="voice" />
                <span className="zi-grid-item-name">voice</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("filter-o")}
              onCopySuccess="filter-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="filter-ofilteroutline"
              >
                <Icon type="filter-o" />
                <span className="zi-grid-item-name">filter-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("refresh")}
              onCopySuccess="refresh 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="refreshrefreshoutline"
              >
                <Icon type="refresh" />
                <span className="zi-grid-item-name">refresh</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("folder-o")}
              onCopySuccess="folder-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="folder-ofolderoutline"
              >
                <Icon type="folder-o" />
                <span className="zi-grid-item-name">folder-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("open-folder-o")}
              onCopySuccess="open-folder-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="open-folder-oopen-folderoutline"
              >
                <Icon type="open-folder-o" />
                <span className="zi-grid-item-name">open-folder-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("save-o")}
              onCopySuccess="save-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="save-osaveoutline"
              >
                <Icon type="save-o" />
                <span className="zi-grid-item-name">save-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("drag")}
              onCopySuccess="drag 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="dragdrag"
              >
                <Icon type="drag" />
                <span className="zi-grid-item-name">drag</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("thumbnail")}
              onCopySuccess="thumbnail 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="thumbnailthumbnail"
              >
                <Icon type="thumbnail" />
                <span className="zi-grid-item-name">thumbnail</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("eye")}
              onCopySuccess="eye 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="eyeeyefilled"
              >
                <Icon type="eye" />
                <span className="zi-grid-item-name">eye</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("closed-eye")}
              onCopySuccess="closed-eye 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="closed-eyeclosed-eyeoutline"
              >
                <Icon type="closed-eye" />
                <span className="zi-grid-item-name">closed-eye</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-business}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("summary-o")}
              onCopySuccess="summary-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="summary-osummaryoutline"
              >
                <Icon type="summary-o" />
                <span className="zi-grid-item-name">summary-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("summary")}
              onCopySuccess="summary 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="summarysummaryfilled"
              >
                <Icon type="summary" />
                <span className="zi-grid-item-name">summary</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop-o")}
              onCopySuccess="shop-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shop-oshopoutline"
              >
                <Icon type="shop-o" />
                <span className="zi-grid-item-name">shop-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop")}
              onCopySuccess="shop 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shopshopfilled"
              >
                <Icon type="shop" />
                <span className="zi-grid-item-name">shop</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("goods-o")}
              onCopySuccess="goods-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="goods-ogoodsoutline"
              >
                <Icon type="goods-o" />
                <span className="zi-grid-item-name">goods-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("goods")}
              onCopySuccess="goods 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="goodsgoodsfilled"
              >
                <Icon type="goods" />
                <span className="zi-grid-item-name">goods</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("order-o")}
              onCopySuccess="order-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="order-oorderoutline"
              >
                <Icon type="order-o" />
                <span className="zi-grid-item-name">order-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("order")}
              onCopySuccess="order 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="orderorderfilled"
              >
                <Icon type="order" />
                <span className="zi-grid-item-name">order</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer-o")}
              onCopySuccess="customer-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="customer-ocustomeroutline"
              >
                <Icon type="customer-o" />
                <span className="zi-grid-item-name">customer-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer")}
              onCopySuccess="customer 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="customercustomerfilled"
              >
                <Icon type="customer" />
                <span className="zi-grid-item-name">customer</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("chart-o")}
              onCopySuccess="chart-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="chart-odatachartoutline"
              >
                <Icon type="chart-o" />
                <span className="zi-grid-item-name">chart-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("chart")}
              onCopySuccess="chart 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="chartdatachartfilled"
              >
                <Icon type="chart" />
                <span className="zi-grid-item-name">chart</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("capital-o")}
              onCopySuccess="capital-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="capital-ocapitaloutline"
              >
                <Icon type="capital-o" />
                <span className="zi-grid-item-name">capital-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("capital")}
              onCopySuccess="capital 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="capitalcapitalfilled"
              >
                <Icon type="capital" />
                <span className="zi-grid-item-name">capital</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("cashier")}
              onCopySuccess="cashier 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="cashiercashier"
              >
                <Icon type="cashier" />
                <span className="zi-grid-item-name">cashier</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("marketing")}
              onCopySuccess="marketing 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="marketingmarketing"
              >
                <Icon type="marketing" />
                <span className="zi-grid-item-name">marketing</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("settings-o")}
              onCopySuccess="settings-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="settings-osettingsoutline"
              >
                <Icon type="settings-o" />
                <span className="zi-grid-item-name">settings-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("settings")}
              onCopySuccess="settings 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="settingssettingsfilled"
              >
                <Icon type="settings" />
                <span className="zi-grid-item-name">settings</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("countdown")}
              onCopySuccess="countdown 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="countdowncountdown"
              >
                <Icon type="countdown" />
                <span className="zi-grid-item-name">countdown</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop-decorate")}
              onCopySuccess="shop-decorate 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shop-decorateshopdecorate"
              >
                <Icon type="shop-decorate" />
                <span className="zi-grid-item-name">shop-decorate</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("gift")}
              onCopySuccess="gift 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="giftgift"
              >
                <Icon type="gift" />
                <span className="zi-grid-item-name">gift</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("business-o")}
              onCopySuccess="business-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="business-obusinessoutline"
              >
                <Icon type="business-o" />
                <span className="zi-grid-item-name">business-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("business")}
              onCopySuccess="business 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="businessbusinessfilled"
              >
                <Icon type="business" />
                <span className="zi-grid-item-name">business</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("approval-o")}
              onCopySuccess="approval-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="approval-oapprovaloutline"
              >
                <Icon type="approval-o" />
                <span className="zi-grid-item-name">approval-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("approval")}
              onCopySuccess="approval 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="approvalapprovalfilled"
              >
                <Icon type="approval" />
                <span className="zi-grid-item-name">approval</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("ticket-o")}
              onCopySuccess="ticket-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="ticket-oticketoutline"
              >
                <Icon type="ticket-o" />
                <span className="zi-grid-item-name">ticket-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("ticket")}
              onCopySuccess="ticket 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="ticketticketfilled"
              >
                <Icon type="ticket" />
                <span className="zi-grid-item-name">ticket</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-o")}
              onCopySuccess="report-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report-oreportoutline"
              >
                <Icon type="report-o" />
                <span className="zi-grid-item-name">report-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report")}
              onCopySuccess="report 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="reportreportfilled"
              >
                <Icon type="report" />
                <span className="zi-grid-item-name">report</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("expand-customer-o")}
              onCopySuccess="expand-customer-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="expand-customer-oexpandcustomeroutline"
              >
                <Icon type="expand-customer-o" />
                <span className="zi-grid-item-name">expand-customer-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("expand-customer")}
              onCopySuccess="expand-customer 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="expand-customerexpandcustomerfilled"
              >
                <Icon type="expand-customer" />
                <span className="zi-grid-item-name">expand-customer</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("checkin-o")}
              onCopySuccess="checkin-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="checkin-ocheckinoutline"
              >
                <Icon type="checkin-o" />
                <span className="zi-grid-item-name">checkin-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("checkin")}
              onCopySuccess="checkin 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="checkincheckinfilled"
              >
                <Icon type="checkin" />
                <span className="zi-grid-item-name">checkin</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("assess-o")}
              onCopySuccess="assess-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="assess-oassessoutline"
              >
                <Icon type="assess-o" />
                <span className="zi-grid-item-name">assess-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("assess")}
              onCopySuccess="assess 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="assessassessfilled"
              >
                <Icon type="assess" />
                <span className="zi-grid-item-name">assess</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hr-o")}
              onCopySuccess="hr-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hr-ohuman resourceoutline"
              >
                <Icon type="hr-o" />
                <span className="zi-grid-item-name">hr-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hr")}
              onCopySuccess="hr 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hrhuman resourcefilled"
              >
                <Icon type="hr" />
                <span className="zi-grid-item-name">hr</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hc-manage-o")}
              onCopySuccess="hc-manage-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hc-manage-ohc-manageoutline"
              >
                <Icon type="hc-manage-o" />
                <span className="zi-grid-item-name">hc-manage-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hc-manage")}
              onCopySuccess="hc-manage 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hc-managehc-managefilled"
              >
                <Icon type="hc-manage" />
                <span className="zi-grid-item-name">hc-manage</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("visit-o")}
              onCopySuccess="visit-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="visit-ovisitoutline"
              >
                <Icon type="visit-o" />
                <span className="zi-grid-item-name">visit-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("im-o")}
              onCopySuccess="im-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="im-oimoutline"
              >
                <Icon type="im-o" />
                <span className="zi-grid-item-name">im-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("knowledge-o")}
              onCopySuccess="knowledge-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="knowledge-oknowledgeoutline"
              >
                <Icon type="knowledge-o" />
                <span className="zi-grid-item-name">knowledge-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("flow-o")}
              onCopySuccess="flow-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="flow-oresourceflowoutline"
              >
                <Icon type="flow-o" />
                <span className="zi-grid-item-name">flow-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("strategy-o")}
              onCopySuccess="strategy-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="strategy-ostrategyoutline"
              >
                <Icon type="strategy-o" />
                <span className="zi-grid-item-name">strategy-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("contract-o")}
              onCopySuccess="contract-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="contract-ocontractoutline"
              >
                <Icon type="contract-o" />
                <span className="zi-grid-item-name">contract-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("channel-o")}
              onCopySuccess="channel-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="channel-ochanneloutline"
              >
                <Icon type="channel-o" />
                <span className="zi-grid-item-name">channel-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("qa-o")}
              onCopySuccess="qa-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="qa-oqualityassuranceoutline"
              >
                <Icon type="qa-o" />
                <span className="zi-grid-item-name">qa-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("rights-list-o")}
              onCopySuccess="rights-list-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="rights-list-orights-listoutline"
              >
                <Icon type="rights-list-o" />
                <span className="zi-grid-item-name">rights-list-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-forms-o")}
              onCopySuccess="report-forms-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report-forms-oreportformsoutline"
              >
                <Icon type="report-forms-o" />
                <span className="zi-grid-item-name">report-forms-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-forms")}
              onCopySuccess="report-forms 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report-formsreportformsfilled"
              >
                <Icon type="report-forms" />
                <span className="zi-grid-item-name">report-forms</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("coupon-o")}
              onCopySuccess="coupon-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="coupon-ocouponoutline"
              >
                <Icon type="coupon-o" />
                <span className="zi-grid-item-name">coupon-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("coupon")}
              onCopySuccess="coupon 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="couponcouponfilled"
              >
                <Icon type="coupon" />
                <span className="zi-grid-item-name">coupon</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("inventory-o")}
              onCopySuccess="inventory-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="inventory-oinventoryoutline"
              >
                <Icon type="inventory-o" />
                <span className="zi-grid-item-name">inventory-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("inventory")}
              onCopySuccess="inventory 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="inventoryinventoryfilled"
              >
                <Icon type="inventory" />
                <span className="zi-grid-item-name">inventory</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("procurement-o")}
              onCopySuccess="procurement-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="procurement-oprocurementoutline"
              >
                <Icon type="procurement-o" />
                <span className="zi-grid-item-name">procurement-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("procurement")}
              onCopySuccess="procurement 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="procurementprocurementfilled"
              >
                <Icon type="procurement" />
                <span className="zi-grid-item-name">procurement</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("development-doc")}
              onCopySuccess="development-doc 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="development-docdevelopmentdoc"
              >
                <Icon type="development-doc" />
                <span className="zi-grid-item-name">development-doc</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop-analyze-o")}
              onCopySuccess="shop-analyze-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shop-analyze-oshopanalyzeoutline"
              >
                <Icon type="shop-analyze-o" />
                <span className="zi-grid-item-name">shop-analyze-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("cashier-desk-o")}
              onCopySuccess="cashier-desk-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="cashier-desk-ocashierdeskoutline"
              >
                <Icon type="cashier-desk-o" />
                <span className="zi-grid-item-name">cashier-desk-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("withdraw-cash-o")}
              onCopySuccess="withdraw-cash-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="withdraw-cash-owithdrawcashoutline"
              >
                <Icon type="withdraw-cash-o" />
                <span className="zi-grid-item-name">withdraw-cash-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("pending-payment-o")}
              onCopySuccess="pending-payment-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="pending-payment-opaymentpendingoutline"
              >
                <Icon type="pending-payment-o" />
                <span className="zi-grid-item-name">pending-payment-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("salesman-o")}
              onCopySuccess="salesman-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="salesman-osalesmanoutline"
              >
                <Icon type="salesman-o" />
                <span className="zi-grid-item-name">salesman-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("tendency-o")}
              onCopySuccess="tendency-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="tendency-otendencyoutline"
              >
                <Icon type="tendency-o" />
                <span className="zi-grid-item-name">tendency-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("distribution-o")}
              onCopySuccess="distribution-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="distribution-odistributionoutline"
              >
                <Icon type="distribution-o" />
                <span className="zi-grid-item-name">distribution-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("member-o")}
              onCopySuccess="member-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="member-omemberoutline"
              >
                <Icon type="member-o" />
                <span className="zi-grid-item-name">member-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("video-guide-o")}
              onCopySuccess="video-guide-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="video-guide-ovideo-guideoutlineguide"
              >
                <Icon type="video-guide-o" />
                <span className="zi-grid-item-name">video-guide-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("text-guide-o")}
              onCopySuccess="text-guide-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="text-guide-otext-guideoutlineguide"
              >
                <Icon type="text-guide-o" />
                <span className="zi-grid-item-name">text-guide-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("scan-code-o")}
              onCopySuccess="scan-code-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="scan-code-oscan-codeoutline"
              >
                <Icon type="scan-code-o" />
                <span className="zi-grid-item-name">scan-code-o</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-logo}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("youzan-o")}
              onCopySuccess="youzan-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="youzan-oyouzanlogooutline"
              >
                <Icon type="youzan-o" />
                <span className="zi-grid-item-name">youzan-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("youzan")}
              onCopySuccess="youzan 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="youzanyouzanlogofilled"
              >
                <Icon type="youzan" />
                <span className="zi-grid-item-name">youzan</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("mini-apps-o")}
              onCopySuccess="mini-apps-o 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="mini-apps-owechatminiappoutline"
              >
                <Icon type="mini-apps-o" />
                <span className="zi-grid-item-name">mini-apps-o</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("mini-apps")}
              onCopySuccess="mini-apps 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="mini-appswechatminiappfilled"
              >
                <Icon type="mini-apps" />
                <span className="zi-grid-item-name">mini-apps</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("wechat")}
              onCopySuccess="wechat 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="wechatwechatfilled"
              >
                <Icon type="wechat" />
                <span className="zi-grid-item-name">wechat</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
      </div>
    );
  }
}

ReactDOM.render(<IconGrid />, mountNode);
```

<style>
.zi-grid {
	.zenticon {
		font-size: 20px;
	}

	&-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.zi-search-input {
		width: 344px;
	}

	.zi-grid-group {
		margin-top: 48px;

		&-name {
			font-size: 20px;
			line-height: 28px;
			font-weight: 500;
			margin-bottom: 24px;
		}

		&-items {
			display: flex;
			flex-wrap: wrap;
		}
	}

	.zi-grid-item {
		box-sizing: border-box;
		width: 16.667%;
		height: 96px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		&:hover {
			background: #F7F8FA;
		}

		.zenticon {
			font-size: 40px;
			vertical-align: middle;
			color: #333;
		}

		&:not(-n+6) {
			margin-top: 16px;
		}

		.zi-grid-item-name {
			margin-top: 8px;
		}
	}
}
</style>
