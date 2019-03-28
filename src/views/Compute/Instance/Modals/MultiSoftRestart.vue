
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="软重启云主机"
      okText="软重启"
      okType="danger"
    >
      <p>即将软重启下列云主机，请确认你的操作。</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id.substr(0,8) }}</td>
          <td>{{ item.name }}</td>
          <td >
            <span :class="{ 'status-disabled': item.taskState }">{{ item.status_zh }}</span>
            <a-icon v-show="item.taskState" type="loading-3-quarters" style="font-size: 12px; margin-left: 5px; color: #1890ff;" spin />
          </td>
        </tr>
        </tbody>
      </table>

      <template slot="footer">
        <template v-if="!showMyFooter">
          <a-button @click="handleCancel">取消</a-button>
          <a-button @click="handleCreate" :loading="confirmLoading" type="danger">软重启</a-button>
        </template>
        <template v-else>
          <a-button @click="handleCancel">确定</a-button>
        </template>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { softreboot as fetchAPI } from '@/api/compute/instance';
import mixins from './mixins'
export default {
  mixins: [baseModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "softRestart",
      showMyFooter: false,
      list: [],
      listLength: 0,
      isRefreshParentTable: false, 
    };
  },

  // filters: {
  //   desc (item) {
  //     const obj = {
  //       // 空字符：未启动
  //       pending: "发送请求中",
  //       fulfilled: "接受请求",
  //       rejected: "拒绝请求",
  //     }
  //     return obj[ item.status ] || '';
  //   }
  // },
  methods: {
    onShow () {
      this.showMyFooter = false;
      this.confirmLoading = false;
      const selectedList = this.$parent.data.filter(item => {
        return this.$parent.selectedRowKeys.includes(item.id)
      })
      this.list = selectedList;
      // this.list = selectedList.map(item => {
      //   return {
      //     ...item,
      //     status: '',
      //     /**
      //      * status 表示软重启的状态（参考 Promise 的三种状态），有四个值
      //      * 空字符：未软重启
      //      * pending: 软重启中
      //      * fulfilled: 软重启成功
      //      * rejected: 软重启失败
      //      */
      //   }
      // });
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
      // this.handleCancel();
    },
    async handleDelete (item) {
      try {
        // item.status = 'pending';
        const payload = { instanceId: item.id }
        const resp = await this.fetchAPI(payload);
        // item.status = 'fulfilled';
      }
      catch (err) {
        // item.status = 'rejected';
      }
      finally {
        this.$parent.handleTraceStatus(item.id)
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
  margin-bottom: 10px;
  text-align: center;
}
table {
  margin: 0 auto;
  width: 100%;
}
table td, table th {
  padding: 5px 10px;
  border: 1px solid #f2f2f2;
}
.status-disabled {
  user-select: none;
  color: #BBB;
}
</style>
