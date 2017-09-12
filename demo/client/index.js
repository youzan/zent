import React from 'react';
import ReactDOM from 'react-dom';

import 'zent/css/index.css';
import './index.pcss';
import Routes from './routes';

const mountNode = document.getElementById('app-container');
ReactDOM.render(<Routes />, mountNode);
