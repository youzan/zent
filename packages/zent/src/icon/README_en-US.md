---
title: Icon
path: component/icon
group: Basics
---

## Icon

A semantic icon library.

### Guide

-   Part of icons has solid and outline two versions, which the difference is `-o`. e.g. `shop`(solid) and `shop-o`(outline).
-   Naming rule: `[icon name]-[variant]-[outline or not(o)]`.

### API

| Property        | Description      | Type     | Default  |
| --------- | ------- | ------ | ---- |
| type      | Type of icon    | string | `''` |
| className | custom extra class name | string | `''` |

<style>
.zenticon {
	font-size: 20px;
}

.zenticon-youzan {
	color: #EB0B19;
}

.zi-grid {
    display: flex;
    flex-wrap: wrap;

    .zenticon {
        vertical-align: middle;
        font-size: 20px;
		color: #333;
    }

    .zi-search-input {
        width: 100%;
        margin-bottom: 20px;

        input {
            width: 100%;
            outline: none;
            font-size: 20px;
            box-sizing: border-box;
            padding: 0.3em 0.5em;
            border-radius: 4px;
            border: 1px solid #bbb !important;

            &:focus {
                border: 1px solid #3388FF !important;
            }
        }
    }

    .zi-grid-item {
        box-sizing: border-box;
        width: 50%;
        margin: 10px 0;

        .zi-grid-item-name {
            margin-left: 8px;
        }
    }
}
</style>
