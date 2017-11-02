---
order: 2
zh-CN:
	title: 12种定位
en-US:
	title: 12 positions
---

```jsx
import { Pop, Button } from 'zent';

const trigger = 'hover';

ReactDOM.render(
	<div className="zent-doc-pop-positions">
		<div className="zent-doc-pop-positions-top-row">
			<Pop trigger={trigger} position="top-left" content="Top Left" >
				<Button>TopLeft</Button>
			</Pop>
			<Pop trigger={trigger} position="top-center" content="Top Center">
				<Button>TopCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="top-right" content="Top Right">
				<Button>TopRight</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-bottom-row">
			<Pop trigger={trigger} position="bottom-left" content="Bottom Left" >
				<Button>BottomLeft</Button>
			</Pop>
			<Pop trigger={trigger} position="bottom-center" content="Bottom Center">
				<Button>BottomCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="bottom-right" content="Bottom Right">
				<Button>BottomRight</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-left-col">
			<Pop trigger={trigger} position="left-top" content="Left Top" >
				<Button>LeftTop</Button>
			</Pop>
			<Pop trigger={trigger} position="left-center" content="Left Center">
				<Button>LeftCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="left-bottom" content="Left Bottom">
				<Button>LeftBottom</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-right-col">
			<Pop trigger={trigger} position="right-top" content="Right Top" >
				<Button>RightTop</Button>
			</Pop>
			<Pop trigger={trigger} position="right-center" content="Right Center">
				<Button>RightCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="right-bottom" content="Right Bottom">
				<Button>RightBottom</Button>
			</Pop>
		</div>
	</div>
	, mountNode
)
```

<style>
	.zent-doc-pop-positions {
		position: relative;
		
		&-top-row, &-bottom-row {
			text-align: center;

			.zent-pop-wrapper:not(:last-child) {
				margin-right: 10px
			}
		}

		&-bottom-row {
			margin-top: 200px;
		}

		&-left-col, &-right-col {
			position: absolute;
			top: 0;
			display: flex;
			justify-content: center;
			flex-direction: column;
			height: 100%;

			.zent-pop-wrapper:not(:last-child) {
				margin-bottom: 10px
			}
		}

		&-left-col {
			left: 0;
		}

		&-right-col {
			right: 0;
		}

		.zent-pop-wrapper {
			.zent-btn {
				width: 100px;
			}
		}
	}
</style>
