---
title: Icon
subtitle: 图标
path: component/icon
group: 基础
---

## Icon 图标

语义化的图标库。

### 使用指南

-   部分图标分为实心和描线两个版本, 使用 `-o`（字母）来区分, e.g. `shop` (实心)和 `shop-o` (描线).
-   命名规则: `icon名字-[variant(变体)]-[描线与否(o)]`.

### API

| 参数        | 说明      | 类型     | 默认值  |
| --------- | ------- | ------ | ---- |
| type      | 图标类型    | string | `''` |
| className | 自定义额外类名 | string | `''` |

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
