<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="item in matched" :key="item.path || 0">
      <router-link :to="{ name: item.name }">{{ item.meta.title }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      matched: []
    };
  },
  created() {
    this.getRouteList();
  },
  watch: {
    $route(to, from) {
      this.matched = to.matched;
    }
  },
  methods: {
    getRouteList() {
      this.matched = this.$route.matched;
    }
  }
};
</script>

<style>
.breadcrumb {
  margin-bottom: 16px;
}
</style>
