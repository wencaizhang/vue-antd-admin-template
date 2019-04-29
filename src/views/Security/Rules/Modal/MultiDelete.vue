
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
      <p style="margin-top: 10px;" >即将删除规则 {{ list.map(item => item.id).join(', ') }}，请确认你的操作。</p>

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
      name: "multiDeleta",
      loop: true,
    };
  },
  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.list = data.filter(item => selectedRowKeys.includes(item.id));
      this.handleItemCount = this.list.length;
    },
    async handleItemFetch (item) {
      try {
        const payload = { ruleId: item.id }
        const resp = await this.fetchAPI(payload);
      }
      catch (err) {

      }
      finally {
        this.handleItemCount = this.handleItemCount - 1;
        if (this.handleItemCount === 0) {
          this.handleLoopFetchEnd();
        }
      }
    },
  }
};
</script>
