
const path = require('path'),
webpack = require('webpack'), // Da bundling modules!
NpmInstallPlugin = require('npm-install-webpack-plugin'), // Install client dependencies automatically!
merge = require('webpack-merge'), // Merge together configurations!
cssImport = require('postcss-import'),
cssnext = require('postcss-cssnext'),
HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  assets: path.join(__dirname, 'assets'),
};

const TARGET = process.env.npm_lifecycle_event;

const COMMON_CONFIGURATION = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
    alias: {
      'components': path.resolve(PATHS.app, 'components'),
      'icons': path.resolve(PATHS.app, 'icons'),
      'stores': path.resolve(PATHS.app, 'stores'),
      'sountility': path.join(PATHS.app, `sountility`)
    }
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [ PATHS.app ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: PATHS.app,
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(TARGET === 'start:dev' ? 'development' : 'production')
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      options: {
        imageWebpackLoader: {
          gifsicle: {
            interlaced: false
          },
          optipng: {
            optimizationLevel: 7
          }
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        postcss: {
          plugins: [
            cssImport({
              path: PATHS.app,
              addDependencyTo: webpack
            }),
            cssnext
          ]
        }
      }
    }),
    new HtmlWebpackPlugin({
      excludeAssets: [/\.min\.js$/],
      template: path.join(PATHS.assets, 'index.html')
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
};

switch(TARGET) {
  case 'start:dev': {
    module.exports = merge(COMMON_CONFIGURATION, {
      devServer: {
        contentBase: PATHS.build,
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: '0.0.0.0',
        https: false,
        disableHostCheck: true,
        proxy: {
          '/api': `http://localhost:3000`,
          '/login': `http://localhost:3000`
        }
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ],
      devtool: 'eval-source-map'
    });
  }
  break;
  case 'start:prod': {
    module.exports = merge(COMMON_CONFIGURATION, {
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin()
      ]
    });
  }
}
