/* eslint-disable global-require */
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./server/routes');

const PRODUCTION = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const YOUZAN_PRIVATE = !!process.env.ZENT_DEPLOY_DEMO_YOUZAN_PRIVATE;

(function start() {
  const app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if (!PRODUCTION) {
    const errorhandler = require('errorhandler');
    app.use(errorhandler());
  }

  // Serve assets from node server or CDN
  if (PRODUCTION && !YOUZAN_PRIVATE) {
    app.use(express.static('dist'));
  }

  if (!PRODUCTION) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('./webpack.config');

    app.use(
      webpackDevMiddleware(webpack(config), {
        // Tell express to use the webpack-dev-middleware and use the webpack.config.js
        // configuration file as a base.
        publicPath: config.output.publicPath
      })
    );
  }

  // API handlers
  const apiPrefix = PRODUCTION && YOUZAN_PRIVATE ? '/zanui/demo/zent/' : '/';
  app.use(`${apiPrefix}api`, routes);

  // redirect all unknown urls to index.html
  if (PRODUCTION) {
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  } else {
    app.get('*', (req, res) => {
      req.pipe(request(`http://127.0.0.1:${PORT}`)).pipe(res);
    });
  }

  // dead code, debug only
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler will print stacktrace
  if (!PRODUCTION) {
    app.use((err, req, res) => {
      // eslint-disable-next-line
      console.log(err.stack);

      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err
        }
      });
    });
  }

  // production error handler no stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    });
  });

  // finally, let's start our server...
  const server = app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log('Listening on port ' + server.address().port);
  });
})();
