
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
                rules: [{ required: true, message: '请选择镜像格式!' }]
              }
            ]"
          >
            <a-select-option
              v-for="item in imageFormatList"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </a-select-option>
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
            v-decorator="[
              'disk',
              {
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
            v-decorator="[
              'memory',
              {
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

      initialValues: {},
    };
  },
  computed: {
    imageFormatList () {
      return this.$parent.imageFormatList;
    }
  },
  methods: {
    onShow () {
      const currRecord = this.currRecord;
      this.initialValues = {
        name: currRecord.name,
        description: currRecord.description === '无' ? '' : currRecord.description,
        imageFormat: currRecord.imageFormat,
        disk: currRecord.minDisk || 0,
        memory: currRecord.minMemory || 0,
        isPublic: currRecord.isPublic === 'isPublic',
      };
      setTimeout(() => {
        this.form.setFieldsValue(this.initialValues);
      }, 10);
    },
    diff () {
      Object.keys(this.formValues).forEach(key => {
        if (key === 'description' && this.formValues[key] === '') {
          delete this.formValues[key];
        } else if (this.formValues[key] === this.initialValues[key]) {
          delete this.formValues[key];
        }
      })
      this.handleFetch();
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.diff();
        }
      });
    },
  }
};
</script>
