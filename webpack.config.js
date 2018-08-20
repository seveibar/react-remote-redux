module.exports = {
  mode: 'production',
  output: {
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react', '@babel/preset-flow'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    ]
  }
}
