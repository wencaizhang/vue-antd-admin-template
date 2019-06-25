
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="编辑硬盘"
      okText="提交"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="名称">
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: currRecord.name,
                rules: [
                  { required: true, message: '请输入名称' },
                  rulesObj.editdName,
                ]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="描述">
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                initialValue: currRecord.description && currRecord.description.replace(/^无$/, ''),
                rules: [
                  rulesObj.desc,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox
            v-decorator="[
              'bootable',
              {
                initialValue: currRecord.bootable,
                valuePropName: 'checked',
              }
            ]"
          >
            可启动
            <a-tooltip>
              <template slot="title">“可启动”标记标明此硬盘可以被用来创建主机。</template>
              <a-icon type="info-circle" />
            </a-tooltip>
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import rulesObj from '@/utils/rules'
import { editDisk as fetchAPI  } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      rulesObj,
      name: "edit"
    };
  },

  methods: {
    onShow () {
      this.formValues = { hardDiskId: this.currRecord.id }
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Object.assign(self.formValues, values);
          self.handleFetch();
        }
      });
    },
  }
};
</script>
