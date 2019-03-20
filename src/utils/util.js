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