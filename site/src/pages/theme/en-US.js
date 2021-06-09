import ReactMarkdown from 'react-markdown';
import ColorGenerator from './generator';
import md from './THEME_en-US.md';

export default function themeCN() {
  return (
    <section className="zandoc-react-markdown">
      <ReactMarkdown>{md}</ReactMarkdown>
      <div className="zandoc-react-color-title">Online sample</div>
      Choose color:
      <ColorGenerator
        label="current semantic color in zent: "
        prompt="Choose a color with a higher saturation and brightness, please. like: S > 85, B > 80"
      />
    </section>
  );
}
