# 和服务端通信

## 前端请求流程

在 vue-admin-template 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

1. UI 组件交互操作；
2. 调用统一管理的 api service 请求函数；
3. 使用封装的 request.js 发送请求；
4. 获取服务端返回；
5. 更新 data。

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 `@/src/api` 文件夹中，并且一般按照 `model` 纬度进行拆分文件，如：

```
api/
  user.js
  permission.js
  goods.js
  ...
```

其中，`@/src/utils/request.js` 是基于 [axios](https://github.com/axios/axios) 的封装，向外暴露了 **POST**，**GET**，**DELETE** 三个方法分别用于处理相应类型到请求。

另外它还封装了全局的 request 拦截器、response 拦截器、统一的错误处理、baseURL 设置等。

具体代码请参考 [request.js](https://github.com/wencaizhang/vue-admin-template/blob/master/src/utils/request.js)

例如在 api 中的一个用户登录的例子：

```js
import { GET, POST } from '@/utils/request';

// 用户登录
export const login = payload => POST('/user/login', payload);
```

```vue
<template>
  <div>
    <!-- 登录表单 - start  -->
    <!-- some code... -->
    <!-- 登录表单 - end  -->
    <a-button @click="handleLogin">登录</a-button>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  data () {
    return {
      loading: false,
      userInfo: null,
    }
  },
  methods: {
    async handleLogin () {
      try {
        this.loading = true;
        const resp = await login();
        this.$message.success('欢迎回来！');
        // 保存用户信息 & 跳转到项目首页，此处省略不表
      } catch (err) {
        this.$message.error('出了些问题，再试一下吧.');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
```