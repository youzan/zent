## 0.1.8 (2016-12-24)

* Tree增加isRoot属性，用于判断该节点是否为根节点，为了处理parentId为后端定义无法修改的特殊情况。如果设置了isRoot属性，parentId的设置失效。
* react升级，修改defaultCheckedKeys, disabledCheckedKeys的PropTypes定义为PropTypes.arrayOf(PropTypes.any)
* 修改checkbox样式，half-checked向上偏移1px的bug
* 增加ForestWithIsRoot案例，演示plainTree的isRoot使用
