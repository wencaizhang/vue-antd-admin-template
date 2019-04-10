
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="清除网关"
      okText="清除"
      okType="danger"
    >
      <p>
        你已选择 {{ currRecord.name }} 。
        清除网关后将无法联通公网. 请确认您的选择。你可以通过使用网关配置动作稍后重置网关，但网关IP可能改变。
      </p>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { setGateway as fetchAPI } from "@/api/network/router";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "clearGateway",
      list: [],
    };
  },

  methods: {
    onShow () {
      // 操作类型[0:设置 1:清除]
      this.formValues = { type: 1 };
      // const { data, selectedRowKeys } = this.$parent;
      // this.list = data.filter(item => {
      //   return selectedRowKeys.includes(item.id);
      // })
    },
    // handleCreate() {
    //   this.handleCancel();
    // }
  },
};
</script>

<style scoped>
p {
  margin-top: 10px; text-align: center;
}
</style>
