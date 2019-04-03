
<template>
  <div>
    <a-modal
      :visible="visible"
      @cancel="handleCancel"
      title="删除密钥对"
    >
      <p
        style="margin-top: 10px; text-align: center;"
      >即将删除下列密钥对，请确认你的操作。</p>
      <p>删除前请确认你已经备份该秘钥，或者确定已不再使用该秘钥。</p>
      <ul>
        <li v-for="item in list" :key="item.id">
          <span>{{ item.id }}</span>
          <span >
            <a-icon v-show="item.status === 'pending' " type="loading" />
            {{ item | desc }}
          </span>
        </li>
      </ul>
      <template slot="footer">
        <template v-if="!showMyFooter">
          <a-button @click="handleCancel">取消</a-button>
          <a-button @click="handleCreate" :loading="confirmLoading" type="danger">删除</a-button>
        </template>
        <template v-else>
          <a-button @click="handleClose">确定</a-button>
        </template>
      </template>

    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { deleteKeyPair as fetchAPI } from '@/api/compute/keypair';
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "batchDeleta",
      showMyFooter: false,
      list: [],
      listLength: 0,
    };
  },
  filters: {
    desc (item) {
      const obj = {
        // 空字符：未删除
        pending: "删除中",
        fulfilled: "已删除",
        rejected: "删除失败",
      }
      return obj[ item.status ] || '';
    }
  },
  methods: {
    onShow () {
      this.showMyFooter = false;
      this.list = this.$parent.selectedRowKeys.map(item => {
        return {
          id: item,
          status: '',
          /**
           * status 表示删除的状态（参考 Promise 的三种状态），有四个值
           * 空字符：未删除
           * pending: 删除中
           * fulfilled: 删除成功
           * rejected: 删除失败
           */
        }
      });
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
      this.showMyFooter = true;
      this.$message.success('操作完成');
    },
    async handleDelete (item) {
      try {
        item.status = 'pending';
        const payload = {secretKeyId: item.id}
        const resp = await this.fetchAPI(payload);
        item.status = 'fulfilled';
      }
      catch (err) {
        item.status = 'rejected';
      }
      finally {
        this.listLength = this.listLength - 1;
        if (this.listLength === 0) {
          this.handleFetchEnd();
        }
      }
    },
    handleClose () {
      this.handleCancel();
      this.handleRefreshParentTable();
    }
  }
};
</script>

<style scoped>

li {
  display: table-row;
}
li span {
  display: table-cell;
  padding-right: 20px;
  padding-bottom: 16px;
}
</style>
