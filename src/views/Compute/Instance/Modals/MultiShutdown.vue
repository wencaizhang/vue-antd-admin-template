
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="关闭云主机"
      okText="关机"
      okType="danger"
    >
      <p v-if="some">即将关闭下列云主机，请确认你的操作。</p>
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
          <a-button @click="handleCreate" :loading="confirmLoading" type="danger">关机</a-button>
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
import { shutdown as fetchAPI } from '@/api/compute/instance';
import mixins from './mixins'
import multiMixins from './multiMixins'

export default {
  mixins: [baseModalMixins, mixins, multiMixins],
  data() {
    return {
      fetchAPI,
      name: "shutdown",
    };
  },
  methods: {

  }
};
</script>

<style scoped>
@import './multiStyle.css';
</style>
