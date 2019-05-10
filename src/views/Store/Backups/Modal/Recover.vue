
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="恢复备份"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item
          label="类型："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-radio-group
            @change="onChange"
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择类型' }]
              }
            ]"
          >
            <a-radio value="0">覆盖原硬盘web1</a-radio>
            <a-radio value="1">创建新硬盘</a-radio>
          </a-radio-group>
        </a-form-item>
        <template v-if="type == 1">
          <a-form-item
            label="硬盘类型："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-radio-group
              v-decorator="[
                'type',
                {
                  initialValue: '普通',
                  rules: [{ required: true, message: '请选择硬盘类型' }]
                }
              ]"
            >
              <a-radio value="普通">普通</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="容量："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="20"
              v-decorator="[
              'capacity',
              {
                rules: [{ required: true, message: '请输入容量' }]}
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
              'buyLength',
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
        </template>
      </a-form>
      <a-row>
        <a-col :span="12" :offset="8">配置费用： ￥10.00</a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { restoreBackup as fetchAPI } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "recover",
      type: "0"
    };
  },

  methods: {
    onChange(e) {
      this.type = e.target.value;
    },
    onShow () {
      this.formValues = { backupId: this.currRecord.id, configCost: 5 }
    },
  },
};
</script>
