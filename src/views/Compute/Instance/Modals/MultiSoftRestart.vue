
<template>
  <div class="modal">
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="软重启云主机"
      okText="软重启"
      okType="danger"
    >
      <p v-if="some">即将软重启下列云主机，请确认你的操作。</p>
      <p >本操作只对
        <span class="blue">{{ availableStatus.map(s=>$parent.__handleTransformToZh(s)).join('、') }}</span>
        状态的云主机有效</p>
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
            <span class="blue" :class="{ 'status-disabled': item.taskState }">{{ item.status_zh }}</span>
            <a-icon v-show="item.taskState" type="loading-3-quarters" style="font-size: 12px; margin-left: 5px; color: #1890ff;" spin />
          </td>
        </tr>
        </tbody>
      </table>

      <template slot="footer">
        <template v-if="handleItemCount">
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
import multiMixins from './multiMixins'

export default {
  mixins: [baseModalMixins, mixins, multiMixins],
  data() {
    return {
      fetchAPI,
      name: "softRestart",
    };
  },
  methods: {
    
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
.fb {
  font-weight: bold;
}
.blue {
  color: #1890ff;
}
</style>
