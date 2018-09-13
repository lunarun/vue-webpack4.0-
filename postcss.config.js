module.exports = {
  ident: 'postcss',
  plugins: [
    require('autoprefixer')({browsers: 'last 7 versions'})
  ],
  sourceMap: true
}