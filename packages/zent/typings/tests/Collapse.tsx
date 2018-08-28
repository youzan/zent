import * as React from 'react';
import { Collapse } from '../';

class App extends React.PureComponent<null, { activeKey: string; }> {
  state = {
    activeKey: '1'
  };

  handleChange = (activeKey) => {
    this.setState({
      activeKey
    });
  }

  render() {
    const { activeKey } = this.state;
    return (
      <Collapse activeKey={activeKey} onChange={this.handleChange} bordered={false} accordion>
        <Collapse.Panel title="南歌子（暮春）" key="1" showArrow={false}>
          紫陌寻春去，红尘拂面来。无人不道看花回。惟见石榴新蕊、一枝开。 冰簟堆云髻，金尊滟玉醅。绿阴青子相催。留取红巾千点、照池台。
        </Collapse.Panel>
        <Collapse.Panel title="沁园春" key="2">
          孤馆灯青，野店鸡号，旅枕梦残。渐月华收练，晨霜耿耿，云山摛锦，朝露漙漙。世路无穷，劳生有限，似此区区长鲜欢。微吟罢，凭征鞍无语，往事千端。 当时共客长安。似二陆初来俱少年。有笔头千字，胸中万卷，致君尧舜，此事何难。用舍由时，行藏在我，袖手何妨闲处看。身长健，但优游卒岁，且斗尊前。
        </Collapse.Panel>
        <Collapse.Panel title="浣溪沙" key="3" disabled>
          缥缈红妆照浅溪。薄云疏雨不成泥。送君何处古台西。
废沼夜来秋水满，茂林深处晚莺啼。行人肠断草凄迷。
        </Collapse.Panel>
      </Collapse>
    )
  }
}

export default App
