---
order: 1
zh-CN:
	title: 基本用法，第二行是 `Portal` 插入的，可以在浏览器里审查元素观察Html结构
	originalContent: 这里是原来就有的内容
	portalContent: 这里是 Portal 动态插入的内容
	purePortalContent: 这里是 PurePortal 动态插入的内容, 覆盖容器内原有内容
	bodyPortalContent: 默认插入到body最后，并设置为拥有遮罩用于关闭
	bodyPortalButton: 添加带遮罩的Portal到body
en-US:
	title: Basic usage
	originalContent: Original content
	portalContent: Content that Portal inserts dynamically
	purePortalContent: Content that PurePortal inserts dynamically, overwrites the original content inside the container
	bodyPortalContent: The content is appended to body by default, and a curtain is set for closing
	bodyPortalButton: Append a Portal with curtain to body

---

```jsx
import { Portal, Button } from 'zent';

const PurePortal = Portal.PurePortal;
const WrappedPortal = Portal.withNonScrollable(Portal.withESCToClose(Portal));

class PortalBasic extends Component {
    state = {
        bodyPortalVisible: false,
        purePortalVisible: false,
    }
    togglePurePortal = () => this.setState({ purePortalVisible: !this.state.purePortalVisible})
    showBodyPortal = () => this.setState({ bodyPortalVisible: true })
    hideBodyPortal = () => this.setState({ bodyPortalVisible: false })
    render () {
        return (
            <div className="zent-doc-portal-container">
        		<div className="zent-doc-portal-mount-node">{i18n.originalContent}</div>
        		<Portal selector=".zent-doc-portal-mount-node">
        			<div className="zent-doc-portal-content">{i18n.portalContent}</div>
        		</Portal>
        		<div className="zent-doc-pure-portal-mount-node" key={this.state.purePortalVisible}>content to be overwritten</div>
        		{ this.state.purePortalVisible ? 
        		<PurePortal selector=".zent-doc-pure-portal-mount-node">
                    <div className="zent-doc-portal-content">{i18n.purePortalContent}</div>
                </PurePortal> : null }
                <Button onClick={this.togglePurePortal}>Toggle PurePortal</Button>
        		<Button onClick={this.showBodyPortal}>{i18n.bodyPortalButton}</Button>
        		<WrappedPortal 
        		    visible={this.state.bodyPortalVisible} 
        		    onClickAway={this.hideBodyPortal} 
        		    onClose={this.hideBodyPortal}
        		    className="layer"
        		    style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        		    useLayerForClickAway
                >
        		    <div className="zent-doc-portal-content" style={{
        		        position: 'absolute',
        		        left: '50%',
        		        top: '50%',
        		        transform: 'translate3d(-50%, -50%, 0)',
        		        border: '1px solid #d3d3d3',
        		        borderRadius: '3px',
        		        padding: '50px',
        		        background: 'white',
                    }}>{i18n.bodyPortalContent}</div>
        		</WrappedPortal>
        	</div>
        );
    }
}

ReactDOM.render(
	<PortalBasic />,
	mountNode,
);
```
