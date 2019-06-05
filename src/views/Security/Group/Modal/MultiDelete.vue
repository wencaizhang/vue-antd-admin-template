
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除安全组"
      okText="删除"
      okType="danger"
    >
      <a-alert message="注意：删除安全组后数据不可恢复（default 系统默认安全组，不允许删除）！" type="warning" showIcon />
      <p>
        你已经选择了安全组“{{ totalList.map(item => item.name).join(', ') }}”
      </p>

      <template slot="footer" v-if="showMyFooter">
        <a-button @click="handleCancel">取消</a-button>
      </template>
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
      name: "multiDeleta",
      loop: true,
      totalList: [],

      showMyFooter: false,
    };
  },

  methods: {
    onShow () {
      this.showMyFooter = false;
      const { data, selectedRowKeys } = this.$parent;
      this.totalList = data.filter(item => {
        return selectedRowKeys.includes(item.id);
      });
      if (this.totalList.length === 1 && this.totalList.some(item => item.name === 'default')) {
        this.showMyFooter = true;
      }
      this.list = this.totalList.filter(item => item.name !== 'default');
      this.handleItemCount = this.list.length;
    },
    async handleItemFetch (item) {
      try {
        const payload = { securityGroupId: item.id }
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

<style scoped>
p {
  margin-top: 10px; text-align: center;
}
</style>
