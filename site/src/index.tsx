import 'core-js/stable';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'zent/assets/index.scss';
import 'prismjs/themes/prism.css';

import './docs.scss';
import './react-docs.scss';

import App from './App';

const render = (ChildComponent: React.ElementType) => {
  ReactDOM.render(
    <ChildComponent />,
    document.getElementById('app-container') // eslint-disable-line
  );
};

// Add a delay in dev mode to ensure styles are loaded before executing any JavaScript code
if (process.env.NODE_ENV !== 'production') {
  setTimeout(() => {
    render(App);
  }, 500);
} else {
  render(App);
}
