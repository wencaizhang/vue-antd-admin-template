
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
        <a-spin :spinning="loading">
          <a-input-search
            placeholder=" "
            @search="handleSearch"
            style="width: 200px"
            enterButton
          />
          <br>
          <a-radio-group v-model="formValues.instanceId">
            <a-radio
              v-for="item in instanceList"
              :style="radioStyle"
              :value="item.id"
              :key="item.id"
            >{{ item.name }}</a-radio>
          </a-radio-group>
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
  width: 200px;
  text-align: left;
  margin: 20px auto;
}
</style>
