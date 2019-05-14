
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除硬盘"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除硬盘后数据不可恢复！" type="warning" showIcon/>
      <p>是否删除硬盘 {{ list.map(item => item.name).join(', ') }}，请确认你的操作。</p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { deleteDisk as fetchAPI  } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "multiDelete",
      loop: true,
    };
  },

  methods: {
    onShow () {
      const { data, selectedRowKeys } = this.$parent;
      this.list = data.filter(item => {
        return selectedRowKeys.includes(item.id);
      });
      this.handleItemCount = this.list.length;
    },
    async handleItemFetch (item) {
      try {
        const payload = { hardDiskId: item.id };
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
  },
};
</script>
