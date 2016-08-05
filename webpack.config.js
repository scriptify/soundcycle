/* No ES6! */
var path = require('path'),
webpack = require('webpack'), // Da bundling modules!
NpmInstallPlugin = require('npm-install-webpack-plugin'), // Install client dependencies automatically!
merge = require('webpack-merge'), // Merge together configurations!
cssnext = require('postcss-cssnext'),
CONFIG = require('./config/config');

const PATHS = {
  app: CONFIG.APP_PATH,
  build: CONFIG.PUBLIC_PATH,
  img: CONFIG.IMG_PATH,
  config: CONFIG.CONFIG_PATH
};

const TARGET = process.env.npm_lifecycle_event;

const COMMON_CONFIGURATION = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx'], // Resolve these extensions
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: PATHS.app
      },
      {
       test: /\.jsx?$/,
       loaders: ['babel?cacheDirectory'],
       include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: PATHS.img
      }, {
        test: /\.worker.js$/,
        loaders: ['worker-loader', 'babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  postcss: function() {
    return [ cssnext ];
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(TARGET === 'dev' ? 'development' : 'production')
    })
  ]
};

switch(TARGET) {
  // Which procedure was started?
  default:
  case 'dev': {
    module.exports = merge(COMMON_CONFIGURATION, {
      devServer: {
        contentBase: PATHS.build,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: 'errors-only'
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new NpmInstallPlugin({
          save: true
        })
      ],
      devtool: 'eval-source-map'
    });
  }
  break;
  case 'start': {
    module.exports = merge(COMMON_CONFIGURATION, {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.DedupePlugin()
      ]
    });
  }
}
