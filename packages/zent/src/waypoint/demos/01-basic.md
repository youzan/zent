---
order: 1
zh-CN:
	title: 基础用法
	auto: 猜测 topOffset 和 bottomOffset
	enter: Waypoint 进入屏幕
	leave: Waypoint 离开屏幕
en-US:
	title: Basic Usage
	auto: Guess topOffset and bottomOffset
	enter: Waypoint enter
	leave: Waypoint leave
---

```js
import { Waypoint, Icon, Checkbox } from 'zent';

function Demo(props) {
	const [msg, setMsg] = React.useState(null);
	const [autoBorderWidth, setAutoBorderWidth] = React.useState(true);
	const setEnterMsg = React.useCallback(() => setMsg('{i18n.enter}'), []);
	const setLeaveMsg = React.useCallback(() => setMsg('{i18n.leave}'), []);
	const setAuto = React.useCallback(e => setAutoBorderWidth(e.target.checked), []);
  const autoProps = React.useMemo(() => {
    return autoBorderWidth ? {
			topOffset: 'auto',
			bottomOffset: 'auto'
		} : {};
	}, [autoBorderWidth]);

	return (
		<div className="waypoint-demo-basic">
			<div style={{marginBottom: 16}}>
				<Checkbox checked={autoBorderWidth} onChange={setAuto}>
					{i18n.auto}
				</Checkbox>
			</div>
			{msg ? <div className="waypoint-demo-basic__message">{msg}</div> : null}
			<div className="waypoint-demo-basic__scrollable-parent">
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Waypoint onEnter={setEnterMsg} onLeave={setLeaveMsg} {...autoProps}/>
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
			</div>
		</div>
	);
}

function Spacer() {
	return (
		<div className="waypoint-demo-basic__spacer">
			<Icon type="down" />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
.waypoint-demo-basic .zent-waypoint-marker {
	display: block;
	height: 4px;
	background: #d40000;
}

.waypoint-demo-basic__scrollable-parent {
  max-height: 400px;
  overflow: scroll;
  position: relative;
	border: 20px solid rgba(21, 91, 212, 0.2);
}

.waypoint-demo-basic__spacer {
  color: #969799;
  font-size: 40px;
  line-height: 200px;
  text-align: center;
}

.waypoint-demo-basic__message {
	box-sizing: border-box;
  background-color: #f2f3f5;
  color: #323233;
  opacity: 0.8;
  padding: 10px 0;
  pointer-events: none;
  text-align: center;
  width: 100%;
}
</style>
