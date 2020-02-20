---
order: 2
zh-CN:
	title: Reveal
en-US:
	title: Reveal
---

```js
import { Waypoint, Icon } from 'zent';
import { CSSTransition } from 'react-transition-group';

function Reveal(props) {
	const [revealed, setRevealed] = React.useState(false);
	const reveal = React.useCallback(() => setRevealed(true), []);
	const hide = React.useCallback(() => setRevealed(false), []);
	return (
		<>
			<Waypoint onEnter={reveal} onLeave={hide} />
			<CSSTransition
				in={revealed}
				timeout={500}
				classNames="waypoint-demo-reveal"
				unmountOnExit
			>
				{props.children}
			</CSSTransition>
		</>
	);
}

function Demo(props) {
	return (
		<div className="waypoint-demo-reveal">
			<div className="waypoint-demo-reveal__scrollable-parent">
				<Spacer />
				<Spacer />
				<Spacer />
				<Reveal>
					<p className="waypoint-demo-reveal-text">
						Surely You're Joking, Mr. Feynman!
					</p>
				</Reveal>
				<Spacer />
				<Spacer />
				<Spacer />
			</div>
		</div>
	);
}

function Spacer() {
	return (
		<div className="waypoint-demo-reveal__spacer">
			<Icon type="down" className="waypoint-demo-reveal-pulse" />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```

<style>
.waypoint-demo-reveal {
  position: relative;
}

.waypoint-demo-reveal__scrollable-parent {
  max-height: 400px;
  overflow: scroll;
  position: relative;
}

.waypoint-demo-reveal__spacer {
  color: #969799;
  font-size: 40px;
  line-height: 200px;
  text-align: center;
}

.waypoint-demo-reveal-text {
	transition: opacity 500ms, transform 500ms;
	text-align: center;
	padding: 10px 0;
}

.waypoint-demo-reveal-enter {
	opacity: 0;
	transform: scale(0.1);
}

.waypoint-demo-reveal-enter-active {
	opacity: 1;
	transform: scale(1);
}

.waypoint-demo-reveal-exit {
	opacity: 1;
	transform: scale(0.9);
}

.waypoint-demo-reveal-exit-active {
	opacity: 0;
	transform: scale(0);
}
</style>
