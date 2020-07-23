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
			<Pop trigger={trigger} position="top-left" content="TL">
				<Button>TopLeft</Button>
			</Pop>
			<Pop trigger={trigger} position="top-center" content="TC">
				<Button>TopCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="top-right" content="TR">
				<Button>TopRight</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-bottom-row">
			<Pop trigger={trigger} position="bottom-left" content="BL">
				<Button>BottomLeft</Button>
			</Pop>
			<Pop trigger={trigger} position="bottom-center" content="BC">
				<Button>BottomCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="bottom-right" content="BR">
				<Button>BottomRight</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-left-col">
			<Pop trigger={trigger} position="left-top" content="LT">
				<Button>LeftTop</Button>
			</Pop>
			<Pop trigger={trigger} position="left-center" content="LC">
				<Button>LeftCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="left-bottom" content="LB">
				<Button>LeftBottom</Button>
			</Pop>
		</div>
		<div className="zent-doc-pop-positions-right-col">
			<Pop trigger={trigger} position="right-top" content="RT">
				<Button>RightTop</Button>
			</Pop>
			<Pop trigger={trigger} position="right-center" content="RC">
				<Button>RightCenter</Button>
			</Pop>
			<Pop trigger={trigger} position="right-bottom" content="RB">
				<Button>RightBottom</Button>
			</Pop>
		</div>
	</div>,
	mountNode
);
```

<style>
  .zent-doc-pop-positions {
    position: relative;

		&-top-row,
		&-bottom-row {
      text-align: center;

      .zent-pop-wrapper:not(:last-child) {
        margin-right: 10px;
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

			>* {
				margin-left: 0 !important;
			}

      >*:not(:last-child) {
				margin-bottom: 10px;
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
        width: 120px;
      }
    }
  }
</style>
