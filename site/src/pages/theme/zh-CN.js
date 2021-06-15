import ReactMarkdown from 'react-markdown';
import ThemeGenerator from '../../components/theme-change-trigger';
import md from './THEME_zh-CN.md';

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
    </section>
  );
}
