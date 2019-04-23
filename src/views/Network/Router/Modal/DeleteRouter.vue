<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除路由器"
      okText="删除"
      okType="danger"
    >

      <template v-if="Array.isArray(currRecord.internal) && currRecord.internal.length">
        <p>该路由器下有关联的网络,请先执行"删除网络接口"操作,再执行删除路由器的操作</p>
        <template slot="footer">
          <a-button @click="handleCancel">取消</a-button>
        </template>
      </template>
      <template v-else>
        <a-alert message="注意：删除路由器后数据不可恢复！" type="warning" showIcon/>
        <p>你已经选择了路由"{{ currRecord.name }}",即将删除该路由,请确认你的操作.</p>
      </template>
      
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { deleteRouter as fetchAPI } from "@/api/network/router";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "deleteRouter",
    };
  },

  methods: {
    onShow () {
      this.formValues = { routerId: this.currRecord.id }
    },
  }
};
</script>

<style scoped>
p {
  margin-top: 10px; text-align: center;
}
</style>
