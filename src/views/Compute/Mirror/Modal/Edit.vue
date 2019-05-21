
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
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请输入名称!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请填写描述"
            v-decorator="[
              'description',
              {
                initialValue: currRecord.description,
                rules: [
                  rulesObj.desc,
                ]
              }
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
              'imageFormat',
              {
                initialValue: currRecord.imageFormat,
                rules: [{ required: true, message: '请选择镜像格式!' }]
              }
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
          label="最小磁盘(G)："
        >
          <a-input-number
            :min="40"
            :max="200"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'disk',
              {
                initialValue: currRecord.capacity || 0,
                rules: [{ required: true, message: '请填写最小磁盘!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="最低内存(G)："
        >
          <a-input-number
            :min="2"
            :max="100"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'memory',
              {
                initialValue: currRecord.memory || 0,
                rules: [{ required: true, message: '请填写最低内存!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <!-- 公有[0:否 1:是] 	integer($int32) -->
          <a-checkbox
            v-decorator="[
              'isPublic',
              {
                initialValue: currRecord.isPublic,
              }
            ]"
          >公有</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import mixins from './mixins'
import { editImage as fetchAPI } from '@/api/compute/images';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins, mixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "edit",
    };
  },
  methods: {

  }
};
</script>
