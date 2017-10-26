---
order: 0
zh-CN: 中文标题A
en-US: Title in English A
---

```js
// console.log('aaa');
import { Button } from 'zent';

class Sample extends React.Component {
    state = {
        num: 0
    };

    render() {
        return (
            <div>
                {this.state.num}
                <Button
                    onClick={() => {
                        const result = this.state.num + 1;
                        this.setState({
                            num: result
                        });
                    }}
                    type="primary">
                    一级按钮
                </Button>
            </div>
        )
    }
}

ReactDOM.render(
	<Sample />
	, mountNode
);
```
