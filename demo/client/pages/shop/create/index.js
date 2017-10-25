import React, { Component } from 'react';
import { Design, Button, Notify, BlockHeader } from 'zent';
import { withRouter } from 'react-router-dom';
import assign from 'lodash/assign';
import configConf from 'zent/lib/design/components/config';
import ConfigEditor from 'zent/lib/design/components/config/ConfigEditor';
import whitespaceConf from 'zan-design/lib/components/whitespace';
import noticeConf from 'zan-design/lib/components/notice';
import storeConf from 'zan-design/lib/components/store';
import lineConf from 'zan-design/lib/components/line';
import imageAdConf from 'zan-design/lib/components/image-ad';
import linkConf from 'zan-design/lib/components/link';
import goodsConf from 'zan-design/lib/components/goods';
import goodsListConf from 'zan-design/lib/components/goods-list';
import tagListConf from 'zan-design/lib/components/tag-list';
import titleConf from 'zan-design/lib/components/title';
import showcaseConf from 'zan-design/lib/components/showcase';
import textNavConf from 'zan-design/lib/components/text-nav';
import cubeConf from 'zan-design/lib/components/cube';
import navConf from 'zan-design/lib/components/nav';
import richtextConf from 'zan-design/lib/components/richtext';

import 'zent/css/design-config.css';
import 'zan-design/css/index.css';
import 'zan-design/css/whitespace/index.css';
import 'zan-design/css/notice/index.css';
import 'zan-design/css/store/index.css';
import 'zan-design/css/line/index.css';
import 'zan-design/css/image-ad/index.css';
import 'zan-design/css/link/index.css';
import 'zan-design/css/goods/index.css';
import 'zan-design/css/goods-list/index.css';
import 'zan-design/css/tag-list/index.css';
import 'zan-design/css/text-nav/index.css';
import 'zan-design/css/showcase/index.css';
import 'zan-design/css/cube/index.css';
import 'zan-design/css/nav/index.css';
import 'zan-design/css/richtext/index.css';
import 'zan-design/css/title/index.css';
import './style.pcss';

const LINK_MENU_CONFIG = ['GoodsAndTag', 'HomePage', 'Link'];

const UPLOAD_CONFIG = {
  mediaListUrl: `${_global.url
    .demo}/api/shop/paper/upload/media/medialist.json`,
  categoryListUrl: `${_global.url
    .demo}/api/shop/paper/upload/category/categorylist.json`,
  fetchUrl: `${_global.url.demo}/api/shop/paper/upload/dock/fetch.json`,
  tokenUrl: `${_global.url.demo}/api/shop/paper/upload/dock/token.json`,
  uploadUrl: `${_global.url.demo}/api/shop/paper/upload/upload.json`
};

const globalConfig = assign({}, _global, {
  url: {
    www: `${_global.url.demo}/api/shop/paper`,
    imgcdn: _global.url.imgcdn
  }
});

const components = [
  assign({}, configConf, {
    // 是否可以拖拽
    dragable: false,

    // 是否出现在底部的添加组件区域
    appendable: false,

    // 是否可以编辑，UMP里面有些地方config是不能编辑的
    // editable: false,

    configurable: false,

    highlightWhenSelect: false
  }),
  assign({}, richtextConf, {
    editorProps: {
      richTextConfig: {
        uploadConfig: UPLOAD_CONFIG
      }
    }
  }),
  goodsConf,
  goodsListConf,
  assign({}, imageAdConf, {
    editorProps: {
      uploadConfig: UPLOAD_CONFIG,
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  assign({}, cubeConf, {
    editorProps: {
      uploadConfig: UPLOAD_CONFIG,
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  assign({}, titleConf, {
    editorProps: {
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  assign({}, textNavConf, {
    editorProps: {
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  assign({}, navConf, {
    editorProps: {
      linkMenuItems: LINK_MENU_CONFIG,
      uploadConfig: UPLOAD_CONFIG
    }
  }),
  assign({}, linkConf, {
    editorProps: {
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  assign({}, showcaseConf, {
    editorProps: {
      uploadConfig: UPLOAD_CONFIG,
      linkMenuItems: LINK_MENU_CONFIG
    }
  }),
  lineConf,
  whitespaceConf,
  storeConf,
  tagListConf,
  noticeConf
];

export class Create extends Component {
  state = {
    value: [
      {
        type: configConf.type,
        ...ConfigEditor.getInitialValue()
      }
    ],

    pendingOnSubmit: false,
    pendingOnDraft: false
  };

  render() {
    return (
      <div className="paper-create">
        <BlockHeader className="paper-create__title" title="新建微页面" />
        <Design
          ref={this.saveDesign}
          cache
          cacheId="paper-create-design"
          confirmUnsavedLeave={false}
          components={components}
          value={this.state.value}
          onChange={this.onChange}
          scrollTopOffset={-270}
          globalConfig={globalConfig}
        />
        <div className="paper-create__actions">
          <Button
            type="primary"
            onClick={this.submit}
            loading={this.state.pendingOnSubmit}
          >
            上架
          </Button>
          <Button
            onClick={this.saveAsDraft}
            loading={this.state.pendingOnDraft}
          >
            保存成草稿
          </Button>
          <Button onClick={this.notImplemented}>预览效果</Button>
        </div>
      </div>
    );
  }

  onChange = newValue => {
    this.setState({
      value: newValue
    });
  };

  saveDesign = instance => {
    this.design = instance && instance.getDecoratedComponentInstance();
  };

  triggerDesignValidation() {
    return this.design.validate();
  }

  notImplemented() {
    Notify.success('暂未开放');
  }

  saveAsDraft = () => {
    this.setState({
      pendingOnDraft: true
    });

    this.triggerDesignValidation()
      .then(() => {
        // submit this.state.value to server
        this.design.markAsSaved();
        Notify.success('保存成功', 2000, () => {
          const { history } = this.props;
          history.push('/paper');
        });
      })
      .catch(validations => {
        // eslint-disable-next-line
        console.log(validations);
        this.setState({
          pendingOnDraft: false
        });
      });
  };

  submit = () => {
    this.setState({
      pendingOnSubmit: true
    });

    this.triggerDesignValidation()
      .then(() => {
        // submit this.state.value to server
        this.design.markAsSaved();
        Notify.success('上架成功', 2000, () => {
          const { history } = this.props;
          history.push('/paper');
        });
      })
      .catch(validations => {
        // eslint-disable-next-line
        console.log(validations);
        this.setState({
          pendingOnSubmit: false
        });
      });
  };
}

export default withRouter(Create);
