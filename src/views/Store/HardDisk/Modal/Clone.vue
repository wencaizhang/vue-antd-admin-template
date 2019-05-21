<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :bodyStyle="bodyStyle"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="克隆硬盘"
      okText="保存"
    >
      <a-form :form="form">
        <a-form-item
          label="名称"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入名称' }]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                rules: [
                  rulesObj.desc,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="硬盘："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            :disabled="true"
            v-decorator="[
              'hardDiskName',
              {
                initialValue: currRecord.name,
                rules: [{ required: true, message: '请选择硬盘来源' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="类型："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-radio-group
            v-decorator="[
              'hardDiskType',
              {
                initialValue: currRecord.type,
                rules: [{ required: true, message: '请选择类型' }]
              }
            ]"
          >
            <a-radio :value="currRecord.type">{{ currRecord.type }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="容量："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="currRecord.capacity"
            v-decorator="[
              'capacity',
              {
                initialValue: currRecord.capacity,
                rules: [{ required: true, message: '请输入容量' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="购买时长："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'buyLenght',
              {
                rules: [{ required: true, message: '请选择购买时长' }]}
            ]"
          >
            <a-select-option value="1">1个月</a-select-option>
            <a-select-option value="2">2个月</a-select-option>
            <a-select-option value="3">3个月</a-select-option>
            <a-select-option value="6">半年</a-select-option>
            <a-select-option value="12">1年</a-select-option>
            <a-select-option value="24">2年</a-select-option>
            <a-select-option value="36">3年</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-row>
        <a-col :span="12" :offset="8">配置费用： ￥5.00</a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
import { cloneDisk as fetchAPI  } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "cloneDisk",
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id, configCost: 5 }
    },
  }
};
</script>
