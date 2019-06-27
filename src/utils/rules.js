
export default {
  // 允许使用 0-9，a-z，A-Z, -, _ 最长12个字符
  name: {
    pattern: /^(\w|_|-){1,12}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，且不超过 12 个字符!'
  },

  // 真实姓名
  realName: {
    pattern: /^(\w|_|-){1,12}$/,
    message: '长度 1-20位，允许汉字，大小写字母不允许数字、特殊字符及空格!'
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
  emial: {
    pattern: /^\d{11}$/,
    message: '请输入正确邮箱地址!'
  },
  idCard: {
    pattern: /^\d{11}$/,
    message: '请输入正确身份证号码!'
  },

  http: {
    pattern: /^http(s)?:\/\//,
    message: '请输入正确的url!'
  },

  maxLen100: {
    pattern: /.{1,100}/,
    message: '最多 100 个字符'
  },
}