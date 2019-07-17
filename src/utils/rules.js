
export default {
  // 允许使用 0-9，a-z，A-Z, -, _ 最长12个字符
  name: {
    pattern: /^(\w|_|-){1,12}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，且不超过 12 个字符!'
  },

  userName: {
    pattern: /^[a-zA-Z0-9!-_#@]+$/,
    message: '请使用英文字母、数字和特殊字符!-_#@的组合!'
  },
  letterStart: {
    pattern: /^[a-zA-Z]/,
    message: '请使用英文字母开头!'
  },

  HanziAndLetter: {
    pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
    message: '只允许汉字和英文字母!'
  },

  // 修改名称的时候最多允许 20 个字符
  editdName: {
    pattern: /^(\w|_|-){1,20}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，且不超过 20 个字符!'
  },

  password: {
    pattern: /^(\w|_|-|!|#){8,12}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，8-12 个字符!'
  },

  desc: {
    pattern: /^.{1,50}$/,
    message: '描述仅限 50 个字符!'
  },

  phone: {
    pattern: /^\d{11}$/,
    message: '请输入正确手机号码!'
  },
  email: {
    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    message: '请输入正确邮箱地址!'
  },

  http: {
    pattern: /^http(s)?:\/\//,
    message: '请输入正确的url!'
  },

  maxLen100: {
    pattern: /.{1,100}/,
    message: '最多 100 个字符'
  },

  number: {
    pattern: /^\d+$/,
    message: '只允许输入数字'
  },

  enterpriseName: {
    pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g,
    message: '请填写正确的信用代码'
  }
}