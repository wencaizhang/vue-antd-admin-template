
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除密钥对"
      okText="删除"
      :cancelText="cancelText"
      okType="danger"
    >
      <p
        style="margin-top: 10px; text-align: center;"
      >即将删除下列密钥对，请确认你的操作。</p>
      <ul>
        <li v-for="item in list" :key="item.id">
          {{ item.id }}
          <a-icon v-show="item.loading" type="loading" />
          <span >{{ item | desc }}</span>
        </li>
      </ul>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";
import { deleteKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      cancelText: '取消',
      name: "batchDeleta",
      list: [],
      result: [],
    };
  },
  filters: {
    desc (item) {
      const desc = item.resp ? item.resp.desc : (item.err || {}).desc;
      console.log(desc);
    }
  },
  methods: {
    onShow () {
      this.cancelText = '取消';
      this.list = this.$parent.selectedRowKeys.map(item => {
        return {
          id: item,
          loading: false,
          deleteResult: {},
        }
      });
    },
    handleFetch() {
      if (!this.list.length) { return;}
      this.confirmLoading = true;
      this.list.forEach(item => {
        item.loading = true;
        this.delete(item);
      })
    },
    handleFetchEnd () {
      this.confirmLoading = false;
      console.log(this.result);
      this.cancelText = '确定';
      this.openNotification('操作完成');
    },
    async delete (item) {
      try {
        const payload = {secretKeyId: item.id}
        const resp = await this.fetchAPI(payload);
        this.result.push({
          ...payload,
          resp,
        })
      }
      catch (err) {
        this.result.push({
          ...payload,
          err,
        })
      }
      finally {
        if (this.result.length === this.list.length) {
          this.handleFetchEnd();
        }
        item.loading = false;
      }
    },
  }
};
</script>
