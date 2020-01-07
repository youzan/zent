---
order: 1
zh-CN:
	title: 基础用法
	enter: Waypoint 进入屏幕
	leave: Waypoint 离开屏幕
en-US:
	title: Basic Usage
	enter: Waypoint enter
	leave: Waypoint leave
---

```js
import { Waypoint, Icon } from 'zent';

function Demo(props) {
	const [msg, setMsg] = React.useState(null);
	const setEnterMsg = React.useCallback(() => setMsg('{i18n.enter}'), []);
	const setLeaveMsg = React.useCallback(() => setMsg('{i18n.leave}'), []);

	return (
		<div className="waypoint-demo-basic">
			{msg ? <div className="waypoint-demo-basic__message">{msg}</div> : null}
			<div className="waypoint-demo-basic__scrollable-parent">
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<Spacer />
				<div className="waypoint-demo-basic__waypoint-line" />
				<Waypoint onEnter={setEnterMsg} onLeave={setLeaveMsg} />
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
			<Icon type="down" className="waypoint-demo-basic-pulse" />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
.waypoint-demo-basic {
  border: solid 1px #dcdee0;
  position: relative;
}

.waypoint-demo-basic__scrollable-parent {
  max-height: 400px;
  overflow: scroll;
  position: relative;
}

.waypoint-demo-basic__spacer {
  color: #969799;
  font-size: 40px;
  line-height: 200px;
  text-align: center;
}

.waypoint-demo-basic__waypoint-line {
  border-top: 2px dashed #d40000;
}

.waypoint-demo-basic__message {
	box-sizing: border-box;
  background-color: #f2f3f5;
  color: #323233;
  left: 0;
  opacity: 0.8;
  padding: 10px 0;
  pointer-events: none;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
}

@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.15, 1.15, 1.15);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.waypoint-demo-basic-pulse {
	animation-name: pulse;
	animation-duration: 1s;
	animation-fill-mode: both;
	animation-iteration-count: infinite;
}
</style>
