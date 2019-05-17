<template>
  <a-modal
    class="detail-modal"
    @cancel="handleCancel"
    @ok="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading"
    title="快照详情"
    okText="确定"
  >
    <ul v-if="show">
      <li v-for="item in columns" :key="item.title">
        <span>{{ item.title }}</span>
        <span>{{ currRecord[ item.dataIndex ] || '无'}}</span>
      </li>
    </ul>

    <template slot="footer">
      <a-button type="primary" @click="handleCancel">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";

export default {
  mixins: [baseModalMixins],
  data() {
    const columns = [
      {
        title: "名称",
        dataIndex: "name"
      },
      {
        title: "描述",
        dataIndex: "description"
      },

      {
        title: "容量(G)",
        dataIndex: "capacity"
      },
      {
        title: "状态",
        dataIndex: "status_zh"
      },
      {
        title: "卷名称",
        dataIndex: "volumeName"
      },
      {
        title: "创建于",
        dataIndex: "createDate"
      }
    ];
    return {
      name: "detail",
      columns,
      show: false
    };
  },
  methods: {
    onShow() {
      console.log(this.currRecord);
      this.show = true;
    }
  }
};
</script>

<style scoped>
.detail-modal .ant-modal-footer .ant-btn-default {
  /* 隐藏取消按钮 */
  display: none;
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
