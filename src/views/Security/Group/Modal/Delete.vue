
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
      <p><a-icon type="warning" style="color: #faad14;" /> 删除前请确认你已经备份该秘钥，或者确定已不再使用该秘钥。</p>
      <p style="margin-top: 10px;" >即将删除安全组 {{ list.join(', ') }}，请确认你的操作。</p>

      <!-- <template slot="footer">
        <template v-if="!showMyFooter">
          <a-button @click="handleCancel">取消</a-button>
          <a-button @click="handleCreate" :loading="confirmLoading" type="danger">删除</a-button>
        </template>
        <template v-else>
          <a-button @click="handleClose">确定</a-button>
        </template>
      </template> -->

    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { deleGroup as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "batchDeleta",
      list: [],
      listLength: 0,
    };
  },
  methods: {
    onShow () {
      // this.showMyFooter = false;
      this.list = this.$parent.selectedRowKeys;
      this.listLength = this.list.length;
    },
    handleFetch() {
      /**
       * 遍历发送请求
       * Promise.all 只要有一个失败就直接返回失败的结果，所以使用遍历
       */
      if (!this.list.length) { return;}
      this.confirmLoading = true;
      this.list.forEach(item => {
        this.handleDelete(item);
      })
    },
    handleFetchEnd () {
      // 所有请求全部结束
      this.confirmLoading = false;
      // this.showMyFooter = true;
      this.handleCancel();
      this.handleRefreshParentTable();
      this.$message.success('删除完成');
    },
    async handleDelete (item) {
      try {
        const payload = {secretKeyId: item}
        const resp = await this.fetchAPI(payload);
      }
      catch (err) {

      }
      finally {
        this.listLength = this.listLength - 1;
        if (this.listLength === 0) {
          this.handleFetchEnd();
        }
      }
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
