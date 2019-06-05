
<template>
  <div>
    <a-modal
      :visible="visible"
      @cancel="handleCancel"
      @ok="handleCreate"
      :confirmLoading="confirmLoading"
      title="删除规则"
      type="danger"
      okText="删除"
      okType="danger"
    >
      <p style="margin-top: 10px;">即将删除规则 {{ currRecord.id }}，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { deleRule as fetchAPI } from '@/api/security/index';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "delete",
    };
  },
  methods: {
    onShow () {
      this.formValues = { ruleId: this.currRecord.id }
    },
  }
};
</script>
