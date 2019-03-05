<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view v-wechat-title='"运管平台 - " + $route.meta.title'/>
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
#app {
  height: 100%;
}
</style>
