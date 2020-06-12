module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    })
  ]
};
