
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="绑定IP"
      okText="绑定"
    >
      <a-alert
        message="说明：快照是保存了运行中云主机的磁盘状态的镜像。"
        type="info"
        style="margin-bottom: 10px;"
        showIcon
      />
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="IP地址">
          <a-spin :spinning="$parent.isFetchIpList">
            <a-select
              class="container-----"
              placeholder="请选择一个IP地址"
              v-decorator="[
                'id',
                {
                  initialValue: currRecord.ipAddress && currRecord.ipAddress.replace('无', ''),
                  rules: [{ required: true, message: '请选择IP地址！' }]
                }
              ]"
            >
              <a-select-option
                v-for="item in ipList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.ipAddress }}
              </a-select-option>
              <a-icon
                slot="suffixIcon"
                class="addonAfter"
                title="分配公网IP"
                type="plus-circle"
                @click.stop="$emit('allotIP')"
              />
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="待绑定的IP接口">
          <a-select
            placeholder="请选择一个接口"
            v-decorator="[
              'portIp',
              {
                rules: [{ required: true, message: '请选择一个接口！' }]
              }
            ]"
          >
            <a-select-option
              v-for="item in (currRecord.network || [])"
              :key="item"
              :value="item"
            >
              {{ currRecord.name }}:{{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { bindIP as fetchAPI } from "@/api/network/ip";

export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "bindIP",
      // isRefreshParentTable: false, // 刷新父组件表格
    };
  },
  computed: {
    ipList () {
      return this.$parent.ipList.filter(item => !item.mappedStaticIp) || [];
    }
  },
  methods: {
    onShow () {
      this.$parent.fetchIPList();
    },

    // openNotification (resp) {
    //   this.$message.success('绑定成功，请手动刷新');
    // }
  }
};
</script>
<style>
.container----- {
  position: relative;
}
.container----- .addonAfter {
  position: absolute;
  top: 0;
  right: -35px;
  font-size: 16px;
  cursor: pointer;
}
</style>
