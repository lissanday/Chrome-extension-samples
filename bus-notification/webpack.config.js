const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: './src/manifest.json', to: './manifest.json'
      },
      {
        from: './src/popup/index.html', to: './popup.html'
      },
      {
        from: './src/assets/bus.png', to: './bus.png'
      }
    ])
  ],
  devtool: 'none',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}