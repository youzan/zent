---
order: 3
zh-CN:
	title: 多级嵌套
	guangdong: 广东
	jiangsu: 江苏
	suzhou: 苏州
	wuxi: 无锡
	changzhou: 常州
	zhenjiang: 镇江
	nanjing: 南京
	jiangningqu: 江宁区
	xianlinqu: 仙林区
	shandong: 山东
	zhejiang: 浙江
	hangzhou: 杭州
	xihuqu: 西湖区
	shangchengqu: 上城区
	wenzhou: 温州
	shaoxing: 绍兴
	jiaxing: 嘉兴
en-US:
	title: Nested
	guangdong: Guangdong
	jiangsu: Jiangsu
	suzhou: Suzhou
	wuxi: Wuxi
	changzhou: Changzhou
	zhenjiang: Zhenjiang
	nanjing: Nanjing
	jiangningqu: Jiangning
	xianlinqu: Xianling
	shandong: Shandong
	zhejiang: Zhejiang
	hangzhou: Hangzhou
	xihuqu: Xihu
	shangchengqu: Shangcheng
	wenzhou: Wenzhou
	shaoxing: Shaoxing
	jiaxing: Jiaxing
---

```jsx
import { Menu } from 'zent';

const { MenuItem, SubMenu } = Menu;
const clickHandler = function(event, key) {
	console.log(event, key);
};

ReactDOM.render(
	<div className="zent-menu-simple-wrapper">
		<Menu className="simple" onClick={clickHandler}>
			<MenuItem>{i18n.guangdong}</MenuItem>
			<SubMenu title="{i18n.jiangsu}">
				<MenuItem>{i18n.suzhou}</MenuItem>
				<MenuItem>{i18n.wuxi}</MenuItem>
				<MenuItem>{i18n.changzhou}</MenuItem>
				<MenuItem>{i18n.zhenjiang}</MenuItem>
				<SubMenu title="{i18n.nanjing}">
					<MenuItem>{i18n.jiangningqu}</MenuItem>
					<MenuItem>{i18n.xianlinqu}</MenuItem>
				</SubMenu>
			</SubMenu>
			<MenuItem>{i18n.shandong}</MenuItem>
			<SubMenu title="{i18n.zhejiang}">
				<SubMenu title="{i18n.hangzhou}">
					<MenuItem>{i18n.xihuqu}</MenuItem>
					<MenuItem>{i18n.shangchengqu}</MenuItem>
				</SubMenu>
				<MenuItem>{i18n.wenzhou}</MenuItem>
				<MenuItem>{i18n.shaoxing}</MenuItem>
				<MenuItem>{i18n.jiaxing}</MenuItem>
			</SubMenu>
		</Menu>
	</div>
    , mountNode
);
```
