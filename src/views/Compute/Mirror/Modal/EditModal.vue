
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑镜像"
      okText="保存编辑"
    >
      <a-form :form="form">
        <a-form-item
          label="名称："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入名称!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            v-decorator="[
              'desc',
              {
                rules: [{ required: true, message: '请填写描述!' }]}
            ]"
          />
        </a-form-item>

        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像格式："
        >
          <a-select
            placeholder="选择镜像格式"
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择镜像格式!' }]}
            ]"
          >
            <a-select-option value="QCOW2-QEMU">QCOW2-QEMU</a-select-option>
            <a-select-option value="Docker">Docker</a-select-option>
            <a-select-option value="ISO-光盘镜像">ISO-光盘镜像</a-select-option>
            <a-select-option value="Raw">Raw</a-select-option>
            <a-select-option value="VMDK-Vmware虚拟磁盘">VMDK-Vmware虚拟磁盘</a-select-option>
            <a-select-option value="VHD-Vmware虚拟硬盘">VHD-Vmware虚拟硬盘</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="最小磁盘(GB)："
        >
          <a-input-number
            :min="40"
            :max="200"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'minDisk',
              {
                rules: [{ required: true, message: '请填写最小磁盘!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="最低内存(GB)："
        >
          <a-input-number
            :min="2"
            :max="100"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'minMemory',
              {
                rules: [{ required: true, message: '请填写最低内存!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'public',
            ]">公有</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [formModalMixins],
  data() {
    return {
      name: "edit",
      obj: {
        名称: "aaa1231313aaa",
        描述: "bbbb",
        minMomery: "22",
        minDisk: "42",
        镜像格式: "Yiminghe"
      }
    };
  }
};
</script>