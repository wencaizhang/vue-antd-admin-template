
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      title="删除硬盘"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除硬盘后数据不可恢复！" type="warning" showIcon/>
      <p style="margin-top: 10px; text-align: center;">是否删除硬盘web1?</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "delete"
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("toggleModalVisible", this.name);
    },
    handleCreate() {
      this.$store.commit("toggleModalVisible", this.name);
    }
  }
};
</script>