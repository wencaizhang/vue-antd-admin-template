import Vue from 'vue';
export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  const timeObj = {
    9:  '早上好',
    11: '上午好',
    13: '中午好',
    20: '下午好',
    24: '晚上好',
  };
  const key = Object.keys(timeObj).find(key => hour <= key);
  return timeObj[key];
}

export function clearToken () {
  Vue.ls.clear();
}

export const rulesObj = {
  // 允许使用 0-9，a-z，A-Z, -, _ 最长12个字符
  name: {
    pattern: /^(\w|_|-){1,12}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，且不超过 12 个字符!'
  },

  password: {
    pattern: /^(\w|_|-|!|#){8,12}$/,
    message: '请使用英文字母、数字、横杠和下划线的组合，8-12 个字符!'
  },
}

/**
 * 将正常时间格式转化为时间戳
 * @param {String} time [正常时间格式，如：2019-04-01 13:10:10]
 */
export function transToTimestamp (time=null) {
  // 没有对 time 做合法性校验
  // 假设传入的 time 都是合法的时间格式：2019-04-01 13:10:10
  const date = new Date(time);
  const timestamp = date.getTime();  // 13 位数字，精确到毫秒
  return timestamp;
}

/**
 * 计算传入的时间戳和当前时间相差了多久
 * @param {Number} timestamp [时间戳]
 */
export function getTimeDiff (timestamp) {
  // 如果精确到毫秒，时间戳是 13 位数字
  // 这里按照秒来计算，需要将毫秒转换为秒
  if (timestamp > 1 * 10 ** 12) {
    timestamp = timestamp / 1000;
  }
  
  var currentStamptime = Date.parse(new Date()) / 1000;
  var agoAt = '刚刚';
  var diff = currentStamptime - timestamp;
  var points = [
    { value: 365 * 24 * 60 * 60, suffix: '年前', max: 2 },
    { value: 30 * 24 * 60 * 60, suffix: '月前', max: 11 },
    { value: 7 * 24 * 60 * 60, suffix: '周前', max: 4 },
    { value: 24 * 60 * 60, suffix: '天前', max: 6 },
    { value: 60 * 60, suffix: '小时前', max: 23 },
    { value: 10 * 60, suffix: '0分钟前', max: 5 }
  ];

  for (var i = 0; i < points.length; i++) {
    var item = points[i];
    var mode = Math.floor(diff / item.value);
    if (mode >= 1) {
      agoAt = Math.min(mode, item.max) + item.suffix;
      break;
    }
  }
  return agoAt;
}