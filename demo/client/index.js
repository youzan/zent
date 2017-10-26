import React from 'react';
import ReactDOM from 'react-dom';

import './index.pcss';
import 'zent/css/index.css'; // eslint-disable-line

import './global';
import Routes from './routes';

const mountNode = document.getElementById('app-container');
ReactDOM.render(<Routes />, mountNode);
