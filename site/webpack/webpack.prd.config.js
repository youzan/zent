const merge = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const base = require('./webpack.config');

module.exports = merge.smart(base, {
  entry: {
    docs: './src/index.js',
  },

  plugins: [
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './assets/zanui-logo.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'favico-[hash]-',
      // Emit all stats of the generated icons
      // emitStats: false,
      // The name of the json containing all favicon information
      // statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
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
        windows: false,
      },
    }),
  ],
});
