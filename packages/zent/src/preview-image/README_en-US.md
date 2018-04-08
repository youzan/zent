---
title: PreviewImage
path: component/preview-image
group: Data Display
---

## previewImage

This component is used to preview images.

### Guide

-  It's used to zoom thumbnail.
-  Next image and previous image can be selected.
-  Images can be rotated.

## API

| Property            | Description             | Type             | Default      | Alternative     |
|------          |------              |------            |--------    |--------   |
| images         | Urls for images      | array            |         |              |
| index          | Start index  | number           | 0       |              |
| showRotateBtn  | Show rotate button   | bool             | true     |  true,false |
| scaleRatio     | Custom scale Ratio   | number           | 1.5     |     |
| parentComponent | Parent component instance，i18n needs this to pass context through | ReactInstance | | |
| className      | Optional. Custom class name     | string           | `''`     |         |
| prefix         | Optional. Custom prefix.    | string           | `'zent'` |         |
