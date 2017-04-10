A placement is a function returns a `{getCSSStyle: function, name: string}`
record.

`createPlacement(anchorBoundingBox, containerBoundingBox, contentDimension, options)`

`anchorBoundingBox` and `containerBoundingBox` are all relative to container's
(top, left). Container is the closest positioned ancestor of the popover.

The two bounding boxes all have the same fields as the return value of
`getBoundingClientRect()`.

`contentDimension` contains the width and height of popover content.

`options` is a set of available options for placement:
* `options.cushion` placement padding
* `options.anchor` anchor DOM node
* `options.container` container DOM node
* `options.anchorBoundingBoxViewport` anchor bounding box relative to viewport
* `options.containerBoundingBoxViewport` container bounding box relative to viewport

```
    // a bounding box is an object with these fields
    {top, left, right, bottom, width, height}
```
