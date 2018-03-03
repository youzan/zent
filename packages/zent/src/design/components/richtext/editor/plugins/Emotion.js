import React, { Component } from 'react';
import Dialog from 'dialog';
import Tabs from 'tabs';

const TabPanel = Tabs.TabPanel;
const { openDialog, closeDialog } = Dialog;
const dialogId = 'zent_design_component_richtext_emotion_dialog';

const defaultTab = [
  {
    name: '精选',
    whichTpl: 'normal',
    tplInfo: 'Choice',
    wrapClass: 'jd',
    sum: 84,
    imgFolder: 'jx2/',
    imgName: 'j_00',
  },
  {
    name: '兔斯基',
    whichTpl: 'normal',
    tplInfo: 'Tuzki',
    wrapClass: 'tsj',
    sum: 40,
    imgFolder: 'tsj/',
    imgName: 't_00',
  },
  {
    name: '绿豆蛙',
    whichTpl: 'normal',
    tplInfo: 'Lvdouwa',
    wrapClass: 'ldw',
    sum: 52,
    imgFolder: 'ldw/',
    imgName: 'w_00',
  },
  {
    name: '波波',
    whichTpl: 'normal',
    tplInfo: 'Bobo',
    wrapClass: 'bb',
    sum: 63,
    imgFolder: 'bobo/',
    imgName: 'b_00',
  },
  {
    name: '北鼻猫',
    whichTpl: 'normal',
    tplInfo: 'BabyCat',
    wrapClass: 'cat',
    sum: 20,
    imgFolder: 'babycat/',
    imgName: 'C_00',
  },
  {
    name: '泡泡',
    whichTpl: 'pp',
    tplInfo: 'Bubble',
    wrapClass: 'pp',
    sum: 50,
    imgFolder: 'face/',
    imgName: 'i_f_',
  },
  {
    name: '有啊',
    whichTpl: 'normal',
    tplInfo: 'Youa',
    wrapClass: 'youa',
    sum: 44,
    imgFolder: 'youa/',
    imgName: 'y_00',
  },
  {
    name: 'QQ',
    whichTpl: 'qq',
    tplInfo: 'Qq',
    wrapClass: 'qq',
    sum: 105,
    imgFolder: 'qq/',
    imgName: '',
  },
];

class Emotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 'Choice',
    };
  }

  componentWillMount() {
    this.initTabs();
  }

  initTabs() {
    this.allTabs = defaultTab.map((item, index) => {
      let tabContent = [];

      for (let i = 1, len = item.sum; i <= len; i++) {
        let imgSrc = `${item.imgFolder}${item.imgName}${
          i < 10 ? `0${i}` : i
        }.gif`;
        let styleObj = {};
        let pos = '';

        if (item.whichTpl === 'pp') {
          styleObj = { backgroundPosition: `left ${(i - 1) * -25}px` };
          pos = i % 12 <= 6 ? 'posRight' : 'posLeft';
        } else if (item.whichTpl === 'qq') {
          styleObj = { backgroundPosition: `${(i - 1) * -24}px 50%` };
          pos = i % 15 <= 6 ? 'posRight' : 'posLeft';
        } else {
          styleObj = { backgroundPosition: `left ${(i - 1) * -35}px` };
          pos = i % 12 <= 6 ? 'posRight' : 'posLeft';
        }

        tabContent.push(
          <div key={`${item.tplInfo}-${i}`}>
            <span
              className={item.wrapClass}
              style={styleObj}
              onClick={this.onClick.bind(this, item, imgSrc, pos)}
            />
          </div>
        );
      }

      return (
        <TabPanel tab={item.name} id={item.tplInfo} key={index}>
          <div className="emotion-content">
            <div className="emotion-list-wrapper">{tabContent}</div>
          </div>
        </TabPanel>
      );
    });
  }

  onTabChange = id => {
    this.setState({
      activeId: id,
    });
  };

  onClick(item, imgSrc) {
    let imgAddr = 'https://b.yzcdn.cn/v2';
    // App的WebView不支持//需要指明真正的协议
    imgAddr = imgAddr.replace(/^\/\//, 'https://');
    imgSrc = `${imgAddr}/image/ueditor_emotion/${imgSrc}`;

    closeDialog(dialogId);
    this.props.callback(imgSrc);
  }

  render() {
    return (
      <Tabs
        activeId={this.state.activeId}
        onTabChange={this.onTabChange}
        className="emotion-tabs"
      >
        {this.allTabs}
      </Tabs>
    );
  }
}

export default function(options) {
  openDialog({
    dialogId,
    className: 'zent-design-component-richtext__emotion',
    children: <Emotion callback={options.callback} />,
  });
}
