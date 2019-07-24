# 开始使用

[vue-antd-starter](vue-antd-starter)


## 安装

从 GitHub 仓库中直接安装最新的脚手架代码。

```bash
git clone https://github.com/wencaizhang/vue-admin-template.git my-project
cd my-project
```

## 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── public
│   └── logo.png             # LOGO
|   └── index.html           # Vue 入口模板
├── src
│   ├── api                  # Api ajax 等
│   ├── assets               # 本地静态资源
│   ├── config               # 项目基础配置，包含路由，全局设置
│   ├── components           # 业务通用组件
│   ├── core                 # 项目引导, 全局配置初始化，依赖包引入等
│   ├── layouts              # 页面基础框架
│   ├── router               # Vue-Router
│   ├── store                # Vuex
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── views                # 业务页面入口和常用模板
│   ├── App.vue              # Vue 模板入口
│   └── main.js              # Vue 入口 JS
│   └── permission.js        # 路由守卫(路由权限控制)
├── tests                    # 测试工具
├── README.md
└── package.json
```

## 本地开发

安装依赖。

```bash
$ yarn install
```

如果网络状况不佳，可以使用 cnpm 进行加速，并使用 cnpm 代替 yarn

```bash
$ yarn run serve
```

启动完成后会自动打开浏览器访问 http://localhost:8000，你看到下面的页面就代表成功了。

接下来你可以修改代码进行业务开发了，我们内建了典型业务模板、常用业务组件、全局路由等等各种实用的功能辅助开发，你可以继续阅读和探索左侧的其他文档。