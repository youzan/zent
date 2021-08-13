---
order: 4
zh-CN:
	title: 所有图标
  prompt: '注意：展示的图标名称不是 type'
	x-cat-base: 基础类
	x-cat-business: 业务类
	x-cat-logo: 标示类
  x-cat-operation: 操作类
  x-cat-status: 状态类
	searchPlaceholder: 搜索图标
	jsx: 复制 JSX
	name: 复制 type
en-US:
	title: All Icons
  prompt: 'Attention: The icon name displayed is not the type'
	x-cat-base: Base
	x-cat-business: Business
	x-cat-logo: Logo
  x-cat-status: Status
  x-cat-operation: Operation
	searchPlaceholder: Search icon
	jsx: Copy JSX
	name: Copy type
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
          <div className="zi-search-input-wrapper">
            <Input
              className="zi-search-input"
              icon="search"
              placeholder="{i18n.searchPlaceholder}"
              value={search}
              onChange={this.onChange}
            />
            {i18n.prompt}
          </div>

          <RadioGroup onChange={this.onCopyOptionChange} value={this.state.copyType}>
            <Radio value="jsx">{i18n.jsx}</Radio>
            <Radio value="name">{i18n.name}</Radio>
          </RadioGroup>
        </div>

        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-operation}</div>
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
              text={this.getIconString("left-circle-o")}
              onCopySuccess="left_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="left_circleleftcircleoutline"
              >
                <Icon type="left-circle-o" />
                <span className="zi-grid-item-name">left_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("left-circle")}
              onCopySuccess="left_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="left_circle_fillleftcirclefilled"
              >
                <Icon type="left-circle" />
                <span className="zi-grid-item-name">left_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("right-circle-o")}
              onCopySuccess="right_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="right_circlerightcircleoutline"
              >
                <Icon type="right-circle-o" />
                <span className="zi-grid-item-name">right_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("right-circle")}
              onCopySuccess="right_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="right_circle_fillrightcirclefilled"
              >
                <Icon type="right-circle" />
                <span className="zi-grid-item-name">right_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("up-circle-o")}
              onCopySuccess="up_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="up_circleupcircleoutline"
              >
                <Icon type="up-circle-o" />
                <span className="zi-grid-item-name">up_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("up-circle")}
              onCopySuccess="up_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="up_circle_fillupcirclefilled"
              >
                <Icon type="up-circle" />
                <span className="zi-grid-item-name">up_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("down-circle-o")}
              onCopySuccess="down_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="down_circledowncircleoutline"
              >
                <Icon type="down-circle-o" />
                <span className="zi-grid-item-name">down_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("down-circle")}
              onCopySuccess="down_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="down_circle_filldowncirclefilled"
              >
                <Icon type="down-circle" />
                <span className="zi-grid-item-name">down_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("upload")}
              onCopySuccess="upload 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="uploadupload"
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
              text={this.getIconString("edit-o")}
              onCopySuccess="edit 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="editeditoutline"
              >
                <Icon type="edit-o" />
                <span className="zi-grid-item-name">edit</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("edit")}
              onCopySuccess="edit_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="edit_filleditfilled"
              >
                <Icon type="edit" />
                <span className="zi-grid-item-name">edit_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("remove-o")}
              onCopySuccess="remove 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="removedeleteremoveoutline"
              >
                <Icon type="remove-o" />
                <span className="zi-grid-item-name">remove</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("remove")}
              onCopySuccess="remove_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="remove_filldeleteremovefilled"
              >
                <Icon type="remove" />
                <span className="zi-grid-item-name">remove_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("save-o")}
              onCopySuccess="save 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="savesaveoutline"
              >
                <Icon type="save-o" />
                <span className="zi-grid-item-name">save</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("save")}
              onCopySuccess="save_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="save_fillsavefilled"
              >
                <Icon type="save" />
                <span className="zi-grid-item-name">save_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("arrow-up")}
              onCopySuccess="arrow_up 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="arrow_uparrowup"
              >
                <Icon type="arrow-up" />
                <span className="zi-grid-item-name">arrow_up</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("arrow-down")}
              onCopySuccess="arrow_down 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="arrow_downarrowdown"
              >
                <Icon type="arrow-down" />
                <span className="zi-grid-item-name">arrow_down</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("locked-o")}
              onCopySuccess="locked 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="lockedlockedoutline"
              >
                <Icon type="locked-o" />
                <span className="zi-grid-item-name">locked</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("locked")}
              onCopySuccess="locked_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="locked_filllockedfilled"
              >
                <Icon type="locked" />
                <span className="zi-grid-item-name">locked_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("unlocked-o")}
              onCopySuccess="unlocked 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="unlockedunlockedoutline"
              >
                <Icon type="unlocked-o" />
                <span className="zi-grid-item-name">unlocked</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("unlocked")}
              onCopySuccess="unlocked_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="unlocked_fillunlockedfilled"
              >
                <Icon type="unlocked" />
                <span className="zi-grid-item-name">unlocked_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("nav-line")}
              onCopySuccess="nav_line 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="nav_linenavline"
              >
                <Icon type="nav-line" />
                <span className="zi-grid-item-name">nav_line</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("nav-grid")}
              onCopySuccess="nav_grid 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="nav_gridnavgrid"
              >
                <Icon type="nav-grid" />
                <span className="zi-grid-item-name">nav_grid</span>
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
              text={this.getIconString("help-circle-o")}
              onCopySuccess="help 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="helphelpcircleoutline"
              >
                <Icon type="help-circle-o" />
                <span className="zi-grid-item-name">help</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("help-circle")}
              onCopySuccess="help_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="help_fillhelpcirclefilled"
              >
                <Icon type="help-circle" />
                <span className="zi-grid-item-name">help_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("thumbnail")}
              onCopySuccess="fullscreen 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="fullscreenfullscreenthumbnail"
              >
                <Icon type="thumbnail" />
                <span className="zi-grid-item-name">fullscreen</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("fullscreen-exit")}
              onCopySuccess="fullscreen_exit 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="fullscreen_exitfullscreenexit"
              >
                <Icon type="fullscreen-exit" />
                <span className="zi-grid-item-name">fullscreen_exit</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("table-loose")}
              onCopySuccess="table_loose 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="table_loosetableloose"
              >
                <Icon type="table-loose" />
                <span className="zi-grid-item-name">table_loose</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("table-compact")}
              onCopySuccess="table_compact 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="table_compacttablecompact"
              >
                <Icon type="table-compact" />
                <span className="zi-grid-item-name">table_compact</span>
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
              text={this.getIconString("pin-o")}
              onCopySuccess="pin 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="pinpinoutline"
              >
                <Icon type="pin-o" />
                <span className="zi-grid-item-name">pin</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("pin")}
              onCopySuccess="pin_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="pin_fillpinfilled"
              >
                <Icon type="pin" />
                <span className="zi-grid-item-name">pin_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("eye-o")}
              onCopySuccess="show 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="showeyeoutlineshow"
              >
                <Icon type="eye-o" />
                <span className="zi-grid-item-name">show</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("eye")}
              onCopySuccess="show_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="show_filleyefilledshow"
              >
                <Icon type="eye" />
                <span className="zi-grid-item-name">show_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("closed-eye")}
              onCopySuccess="hide 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hideclosed-eyeoutlinehide"
              >
                <Icon type="closed-eye" />
                <span className="zi-grid-item-name">hide</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("subtract-circle-o")}
              onCopySuccess="subtract_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="subtract_circleminussubtract circleoutline"
              >
                <Icon type="subtract-circle-o" />
                <span className="zi-grid-item-name">subtract_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("subtract-circle")}
              onCopySuccess="subtract_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="subtract_circle_fillminussubtractcirclefilled"
              >
                <Icon type="subtract-circle" />
                <span className="zi-grid-item-name">subtract_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("plus-circle-o")}
              onCopySuccess="plus_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="plus_circleaddpluscircleoutline"
              >
                <Icon type="plus-circle-o" />
                <span className="zi-grid-item-name">plus_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("plus-circle")}
              onCopySuccess="plus_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="plus_circle_filladdpluscirclefilled"
              >
                <Icon type="plus-circle" />
                <span className="zi-grid-item-name">plus_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("double-last")}
              onCopySuccess="double_last 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="double_lastdoublelast"
              >
                <Icon type="double-last" />
                <span className="zi-grid-item-name">double_last</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("double-next")}
              onCopySuccess="double_next 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="double_nextdoublenext"
              >
                <Icon type="double-next" />
                <span className="zi-grid-item-name">double_next</span>
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
              text={this.getIconString("caret-up")}
              onCopySuccess="ascending 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="ascendingcaretupascending"
              >
                <Icon type="caret-up" />
                <span className="zi-grid-item-name">ascending</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("caret-down")}
              onCopySuccess="descending 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="descendingcaretdowndescending"
              >
                <Icon type="caret-down" />
                <span className="zi-grid-item-name">descending</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("reset")}
              onCopySuccess="reset_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="reset_fillresetfilled"
              >
                <Icon type="reset" />
                <span className="zi-grid-item-name">reset_fill</span>
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
              text={this.getIconString("filter-o")}
              onCopySuccess="filter 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="filterfilteroutline"
              >
                <Icon type="filter-o" />
                <span className="zi-grid-item-name">filter</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-business}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("summary-o")}
              onCopySuccess="summary 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="summarysummaryoutline"
              >
                <Icon type="summary-o" />
                <span className="zi-grid-item-name">summary</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("summary")}
              onCopySuccess="summary_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="summary_fillsummaryfilled"
              >
                <Icon type="summary" />
                <span className="zi-grid-item-name">summary_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop-o")}
              onCopySuccess="shop 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shopshopoutline"
              >
                <Icon type="shop-o" />
                <span className="zi-grid-item-name">shop</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("shop")}
              onCopySuccess="shop_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shop_fillshopfilled"
              >
                <Icon type="shop" />
                <span className="zi-grid-item-name">shop_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("goods-o")}
              onCopySuccess="goods 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="goodsgoodsoutline"
              >
                <Icon type="goods-o" />
                <span className="zi-grid-item-name">goods</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("goods")}
              onCopySuccess="goods_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="goods_fillgoodsfilled"
              >
                <Icon type="goods" />
                <span className="zi-grid-item-name">goods_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("order-o")}
              onCopySuccess="order 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="orderorderoutline"
              >
                <Icon type="order-o" />
                <span className="zi-grid-item-name">order</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("order")}
              onCopySuccess="order_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="order_fillorderfilled"
              >
                <Icon type="order" />
                <span className="zi-grid-item-name">order_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer-o")}
              onCopySuccess="customer 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="customercustomeroutline"
              >
                <Icon type="customer-o" />
                <span className="zi-grid-item-name">customer</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer")}
              onCopySuccess="customer_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="customer_fillcustomerfilled"
              >
                <Icon type="customer" />
                <span className="zi-grid-item-name">customer_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("chart-o")}
              onCopySuccess="chart 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="chartdatachartoutline"
              >
                <Icon type="chart-o" />
                <span className="zi-grid-item-name">chart</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("chart")}
              onCopySuccess="chart_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="chart_filldatachartfilled"
              >
                <Icon type="chart" />
                <span className="zi-grid-item-name">chart_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("capital-o")}
              onCopySuccess="capital 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="capitalcapitaloutline"
              >
                <Icon type="capital-o" />
                <span className="zi-grid-item-name">capital</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("capital")}
              onCopySuccess="capital_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="capital_fillcapitalfilled"
              >
                <Icon type="capital" />
                <span className="zi-grid-item-name">capital_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("settings-o")}
              onCopySuccess="settings 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="settingssettingsoutline"
              >
                <Icon type="settings-o" />
                <span className="zi-grid-item-name">settings</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("settings")}
              onCopySuccess="settings_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="settings_fillsettingsfilled"
              >
                <Icon type="settings" />
                <span className="zi-grid-item-name">settings_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("marketing-o")}
              onCopySuccess="marketing 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="marketingmarketingoutline"
              >
                <Icon type="marketing-o" />
                <span className="zi-grid-item-name">marketing</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("marketing")}
              onCopySuccess="marketing_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="marketing_fillmarketingfilled"
              >
                <Icon type="marketing" />
                <span className="zi-grid-item-name">marketing_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("inventory-o")}
              onCopySuccess="inventory 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="inventoryinventoryoutline"
              >
                <Icon type="inventory-o" />
                <span className="zi-grid-item-name">inventory</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("inventory")}
              onCopySuccess="inventory_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="inventory_fillinventoryfilled"
              >
                <Icon type="inventory" />
                <span className="zi-grid-item-name">inventory_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("procurement-o")}
              onCopySuccess="procurement 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="procurementprocurementoutline"
              >
                <Icon type="procurement-o" />
                <span className="zi-grid-item-name">procurement</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("procurement")}
              onCopySuccess="procurement_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="procurement_fillprocurementfilled"
              >
                <Icon type="procurement" />
                <span className="zi-grid-item-name">procurement_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("finance-o")}
              onCopySuccess="finance 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="financefinanceoutline"
              >
                <Icon type="finance-o" />
                <span className="zi-grid-item-name">finance</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("finance")}
              onCopySuccess="finance_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="finance_fillfinancefilled"
              >
                <Icon type="finance" />
                <span className="zi-grid-item-name">finance_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("cashier-o")}
              onCopySuccess="cashier 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="cashiercashieroutline"
              >
                <Icon type="cashier-o" />
                <span className="zi-grid-item-name">cashier</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("cashier")}
              onCopySuccess="cashier_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="cashier_fillcashierfilled"
              >
                <Icon type="cashier" />
                <span className="zi-grid-item-name">cashier_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("course-o")}
              onCopySuccess="course 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="coursecourseoutline"
              >
                <Icon type="course-o" />
                <span className="zi-grid-item-name">course</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("course")}
              onCopySuccess="course_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="course_fillcoursefilled"
              >
                <Icon type="course" />
                <span className="zi-grid-item-name">course_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("admissions-o")}
              onCopySuccess="admissions 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="admissionsadmissionsoutline"
              >
                <Icon type="admissions-o" />
                <span className="zi-grid-item-name">admissions</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("admissions")}
              onCopySuccess="admissions_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="admissions_filladmissionsfilled"
              >
                <Icon type="admissions" />
                <span className="zi-grid-item-name">admissions_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("educational-o")}
              onCopySuccess="educational 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="educationaleducationaloutline"
              >
                <Icon type="educational-o" />
                <span className="zi-grid-item-name">educational</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("educational")}
              onCopySuccess="educational_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="educational_filleducationalfilled"
              >
                <Icon type="educational" />
                <span className="zi-grid-item-name">educational_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer-service-o")}
              onCopySuccess="service 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="servicecustomer-serviceoutline"
              >
                <Icon type="customer-service-o" />
                <span className="zi-grid-item-name">service</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("customer-service")}
              onCopySuccess="service_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="service_fillcustomer-servicefilled"
              >
                <Icon type="customer-service" />
                <span className="zi-grid-item-name">service_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("message-o")}
              onCopySuccess="message 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="messagemessageoutline"
              >
                <Icon type="message-o" />
                <span className="zi-grid-item-name">message</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("message")}
              onCopySuccess="message_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="message_fillmessagefilled"
              >
                <Icon type="message" />
                <span className="zi-grid-item-name">message_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("jump-out")}
              onCopySuccess="jump_out 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="jump_outjump-out"
              >
                <Icon type="jump-out" />
                <span className="zi-grid-item-name">jump_out</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("sign-out")}
              onCopySuccess="sign_out 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="sign_outsign-out"
              >
                <Icon type="sign-out" />
                <span className="zi-grid-item-name">sign_out</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hotel-o")}
              onCopySuccess="hotel 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hotelhoteloutline"
              >
                <Icon type="hotel-o" />
                <span className="zi-grid-item-name">hotel</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hotel")}
              onCopySuccess="hotel_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hotel_fillhotelfilled"
              >
                <Icon type="hotel" />
                <span className="zi-grid-item-name">hotel_fill</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-status}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("check-circle-o")}
              onCopySuccess="success_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="success_circlecheckcircleoutlinesuccess"
              >
                <Icon type="check-circle-o" />
                <span className="zi-grid-item-name">success_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("check-circle")}
              onCopySuccess="success_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="success_circle_fillcheckcirclefilledsuccess"
              >
                <Icon type="check-circle" />
                <span className="zi-grid-item-name">success_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("close-circle-o")}
              onCopySuccess="error_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="error_circleerrorcircleoutline"
              >
                <Icon type="close-circle-o" />
                <span className="zi-grid-item-name">error_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("close-circle")}
              onCopySuccess="error_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="error_circle_fillerrorcirclefilled"
              >
                <Icon type="close-circle" />
                <span className="zi-grid-item-name">error_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("error-circle-o")}
              onCopySuccess="warning_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="warning_circlewarningcircleoutline"
              >
                <Icon type="error-circle-o" />
                <span className="zi-grid-item-name">warning_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("error-circle")}
              onCopySuccess="warning_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="warning_circle_fillwarningcirclefilled"
              >
                <Icon type="error-circle" />
                <span className="zi-grid-item-name">warning_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("info-circle-o")}
              onCopySuccess="info_circle 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="info_circleinfocircleoutline"
              >
                <Icon type="info-circle-o" />
                <span className="zi-grid-item-name">info_circle</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("info-circle")}
              onCopySuccess="info_circle_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="info_circle_fillinfocirclefilled"
              >
                <Icon type="info-circle" />
                <span className="zi-grid-item-name">info_circle_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("loading")}
              onCopySuccess="loading 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="loadingloading"
              >
                <Icon type="loading" />
                <span className="zi-grid-item-name">loading</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("wait")}
              onCopySuccess="wait_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="wait_fillwaitfilled"
              >
                <Icon type="wait" />
                <span className="zi-grid-item-name">wait_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("star-o")}
              onCopySuccess="star 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="starstaroutline"
              >
                <Icon type="star-o" />
                <span className="zi-grid-item-name">star</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("star")}
              onCopySuccess="star_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="star_fillstarfilled"
              >
                <Icon type="star" />
                <span className="zi-grid-item-name">star_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bell-o")}
              onCopySuccess="bell 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bellbelloutline"
              >
                <Icon type="bell-o" />
                <span className="zi-grid-item-name">bell</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bell")}
              onCopySuccess="bell_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bell_fillbellfilled"
              >
                <Icon type="bell" />
                <span className="zi-grid-item-name">bell_fill</span>
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
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-logo}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("youzan-o")}
              onCopySuccess="youzan 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="youzanyouzanlogooutline"
              >
                <Icon type="youzan-o" />
                <span className="zi-grid-item-name">youzan</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("youzan")}
              onCopySuccess="youzan_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="youzan_fillyouzanlogofilled"
              >
                <Icon type="youzan" />
                <span className="zi-grid-item-name">youzan_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("mini-apps-o")}
              onCopySuccess="mini_apps 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="mini_appswechatminiappoutline"
              >
                <Icon type="mini-apps-o" />
                <span className="zi-grid-item-name">mini_apps</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("mini-apps")}
              onCopySuccess="mini_apps_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="mini_apps_fillwechatminiappfilled"
              >
                <Icon type="mini-apps" />
                <span className="zi-grid-item-name">mini_apps_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("wechat-o")}
              onCopySuccess="wechat 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="wechatwechatoutline"
              >
                <Icon type="wechat-o" />
                <span className="zi-grid-item-name">wechat</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("wechat")}
              onCopySuccess="wechat_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="wechat_fillwechatfilled"
              >
                <Icon type="wechat" />
                <span className="zi-grid-item-name">wechat_fill</span>
              </div>
            </CopyButton>
          </div>
        </div>
      
        <div className="zi-grid-group">
          <div className="zi-grid-group-name">{i18n.x-cat-base}</div>
          <div className="zi-grid-group-items">
            
            <CopyButton
              text={this.getIconString("clock-o")}
              onCopySuccess="clock 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="clockclockoutline"
              >
                <Icon type="clock-o" />
                <span className="zi-grid-item-name">clock</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("clock")}
              onCopySuccess="clock_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="clock_fillclockfilled"
              >
                <Icon type="clock" />
                <span className="zi-grid-item-name">clock_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("calendar-o")}
              onCopySuccess="calendar 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="calendarcalendaroutline"
              >
                <Icon type="calendar-o" />
                <span className="zi-grid-item-name">calendar</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("calendar")}
              onCopySuccess="calendar_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="calendar_fillcalendarfilled"
              >
                <Icon type="calendar" />
                <span className="zi-grid-item-name">calendar_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("present-o")}
              onCopySuccess="present 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="presentpresentoutline"
              >
                <Icon type="present-o" />
                <span className="zi-grid-item-name">present</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("present")}
              onCopySuccess="present_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="present_fillpresentfilled"
              >
                <Icon type="present" />
                <span className="zi-grid-item-name">present_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("ticket-o")}
              onCopySuccess="ticket 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="ticketticketoutline"
              >
                <Icon type="ticket-o" />
                <span className="zi-grid-item-name">ticket</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("ticket")}
              onCopySuccess="ticket_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="ticket_fillticketfilled"
              >
                <Icon type="ticket" />
                <span className="zi-grid-item-name">ticket_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("expand-customer-o")}
              onCopySuccess="expand_customer 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="expand_customerexpandcustomeroutline"
              >
                <Icon type="expand-customer-o" />
                <span className="zi-grid-item-name">expand_customer</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("expand-customer")}
              onCopySuccess="expand_customer_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="expand_customer_fillexpandcustomerfilled"
              >
                <Icon type="expand-customer" />
                <span className="zi-grid-item-name">expand_customer_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("checkin-o")}
              onCopySuccess="checkin 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="checkincheckinoutline"
              >
                <Icon type="checkin-o" />
                <span className="zi-grid-item-name">checkin</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("checkin")}
              onCopySuccess="checkin_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="checkin_fillcheckinfilled"
              >
                <Icon type="checkin" />
                <span className="zi-grid-item-name">checkin_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("assess-o")}
              onCopySuccess="assess 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="assessassessoutline"
              >
                <Icon type="assess-o" />
                <span className="zi-grid-item-name">assess</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("assess")}
              onCopySuccess="assess_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="assess_fillassessfilled"
              >
                <Icon type="assess" />
                <span className="zi-grid-item-name">assess_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("business-o")}
              onCopySuccess="business 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="businessbusinessoutline"
              >
                <Icon type="business-o" />
                <span className="zi-grid-item-name">business</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("business")}
              onCopySuccess="business_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="business_fillbusinessfilled"
              >
                <Icon type="business" />
                <span className="zi-grid-item-name">business_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hr-o")}
              onCopySuccess="hr 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hrhuman resourceoutline"
              >
                <Icon type="hr-o" />
                <span className="zi-grid-item-name">hr</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hr")}
              onCopySuccess="hr_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hr_fillhuman resourcefilled"
              >
                <Icon type="hr" />
                <span className="zi-grid-item-name">hr_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("approval-o")}
              onCopySuccess="approval 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="approvalapprovaloutline"
              >
                <Icon type="approval-o" />
                <span className="zi-grid-item-name">approval</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("approval")}
              onCopySuccess="approval_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="approval_fillapprovalfilled"
              >
                <Icon type="approval" />
                <span className="zi-grid-item-name">approval_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-o")}
              onCopySuccess="report 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="reportreportoutline"
              >
                <Icon type="report-o" />
                <span className="zi-grid-item-name">report</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report")}
              onCopySuccess="report_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report_fillreportfilled"
              >
                <Icon type="report" />
                <span className="zi-grid-item-name">report_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("coupon-o")}
              onCopySuccess="coupon 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="couponcouponoutline"
              >
                <Icon type="coupon-o" />
                <span className="zi-grid-item-name">coupon</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("coupon")}
              onCopySuccess="coupon_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="coupon_fillcouponfilled"
              >
                <Icon type="coupon" />
                <span className="zi-grid-item-name">coupon_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hc-manage-o")}
              onCopySuccess="hc_manage 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hc_managehc-manageoutline"
              >
                <Icon type="hc-manage-o" />
                <span className="zi-grid-item-name">hc_manage</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hc-manage")}
              onCopySuccess="hc_manage_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hc_manage_fillhc-managefilled"
              >
                <Icon type="hc-manage" />
                <span className="zi-grid-item-name">hc_manage_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-forms-o")}
              onCopySuccess="report_forms 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report_formsreportformsoutline"
              >
                <Icon type="report-forms-o" />
                <span className="zi-grid-item-name">report_forms</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("report-forms")}
              onCopySuccess="report_forms_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="report_forms_fillreportformsfilled"
              >
                <Icon type="report-forms" />
                <span className="zi-grid-item-name">report_forms_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("brush-o")}
              onCopySuccess="brush 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="brushbrushoutline"
              >
                <Icon type="brush-o" />
                <span className="zi-grid-item-name">brush</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("brush")}
              onCopySuccess="brush_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="brush_fillbrushfilled"
              >
                <Icon type="brush" />
                <span className="zi-grid-item-name">brush_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("development-doc-o")}
              onCopySuccess="development_doc 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="development_docdevelopmentdocoutline"
              >
                <Icon type="development-doc-o" />
                <span className="zi-grid-item-name">development_doc</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("development-doc")}
              onCopySuccess="development_doc_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="development_doc_filldevelopmentdocfilled"
              >
                <Icon type="development-doc" />
                <span className="zi-grid-item-name">development_doc_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bookmark-o")}
              onCopySuccess="bookmark 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bookmarkbookmarkoutline"
              >
                <Icon type="bookmark-o" />
                <span className="zi-grid-item-name">bookmark</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("bookmark")}
              onCopySuccess="bookmark_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="bookmark_fillbookmarkfilled"
              >
                <Icon type="bookmark" />
                <span className="zi-grid-item-name">bookmark_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("folder-o")}
              onCopySuccess="folder 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="folderfolderoutline"
              >
                <Icon type="folder-o" />
                <span className="zi-grid-item-name">folder</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("open-folder-o")}
              onCopySuccess="open_folder 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="open_folderopen-folderoutline"
              >
                <Icon type="open-folder-o" />
                <span className="zi-grid-item-name">open_folder</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("pending-payment-o")}
              onCopySuccess="pending_payment 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="pending_paymentpaymentpendingoutline"
              >
                <Icon type="pending-payment-o" />
                <span className="zi-grid-item-name">pending_payment</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("salesman-o")}
              onCopySuccess="salesman 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="salesmansalesmanoutline"
              >
                <Icon type="salesman-o" />
                <span className="zi-grid-item-name">salesman</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("tendency-o")}
              onCopySuccess="tendency 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="tendencytendencyoutline"
              >
                <Icon type="tendency-o" />
                <span className="zi-grid-item-name">tendency</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("distribution-o")}
              onCopySuccess="distribution 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="distributiondistributionoutline"
              >
                <Icon type="distribution-o" />
                <span className="zi-grid-item-name">distribution</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("member-o")}
              onCopySuccess="member 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="membermemberoutline"
              >
                <Icon type="member-o" />
                <span className="zi-grid-item-name">member</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("text-guide-o")}
              onCopySuccess="text_guide 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="text_guidetext-guideoutlineguide"
              >
                <Icon type="text-guide-o" />
                <span className="zi-grid-item-name">text_guide</span>
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
              text={this.getIconString("shop-analyze-o")}
              onCopySuccess="shop_analyze 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="shop_analyzeshopanalyzeoutline"
              >
                <Icon type="shop-analyze-o" />
                <span className="zi-grid-item-name">shop_analyze</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("channel-o")}
              onCopySuccess="channel 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="channelchanneloutline"
              >
                <Icon type="channel-o" />
                <span className="zi-grid-item-name">channel</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("cashier-desk-o")}
              onCopySuccess="cashier_desk 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="cashier_deskcashierdeskoutline"
              >
                <Icon type="cashier-desk-o" />
                <span className="zi-grid-item-name">cashier_desk</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("qa-o")}
              onCopySuccess="qa 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="qaqualityassuranceoutline"
              >
                <Icon type="qa-o" />
                <span className="zi-grid-item-name">qa</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("withdraw-cash-o")}
              onCopySuccess="withdraw_cash 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="withdraw_cashwithdrawcashoutline"
              >
                <Icon type="withdraw-cash-o" />
                <span className="zi-grid-item-name">withdraw_cash</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("tools-o")}
              onCopySuccess="tools 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="toolstoolsoutline"
              >
                <Icon type="tools-o" />
                <span className="zi-grid-item-name">tools</span>
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
              text={this.getIconString("video-o")}
              onCopySuccess="video 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="videovideooutline"
              >
                <Icon type="video-o" />
                <span className="zi-grid-item-name">video</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("video")}
              onCopySuccess="video_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="video_fillvideofilled"
              >
                <Icon type="video" />
                <span className="zi-grid-item-name">video_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("hotline-o")}
              onCopySuccess="hotline 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="hotlinehotlineoutline"
              >
                <Icon type="hotline-o" />
                <span className="zi-grid-item-name">hotline</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("visit-o")}
              onCopySuccess="visit 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="visitvisitoutline"
              >
                <Icon type="visit-o" />
                <span className="zi-grid-item-name">visit</span>
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
              text={this.getIconString("contract-o")}
              onCopySuccess="contract 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="contractcontractoutline"
              >
                <Icon type="contract-o" />
                <span className="zi-grid-item-name">contract</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("rights-list-o")}
              onCopySuccess="rights_list 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="rights_listrights-listoutline"
              >
                <Icon type="rights-list-o" />
                <span className="zi-grid-item-name">rights_list</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("im-o")}
              onCopySuccess="im 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="imimoutline"
              >
                <Icon type="im-o" />
                <span className="zi-grid-item-name">im</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("flow-o")}
              onCopySuccess="resource 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="resourceresourceflowoutline"
              >
                <Icon type="flow-o" />
                <span className="zi-grid-item-name">resource</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("strategy-o")}
              onCopySuccess="strategy 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="strategystrategyoutline"
              >
                <Icon type="strategy-o" />
                <span className="zi-grid-item-name">strategy</span>
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
              text={this.getIconString("voice")}
              onCopySuccess="voice_fill 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="voice_fillvoicefilled"
              >
                <Icon type="voice" />
                <span className="zi-grid-item-name">voice_fill</span>
              </div>
            </CopyButton>
            <CopyButton
              text={this.getIconString("scan-code-o")}
              onCopySuccess="scan_code 已复制到剪贴板"
            >
              <div
                className="zi-grid-item"
                data-index="scan_codescan-codeoutline"
              >
                <Icon type="scan-code-o" />
                <span className="zi-grid-item-name">scan_code</span>
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
		align-items: flex-start;
		justify-content: space-between;
	}

  .zi-search-input-wrapper {
    color: #999;
  }

	.zi-search-input {
		width: 344px;
    margin-bottom: 8px;
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
