
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除网络接口"
      okText="删除"
      okType="danger"
    >

      <template v-if="currRecord.internal === '无'">
        <p>该路由尚未关联网络接口</p>
      </template>
      <template v-else>
        <a-alert message="说明:删除网络接口就是把用户私有网络的网关地址从路由器接口上删除." type="warning" showIcon />
        <a-table
          :columns="columns"
          :dataSource="currRecord.internal"
          :pagination="pagination"
          :rowKey="record => record.id"
          :rowSelection="{hideDefaultSelections: true,type: 'radio',selectedRowKeys: selectedRowKeys,onChange: onSelect}"
        >
        </a-table>
      </template>

    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { detach as fetchAPI } from "@/api/network/router";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "detach",

      pagination: false,
      columns:[{
        title: '接口名称',
        dataIndex: 'name',
      }, {
        title: '接口地址',
        dataIndex: 'cidr',
      }],
      selectedRowKeys: [],
    };
  },

  methods: {
    onShow () {
      this.selectedRowKeys = [];
      this.formValues = {
        routerId: this.currRecord.id,
      };
    },
    onSelect (data) {
      this.selectedRowKeys = data;
      this.formValues = Object.assign({}, this.formValues, {
        subnetId: data[0]
      })
    }
  },
};
</script>

<style scoped>
.content {
  display: table;
  margin: 20px auto 0;
}
p {
  display: table-row;
}
p span {
  display: table-cell;
}
</style>
