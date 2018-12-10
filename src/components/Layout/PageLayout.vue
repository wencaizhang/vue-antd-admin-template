<template>
  <section>
    <page-header>
      <slot name="header"></slot>
    </page-header>
    <a-layout-content class="page-content">
      <slot></slot>
    </a-layout-content>
  </section>
</template>

<script>
import PageHeader from "./PageHeader";
export default {
  name: "",
  components: {
    PageHeader
  },
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.page-content {
  margin: 24px 24px 0;
  padding: 24px;
  background: #fff;
}
</style>