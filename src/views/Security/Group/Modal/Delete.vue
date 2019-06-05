
<template>
  <div>
    <a-modal
      :visible="visible"
      @cancel="handleCancel"
      @ok="handleCreate"
      :confirmLoading="confirmLoading"
      title="删除安全组"
      type="danger"
      okText="删除"
      okType="danger"
    >
      <p style="margin-top: 10px;">
        您已经选择安全组“<span class="primay-color">{{ currRecord.name }}</span>”。
        请确认你的操作，该操作不能撤销。
      </p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { deleGroup as fetchAPI } from '@/api/security/index';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "deleGroup",
    };
  },
  methods: {
    onShow () {
      this.formValues = { securityGroupId: this.currRecord.id }
    },
  }
};
</script>

<style scoped>
p {
  text-align: left;
}
li {
  display: table-row;
}
li span {
  display: table-cell;
  padding-right: 20px;
  padding-bottom: 16px;
}
</style>
