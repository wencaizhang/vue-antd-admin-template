
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="挂载硬盘到主机"
      okText="提交"
    >
      <a-alert
        message="注意：如果需要在linux系统开机时自动挂载硬盘，请不要在/etc/fstab文件指定/dev/vd**的写法，因为有几率出现硬盘设备顺序编码变化，推荐使用命令blkid 分区获取UUID来挂载硬盘分区。"
        type="warning"
        showIcon
      />
      <div class="container">
        <a-input-search
          placeholder=" "
          @search="getSearchData"
          style="width: 200px"
          enterButton
        />
        <br>
        <a-radio-group @change="onChange" v-model="value">
          <a-radio :style="radioStyle" :value="1">Option A</a-radio>
          <a-radio :style="radioStyle" :value="2">Option B</a-radio>
          <a-radio :style="radioStyle" :value="3">Option C</a-radio>
        </a-radio-group>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "mount",
      value: ""
    };
  },
  methods: {
    onChange() {},
    getSearchData() {},
    handleCreate() {
      this.handleCancel();
    }
  }
};
</script>
<style scoped>
.container {
  width: 200px;
  text-align: left;
  margin: 20px auto;
}
</style>
