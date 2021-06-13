import ReactMarkdown from 'react-markdown';
import ThemeGenerator from '../../components/theme-change-trigger';
import md from './THEME_en-US.md';

export default function themeCN() {
  return (
    <section className="zandoc-react-markdown">
      <ReactMarkdown>{md}</ReactMarkdown>
      <div className="zandoc-react-color-title">Online sample</div>
      Choose changed color:
      <ThemeGenerator
        label="current semantic color in zent: "
        prompt="Choose a color with a higher saturation and brightness, please. like: S > 85, B > 80"
      />
    </section>
  );
}
