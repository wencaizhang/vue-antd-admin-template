# 获取验证码按钮封装

## How to use

+ 引入组件

```js
import CaptchaButton from '@/components/tools/CaptchaButton'

export default {
  components: { CaptchaButton },
  methods: {
    async getCaptcha(callback) {
      try {
        // 校验并获取手机号
        const data = await this.handleValidateField(["phone"]);
        // 执行 callback
        callback && callback({
          payload: {},
          api: api,
        });
      } catch (error) {}
    },
  }
}
```

+ template 中使用组件

```html
<captcha-button
  @clickBtn="getCaptcha"
  size="small"
/>
```

## 参数

### 自定义事件

点击按钮会触发自定义事件 `clickBtn`，事件接收函数可以用来校验并获取手机号/邮箱，另外函数又一个 callback 回调函数作为参数，callback 用于请求服务器发送验证码。

因此在校验通过之后需要调用 callback，callback 接受一个 Object 类型的值作为参数，这个值有两个属性：payload 和 api，分别代表 发送请求的方法和发送请求的参数。

### 其他参数

另外，此 Button 组件基于 ant-design-vue 组件库的 a-button 组件开发，可接受和 a-button 相同的参数。

需注意：属性 loading 和 disabled 已在内部封装，不建议外部使用。