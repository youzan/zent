---
order: 2
zh-CN:
  title: 12种定位
en-US:
  title: 12 positions
---

```jsx
import { Tooltip, Button } from 'zent';

const trigger = 'hover';

ReactDOM.render(
	<div className="zent-doc-tooltip-positions">
		<div className="zent-doc-tooltip-positions-top-row">
			<Tooltip trigger={trigger} position="top-left" title="Top Left">
				<Button>TopLeft</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="top-center" title="Top Center">
				<Button>TopCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="top-right" title="Top Right">
				<Button>TopRight</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-bottom-row">
			<Tooltip trigger={trigger} position="bottom-left" title="Bottom Left">
				<Button>BottomLeft</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="bottom-center" title="Bottom Center">
				<Button>BottomCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="bottom-right" title="Bottom Right">
				<Button>BottomRight</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-left-col">
			<Tooltip trigger={trigger} position="left-top" title="Left Top">
				<Button>LeftTop</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="left-center" title="Left Center">
				<Button>LeftCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="left-bottom" title="Left Bottom">
				<Button>LeftBottom</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-right-col">
			<Tooltip trigger={trigger} position="right-top" title="Right Top">
				<Button>RightTop</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="right-center" title="Right Center">
				<Button>RightCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="right-bottom" title="Right Bottom">
				<Button>RightBottom</Button>
			</Tooltip>
		</div>
	</div>,
	mountNode
);
```

<style>
  .zent-doc-tooltip-positions {
    position: relative;

		&-top-row,
		&-bottom-row {
			display: flex;
      justify-content: center;

      .zent-tooltip-wrapper:not(:last-child) {
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

      .zent-tooltip-wrapper:not(:last-child) {
        margin-bottom: 10px
      }
    }

    &-left-col {
      left: 0;
    }

    &-right-col {
      right: 0;
    }

    .zent-tooltip-wrapper {
      .zent-btn {
        width: 120px;
      }
    }
  }
</style>
