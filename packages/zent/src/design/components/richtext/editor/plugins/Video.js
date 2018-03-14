import React, { Component } from 'react';
import Form from 'form';
import Sweetalert from 'sweetalert';

const { createForm, Field, InputField } = Form;

const YOUKU_IMAGE =
  'http://img.yzcdn.cn/public_files/2015/09/10/04eeb56eb29cbfbe29d67042be4d21ed.jpg';
const TUDOU_IMAGE =
  'http://img.yzcdn.cn/public_files/2015/09/10/1640ba3f20b22d4b35a62d72831e8110.jpg';

const VideoForm = createForm({})(
  class extends Component {
    constructor(props) {
      super(props);
      this.preview = this.preview.bind(this);
      this.width = props.width || 620;
      this.height = props.height || this.width * 0.75;

      // 自定义需要生成图片的width和height
      this.imgWidth = props.imgWidth || 300;
      this.imgHeight = props.imgHeight || 225;

      this.iframeUrl = '';

      this.state = {
        videoUrl: '',
      };
    }

    preview(e) {
      const videoUrl = e.target.value;
      if (e.type === 'paste') {
        setTimeout(this.previewVideo.bind(this, videoUrl), 1);
      } else {
        this.previewVideo(videoUrl);
      }
      this.setState({
        videoUrl,
      });
    }

    previewVideo(url) {
      this.iframeUrl = this.processUrl(url);
      this.renderIframe();
    }

    processUrl(url) {
      if (!url) {
        return;
      }

      let id;
      let iframeUrl;

      if (url.indexOf('v.qq.com') >= 0) {
        id = url.match(/vid=([^&]*)($|&)/);
        if (id) {
          iframeUrl = `https://v.qq.com/iframe/player.html?vid=${
            id[1]
          }&tiny=0&auto=0`;
        } else {
          id = url.match(/\/([0-9a-zA-Z]+).html/);
          if (id) {
            iframeUrl = `https://v.qq.com/iframe/player.html?vid=${
              id[1]
            }&tiny=0&auto=0`;
          }
        }
        if (!id) {
          return;
        }
      } else if (url.indexOf('v.youku.com') >= 0) {
        id = url.match(/id_(.*)\.html/);
        iframeUrl = `http://player.youku.com/embed/${id[1]}`;
      } else if (url.indexOf('//player.youku.com/embed/') >= 0) {
        iframeUrl = url.match(/src="([^"]*)"/)[1];
      } else if (url.indexOf('tudou.com') >= 0) {
        id = url.match(/\/([\w\-]*)\.html/)[1];
        iframeUrl = `http://www.tudou.com/programs/view/html5embed.action?code=${id}`;
      } else {
        return;
      }

      return iframeUrl;
    }

    renderIframe(src) {
      src = src || this.iframeUrl;

      if (src) {
        let video = `<iframe src="${src}" width="${this.width}" height="${
          this.height
        }" allowfullscreen="true"></ifame>`;

        if (this.isYouku() || this.isTudou()) {
          video = `<img src="${this.getSiteLogoImage()}" />`;
        }

        document.getElementById('preview').innerHTML = video;
      } else {
        document.getElementById('preview').innerHTML =
          '<span>请复制腾讯、优酷视频地址输入框。</span>';
      }
    }

    isYouku() {
      return this.iframeUrl && this.iframeUrl.match('youku');
    }

    isTudou() {
      return this.iframeUrl && this.iframeUrl.match('tudou');
    }

    getSiteLogoImage() {
      if (this.isYouku()) {
        return YOUKU_IMAGE;
      }
      if (this.isTudou()) {
        return TUDOU_IMAGE;
      }
    }

    saveVideo() {
      if (!this.iframeUrl) return;

      let imgInfo = {
        url: this.iframeUrl,
        width: this.imgWidth,
        height: this.imgHeight,
      };

      if (this.isYouku() || this.isTudou()) {
        imgInfo.html = `<a class="video-link" target="_blank" href="${
          this.iframeUrl
        }"><img src="${this.getSiteLogoImage()}" /></a>`;
      }

      this.props.callback(imgInfo);
      this.props.onClose();
    }

    render() {
      return (
        <Form
          horizontal
          className="video-content"
          onSubmit={this.props.handleSubmit(this.saveVideo)}
        >
          <strong>
            为了在微信中有更好的体验，推荐使用<a
              href="http://v.qq.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              腾讯视频
            </a>。
          </strong>
          <Field
            name="videoUrl"
            label="视频地址"
            placeholder="复制视频地址到这里"
            component={InputField}
            value={this.state.videoUrl}
            onInput={this.preview}
            onChange={this.preview}
          />
          <div id="preview">
            <span>预览区</span>
          </div>
        </Form>
      );
    }
  }
);

export default function(options) {
  const closeDialog = Sweetalert.confirm({
    className: 'zent-design-component-richtext__video',
    title: '视频插入视频',
    content: (
      <VideoForm
        callback={options.callback}
        onClose={() => closeDialog()}
        ref={form => (this.form = form)}
      />
    ),
    onConfirm: () => {
      this.form.getWrappedForm().saveVideo();
    },
  });
}
