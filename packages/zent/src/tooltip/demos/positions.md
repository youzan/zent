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
			<Tooltip trigger={trigger} position="top-left" title="TL">
				<Button>TopLeft</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="top-center" title="TC">
				<Button>TopCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="top-right" title="TR">
				<Button>TopRight</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-bottom-row">
			<Tooltip trigger={trigger} position="bottom-left" title="BL">
				<Button>BottomLeft</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="bottom-center" title="BC">
				<Button>BottomCenter</Button>
			</Tooltip>
			<Tooltip trigger={trigger} position="bottom-right" title="BR">
				<Button>BottomRight</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-left-col">
			<Tooltip trigger={trigger} position="left-center" title="LC">
				<Button>LeftCenter</Button>
			</Tooltip>
		</div>
		<div className="zent-doc-tooltip-positions-right-col">
			<Tooltip trigger={trigger} position="right-center" title="RC">
				<Button>RightCenter</Button>
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

			.zent-btn {
				margin-left: 0 !important;
			}

      .zent-btn:not(:last-child) {
        margin-bottom: 10px;
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
