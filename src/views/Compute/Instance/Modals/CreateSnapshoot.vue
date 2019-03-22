
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建快照"
      okText="提交"
    >
      <a-alert
        message="说明：快照是保存了运行中云主机的磁盘状态的镜像。"
        type="info"
        style="margin-bottom: 10px;"
        showIcon
      />
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="快照名称：">
          <a-input
            v-decorator="[
              'snapshootName',
              {
                rules: [{ required: true, message: '请输入快照名称' }]
              }
            ]"
            placeholder="请输入快照名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { createSnapshoot as fetchAPI } from "@/api/compute/instance";
import mixins from './mixins'
export default {
  mixins: [baseModalMixins, formModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "createSnapshoot",
      isRefreshParentTable: false,
    };
  },

  methods: {}
};
</script>
