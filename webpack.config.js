const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postcssConfig = require('./postcss.config');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 用来把css等非js文件单独拎出来打包
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  target: 'web',
  entry: {
    app: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: [path.resolve(__dirname, 'node_modules')],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.jsx$/,
      //   loader: 'babel-loader'
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'assets/[name]-[hash:5].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 编译或者js代码中用来判断是什么环境
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_DEV': isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'htmlwebpackplugin set title'
    })
  ]
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: postcssConfig
        },
        'less-loader'
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map'  // 帮助在页面上调试代码 es6代码在浏览器里没有办法调试  sourcemap进行代码映射，打开的页面看到的代码就是自己写的vue代码 方便调试 
  config.devServer = {
    port: 8081,
    host: '0.0.0.0',
    overlay: {
      errors: true,
      warnings: false
    },
    historyApiFallback: {  // 设置404页面
      rewrites: [
        { from: /^\/$/, to: '/dist/404.html' },
        { from: /^\/subpage/, to: '/dist/404.html' },
        { from: /./, to: '/dist/404.html' }
      ]
    },
    // open: true, // 自动打开页面
    // stats: "errors-only",
    hot: true // 设置热更新
  }

  config.plugins.push(  
    // 热更新需要添加的两个plugin
    new webpack.HotModuleReplacementPlugin(), // 只重新渲染页面中被修改的模块, 不会重新渲染整个页面
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 浏览器尽可能地缓存，减少流量和用户加载更快，将业务和类库代码进行分开打包 app vendor
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue'] // vue框架
  }
  config.output.filename = '[name].[chunkhash:8].js' // chunkhash 和 hash的区别--hash会同名是整个应用的hash， chunkhash是每个块一个chunkhash值
  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: postcssConfig
        },
        'less-loader'
      ]
    }
  )
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash:8].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(['dist'])
  )
  config.optimization = {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        default: false
      }
    }
  }
}


module.exports = config