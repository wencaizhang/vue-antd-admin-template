
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="启动云主机"
      okText="启动"
      okType="danger"
    >
      <p v-if="!every">
        即将启动下列云主机，请确认你的操作。
      </p>
      <p v-if="some && !every" style="color: #ccc;">
        （下列云主机中有一部分已经处于运行状态，将不对其进行任何操作）
      </p>
      <p v-if="every" style="color: #ccc;" >（下列云主机全部处于运行状态，无需再次启动）</p>

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
            <a-icon v-show="item.status === 'pending' " type="loading" />
            {{ item | desc }}
          </td>
        </tr>
        </tbody>
      </table>

      <template slot="footer">
        <template v-if="every">
          <a-button @click="handleCancel">确定</a-button>
        </template>
        <template v-else-if="!showMyFooter">
          <a-button @click="handleCancel">取消</a-button>
          <a-button @click="handleCreate" :loading="confirmLoading" type="primary">启动</a-button>
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
import { startInstance as fetchAPI } from '@/api/compute/instance';
import mixins from './mixins'

const STATUS = 'ACTIVE';
export default {
  mixins: [baseModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "launch",
      showMyFooter: false,
      list: [],
      listLength: 0,
      some: false,
      every: false,

      isRefreshParentTable: false, 
    };
  },

  filters: {
    desc (item) {
      const obj = {
        // 空字符：未启动
        pending: "发送请求中",
        fulfilled: "接受请求",
        rejected: "拒绝请求",
      }
      return item.status === STATUS ? STATUS : obj[ item.status ] || '';
    }
  },
  methods: {
    onShow () {
      this.showMyFooter = false;
      this.confirmLoading = false;
      const selectedList = this.$parent.data.filter(item => {
        return this.$parent.selectedRowKeys.includes(item.id)
      })

      this.some = selectedList.some(item => item.status === STATUS);
      this.every = selectedList.every(item => item.status === STATUS);

      /**
       * status 表示启动的状态（参考 Promise 的三种状态），有四个值
       * 空字符：未启动
       * pending: 启动中
       * fulfilled: 启动成功
       * rejected: 启动失败
       */
      this.list = selectedList.map(item => {
        return {
          ...item,
          status: item.status === STATUS ? STATUS : '',
        }
      });
      this.listLength = selectedList.filter(item => item.status !== STATUS).length;
    },
    handleFetch() {
      /**
       * 遍历发送请求
       * Promise.all 只要有一个失败就直接返回失败的结果，所以使用遍历
       */
      if (!this.list.length || this.every) { return;}
      this.confirmLoading = true;
      this.list.forEach(item => {
        item.status !== STATUS && this.handleDelete(item);
      })
    },
    handleFetchEnd () {
      // 所有请求全部结束
      this.confirmLoading = false;
      this.showMyFooter = true;
      this.$message.success('操作完成');
      this.handleCancel();
    },
    async handleDelete (item) {
      try {
        item.status = 'pending';
        const payload = { instanceId: item.id }
        const resp = await this.fetchAPI(payload);
        item.status = 'fulfilled';
      }
      catch (err) {
        item.status = 'rejected';
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
</style>
