var webpack = require('webpack');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var base = require('./webpack.config');

var prefix = '/zanui/react/';

module.exports = Object.assign({}, base, {
  output: Object.assign(base.output, {
    publicPath: prefix
  }),

  plugins: base.plugins.concat([
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './assets/ZanUIlogo256x256.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favico-[hash]-',
      // Emit all stats of the generated icons
      // emitStats: false,
      // The name of the json containing all favicon information
      // statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: false,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#fff',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Zent',

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
});
