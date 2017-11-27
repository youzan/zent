import React from 'react';
import cx from 'classnames';

import { H2, H4 } from '../../components/markdown/heading';

export default function Colors(props) {
  const { title, desc, palettes } = props;

  return (
    <div className="zandoc-react-container">
      <section className="zandoc-react-markdown">
        <H2>{title}</H2>
        {desc}

        <H4>{palettes.primary.title}</H4>
        {palettes.primary.desc}
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-primary-1" color="#27f" light />
          <ColorCell name="theme-primary-2" color="#38f" light />
          <ColorCell name="theme-primary-3" color="#59f" light />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-primary-4" color="#bdf" light={false} />
          <ColorCell name="theme-primary-5" color="#e8f7fd" light={false} />
          <ColorCell name="theme-primary-6" color="#eaf3ff" light={false} />
        </div>

        <H4>{palettes.neutral.title}</H4>
        {palettes.neutral.desc}
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-stroke-1" color="#333" light />
          <ColorCell name="theme-stroke-2" color="#444" light />
          <ColorCell name="theme-stroke-3" color="#666" light />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-stroke-4" color="#999" light />
          <ColorCell name="theme-stroke-5" color="#bbb" light />
          <ColorCell name="theme-stroke-6" color="#cacaca" light={false} />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-stroke-7" color="#e5e5e5" light={false} />
          <ColorCell name="theme-stroke-8" color="#f2f2f2" light={false} />
          <ColorCell name="theme-stroke-9" color="#f8f8f8" light={false} />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-stroke-10"
            color="#fff"
            light={false}
          />
        </div>

        <H4>{palettes.auxiliary.success.title}</H4>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-success-1" color="#0a0" light />
          <ColorCell name="theme-success-2" color="#4b0" light />
          <ColorCell name="theme-success-3" color="#6c2" light />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-success-4" color="#396" light />
          <ColorCell name="theme-success-5" color="#4b8" light />
          <ColorCell name="theme-success-6" color="#83e5a7" light={false} />
        </div>

        <H4>{palettes.auxiliary.warning.title}</H4>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-warn-1" color="#fc0" light={false} />
          <ColorCell name="theme-warn-2" color="#feb" light={false} />
          <ColorCell name="theme-warn-3" color="#fff7cc" light={false} />
        </div>

        <H4>{palettes.auxiliary.notice.title}</H4>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-notice-1" color="#f60" light />
          <ColorCell name="theme-notice-2" color="#f85" light />
        </div>

        <H4>{palettes.auxiliary.error.title}</H4>
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-error-1" color="#e33" light />
          <ColorCell name="theme-error-2" color="#f44" light />
          <ColorCell name="theme-error-3" color="#f66" light />
        </div>

        <H4>{palettes.auxiliary.others.title}</H4>
        {palettes.auxiliary.others.desc}
        <div className="zandoc-react-color-row">
          <ColorCell name="theme-mask-black-1" color="rgba(0, 0, 0, 0.1)" />
          <ColorCell name="theme-mask-black-2" color="rgba(0, 0, 0, 0.2)" />
          <ColorCell
            name="theme-mask-black-3"
            color="rgba(0, 0, 0, 0.3)"
            light
          />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell
            name="theme-mask-black-4"
            color="rgba(0, 0, 0, 0.4)"
            light
          />
          <ColorCell
            name="theme-mask-black-5"
            color="rgba(0, 0, 0, 0.5)"
            light
          />
          <ColorCell
            name="theme-mask-black-6"
            color="rgba(0, 0, 0, 0.6)"
            light
          />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-1"
            color="rgba(255, 255, 255, 0.1)"
            light={false}
          />
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-2"
            color="rgba(255, 255, 255, 0.2)"
            light={false}
          />
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-3"
            color="rgba(255, 255, 255, 0.3)"
            light={false}
          />
        </div>
        <div className="zandoc-react-color-row">
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-4"
            color="rgba(255, 255, 255, 0.4)"
            light={false}
          />
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-5"
            color="rgba(255, 255, 255, 0.5)"
            light={false}
          />
          <ColorCell
            className="zandoc-react-color-cell__mask-white"
            name="theme-mask-white-6"
            color="rgba(255, 255, 255, 0.6)"
            light={false}
          />
        </div>
      </section>
    </div>
  );
}

function ColorCell({ color, name, light, className }) {
  return (
    <div
      className={cx('zandoc-react-color-cell', className, {
        'zandoc-react-color-cell--light': light,
        'zandoc-react-color-cell--dark': !light
      })}
      style={{ background: color }}
    >
      <div className="zandoc-react-color-cell__name">{name}</div>
      <div className="zandoc-react-color-cell__color">{color}</div>
    </div>
  );
}
