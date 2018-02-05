---
title: Avatar
path: component/avatar
group: Data Display
---

## Avatar

Represent a person or a thing, supports icons, images or character.

### API

| Property     |  Description  | Type     |  Required   |  Default  | Alternative |
| ---------| ----------------- | ------  | -------------|----------------- |-----|
| shape    | Avatar shape, circle or square | `string` | No | `'circle'` | `'square'` |
| size     | Avatar size, can be a preset or an arbitrary number  | `string` \| `number` | No | `'default'` | `'small'` \| `'large'` \| pixel value |
| icon    | Icon name   | `string`  | No  | | |
| src     | Image url   | `string` | No | | |
| children  | Text content  | `string` | No | | |
| bordered  | Show border | `bool` | No | `false` | `true` | 
| style  | Custom styles | `object` | No | | |
| className    | Custom class name      |  `string`    | NO |           |         |
| prefix | Custom class name prefix  | `string` | No | | |

**WARNING**：`icon`, `src` and `children` are mutual exclusive，using more than one at the same time is undefined behavior.
