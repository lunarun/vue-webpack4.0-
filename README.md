# vue-webpack4.0-项目配置
webpack4版本 目前更新至4.18.0，包括0配置以及移除了CommonsChunkPlugin等

没有用vue-cli脚手架，用vue和webpack自搭建所需要的功能
=》样式，文件图片，js,vue模板解析等

=》配置热更新

=》区分开发和线上版本，不同配置

=》更新4.0中新的内容

代码中用的框架版本：
"vue": "^2.5.17"
"webpack": "^4.18.0"
"@babel/core": "^7.0.1
"@babel/plugin-syntax-jsx": "^7.0.0"

【注】webpack4移除CommonsChunkPlugin，用optimization.splitChunks和optimization.runtimeChunk来代替

代码不多，只是常用的配置入门，可继续搭配vue-router, axio等。
后续继续关注webpack4 更新的新内容~
