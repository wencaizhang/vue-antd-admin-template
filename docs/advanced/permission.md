# 权限管理

权限控制是中后台系统中常见的需求之一，你可以利用我们提供的 *路由权限* 和 **指令权限**，实现一些基本的权限控制功能，脚手架中也包含了几个简单示例以提供参考。

## 路由权限

路由权限的实现方式是通过获取当前用户的权限去比对路由表，生成当前用户具有的权限可访问的路由表，通过 router.addRoutes 动态挂载到 router 上。

## 指令权限

封装了一个非常方便实现按钮级别权限的自定义指令：v-permission

使用：

```vue
<template>
  <!-- 校验是否有 dashboard 权限下的 add 操作权限 -->
  <a-button v-permission="['admin']">添加用户</a-button>

  <!-- 校验是否有 dashboard 权限下的 del 操作权限 -->
  <a-button v-permission="['guest']">删除用户</a-button>

  <!-- 校验是否有 dashboard 权限下的 edit 操作权限 -->
  <a v-permission="['vip']" @click="edit(record)">修改</a>
</template>
```