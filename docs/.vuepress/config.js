
module.exports = {
  base: '/vue-admin-template',
  title: 'vue-admin-template',
  description: '',
  head: [],
  markdown: {
    lineNumbers: true
  },
  sidebarDepth: 2, // 同时提取 h2 h3
  evergreen: true,

  themeConfig: {
    serviceWorker: {
      updatePopup: { 
         message: '发现新内容', 
         buttonText: '刷新',
      },
    },
    nav: [
    ],
    sidebar: [
      {
        title: '入门',
        // path: '/get-start/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          './get-start/start',
          './get-start/deploy',
          './get-start/server',
          './get-start/styles',
          './get-start/router-and-nav',
        ]
      },
      {
        title: '进阶',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          './advanced/permission',
          './advanced/tableMixins',
          './advanced/modalMixins',
        ]
      },
      {
        title: '其他',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          './other/fqa',
        ]
      },
    ],
  },
}
