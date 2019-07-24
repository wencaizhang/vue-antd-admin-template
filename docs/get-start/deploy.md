# 构建和发布

## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```bash
$ yarn build
# or
$ npm run build
```

由于 Vue-cli3 已经将复杂的流程封装完毕，构建打包文件只需要一个命令 `yarn build` 或 `npm run build`，构建打包成功之后，会在根目录生成 `dist` 文件夹，里面就是构建打包好的文件，通常是 `*.js`、`*.css`、`index.html` 等静态文件，也包括了项目根的 `public/` 下的所有文件。

如果需要自定义构建，比如指定 `dist` 目录等，可以通过 `/vue.config.js` 进行配置，详情参看：[Vue-cli3](https://cli.vuejs.org/guide/) 配置。