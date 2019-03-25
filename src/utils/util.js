import Vue from 'vue';
export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  const timeObj = {
    9: '早上好',
    11: '上午好',
    13: '中午好',
    20: '下午好',
    24: '晚上好'
  };
  const key = Object.keys(timeObj).find(key => hour <= key);
  return timeObj[key];
}

export function clearToken () {
  Vue.ls.clear();
}

export const rules = {
  // 允许使用 0-9，a-z，A-Z, -, _ 最长12个字符
  name: { pattern: /^(\w|_|-){1,12}$/, message: '请使用英文字母、数字、横杠和下划线的组合，且不超过 12 个字符!' },
}