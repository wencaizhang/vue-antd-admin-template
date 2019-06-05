
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
        message="注意：如果需要在 linux 系统开机时自动挂载硬盘，请不要在 /etc/fstab 文件指定 /dev/vd** 的写法，因为有几率出现硬盘设备顺序编码变化，推荐使用命令 blkid 分区获取 UUID 来挂载硬盘分区。"
        type="warning"
        showIcon
      />
      <div class="container">
        <span>请选择一个主机：</span>
        <a-spin :spinning="loading">
          <a-select defaultValue="lucy" style="width: 200px;" v-model="formValues.instanceId">
            <a-select-option
              v-for="item in instanceList"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-spin>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { mountDisk as fetchAPI  } from "@/api/store/disk";
import { getinstanceList  } from "@/api/compute/instance";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "mount",
      loading: false,
      formValues: {
        hardDiskId: "",
        instanceId: "",
      },
      instanceList: [],
    };
  },
  methods: {
    async fetchInstance () {
      this.loading = true;
      try {
        const resp = await getinstanceList();
        this.instanceList = resp.data;
        this.loading = false;
      } catch (error) {

      }
    },
    initFormValues () {
      this.formValues = { hardDiskId: "", hardDiskId: this.currRecord.id };
    },
    onShow () {
      this.fetchInstance();
      this.initFormValues();
    },
    handleSearch () {

    },
  }
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
}
</style>
