<template>
  <a-modal
    class="detail-modal"
    @cancel="handleCancel"
    @ok="handleCancel"
    :visible="visible"
    :confirmLoading="confirmLoading"
    title="基本属性"
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
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "默认信息",
        dataIndex: "",
      },
      {
        title: "状态",
        dataIndex: "status_zh",
      },
      {
        title: "系统盘",
        dataIndex: "",
      },
      {
        title: "使用属性",
        dataIndex: "",
      },
      {
        title: "平台",
        dataIndex: "platform",
      },
      {
        title: "持性支持",
        dataIndex: "",
      }
    ];
    return {
      name: "detail",
      columns,
      show: false,
    };
  },
  methods: {
    onShow () {
      console.log(this.currRecord)
      this.show = true;
    }
  }
};
</script>

<style scoped>
.detail-modal .ant-modal-footer .ant-btn-default{
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
