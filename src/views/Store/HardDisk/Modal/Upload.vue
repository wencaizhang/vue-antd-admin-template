
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="上传硬盘到镜像"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="硬盘名称">
          <a-input
            :disabled="true"
            v-decorator="[
              'hardDiskName',
              {
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请输入硬盘名称' }]
              }
            ]"
            placeholder="请输入硬盘名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="镜像名称">
          <a-input
            placeholder="请输入镜像名称"
            v-decorator="[
              'imageName',
              {
                rules: [
                  { required: true, message: '请输入镜像名称' },
                  rulesObj.name,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="磁盘格式"
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 14 }"
        >
          <a-select
            v-decorator="[
              'diskFormatName',
              {
                rules: [
                  { required: true, message: '请选择磁盘格式' },
                ]
              }
            ]"
          >
            <a-select-option v-for="item in imageFormatList" :key="item.id" :value="item.id">{{ item.desc }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import rulesObj from '@/utils/rules'
import { uploadDisk as fetchAPI } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "upload",

      imageFormatList: [
        { id: 'qcow2', desc: 'QCOW2 - QEMU模拟器' },
        { id: 'raw', desc: '原始' },
        { id: 'vdi', desc: 'VDI - VirtualBox虚拟磁盘镜像' },
        // { id: 'vhd', desc: 'VHD - Vmware虚拟硬盘' },
        // { id: 'vhdx', desc: 'VHDX - 大型虚拟硬盘' },
        { id: 'vmdk', desc: 'VMDK - Vmware虚拟磁盘' },
      ],
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
  }
};
</script>
