<template>
  <div>
    <page-layout>
      <div class="content">
        <h1>用户基本信息</h1>
      </div>
    </page-layout>

  </div>
</template>

<script>
import PageLayout from "@/components/Layout/PageLayout";

export default {
  components: {
    PageLayout,
  },
  data() {
    return {
      module: "user",
      id: "info",
      name: "用户基本信息",
    };
  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped>
.status-disabled {
  user-select: none;
  color: #BBB;
}
.compact-search-input {
  display: inline-block;
  width: auto;
  /* FIXME 对齐问题 */
  vertical-align: middle;
  margin-top: -2px;
}
</style>
