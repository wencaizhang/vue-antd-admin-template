<template>
  <section class="page-header">
    <!-- <Breadcrumb/> -->
    <div class="page-header-detail">
      <div class="title">
        <h1>{{title}}</h1>
      </div>
      <div class="desc">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
// import Breadcrumb from "@/components/tools/Breadcrumb";
export default {
  name: "",
  components: {
    // Breadcrumb
  },
  computed: {},
  created() {
    this.getTitle();
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    getTitle() {
      this.title = this.$route.meta.title;
    }
  }
};
</script>

<style>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;
}
h1 {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}
.desc {
  margin-bottom: 16px;
}
</style>