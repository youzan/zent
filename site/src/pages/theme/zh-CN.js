import ReactMarkdown from 'react-markdown';
import ThemeGenerator from '../../components/theme-change-trigger';
import md from './THEME_zh-CN.md';

const titleArr = new Array(6).fill().map((_, _index) => {
  return {
    name: 'title',
    index: _index + 1,
  };
});

const textArr = new Array(3).fill().map((_, _index) => ({
  name: 'normal',
  index: _index + 1,
}));

const Font = ({ name, index }) => {
  return (
    <div className="font-item">
      <p className={`font-${name}-${index}`}>示例文字</p>
    </div>
  );
};

const Block = ({ prefix, index }) => {
  return <div className={`${prefix}-item ${prefix}-${index}`}>示例</div>;
};

export default function themeCN() {
  return (
    <section className="zandoc-react-markdown">
      <ReactMarkdown>{md}</ReactMarkdown>
      <div className="zandoc-react-color-title">在线示例</div>
      选择更换的颜色：
      <ThemeGenerator
        label="现在应用于zent的语义色值："
        prompt="建议选择饱和度和亮度更高的颜色。比如： S > 85, B > 80"
      />
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        临时验收场景↓
      </div>
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        标题规范
      </div>
      <div style={{ margin: '16px 0' }}>
        {titleArr.map(item => (
          <Font {...item} />
        ))}
      </div>
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        其他文字规范
      </div>
      <div style={{ margin: '0 0 16px' }}>
        {textArr.map(item => (
          <Font {...item} />
        ))}
      </div>
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        投影规范
      </div>
      {new Array(3).fill().map((_, _index) => (
        <Block prefix="shadow" index={_index + 1} />
      ))}
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        间距规范, 示例为左间距
      </div>
      <div style={{ backgroundColor: '#f7f7f7', padding: '8px 0' }}>
        {new Array(8).fill().map((_, _index) => (
          <Block prefix="spacing" index={_index + 1} />
        ))}
      </div>
      <div
        className="font-normal-1"
        style={{ margin: '16px 0 4px', color: '#999' }}
      >
        圆角规范
      </div>
      {new Array(2).fill().map((_, _index) => (
        <Block prefix="radius" index={_index + 1} />
      ))}
    </section>
  );
}
