
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
                initialValue: type,
                rules: [{ required: true, message: '请选择类型' }]
              }
            ]"
          >
            <a-radio :value="0">覆盖原硬盘{{ currRecord.volumeName }}</a-radio>
            <a-radio :value="1">创建新硬盘</a-radio>
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
                'volumeType',
                {
                  initialValue: currRecord.volumeType,
                  rules: [{ required: true, message: '请选择硬盘类型' }]
                }
              ]"
            >
              <a-radio v-if="currRecord.volumeType === 'hdd'" value="hdd">普通</a-radio>
              <a-radio v-if="currRecord.volumeType === 'ssd'" value="ssd">SSD</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="容量："
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
          >
            <a-input-number
              :min="Number.parseInt(currRecord.capacity)"
              v-decorator="[
              'capacity',
              {
                initialValue: Number.parseInt(currRecord.capacity),
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
              <a-select-option :value="1">1个月</a-select-option>
              <a-select-option :value="2">2个月</a-select-option>
              <a-select-option :value="3">3个月</a-select-option>
              <a-select-option :value="6">半年</a-select-option>
              <a-select-option :value="12">1年</a-select-option>
              <a-select-option :value="24">2年</a-select-option>
              <a-select-option :value="36">3年</a-select-option>
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
import { restoreBackup, createDisk, getDiskStatus } from "@/api/store/disk";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "recover",
      type: 0,
    };
  },

  methods: {
    initFormValues () {
      this.formValues = { backupId: this.currRecord.id, configCost: 5 }
      this.type = 0
    },
    onChange(e) {
      this.type = e.target.value;
    },
    onShow () {
      this.initFormValues();
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.confirmLoading = true;
          if (values.type === 1) {
            self.createEmptyDisk()
          } else {
            // 覆盖原硬盘
            const payload = {
              backupId: this.currRecord.id,
              type: 0,
            };
            self.coverDisk(payload)
          }
        }
      });
    },

    async createEmptyDisk () {
      try {
        const payload = Object.assign({}, this.formValues, {
          name: this.currRecord.name,
          number: 1,
        })
        const resp = await createDisk(payload);
        this.traceDiskStatus(resp);
      } catch (error) {

      }
    },
    async traceDiskStatus (currItem) {
      try {
        const resp = await getDiskStatus(currItem.id);
        const currStatus = resp.status;
        if (currStatus.includes('ing')) {
          this.traceDiskStatus(currItem);
        } else {
          // 将数据覆盖到新建硬盘上
          const payload = {
            backupId: this.currRecord.id,
            volumeId: currItem.id,
          };
          this.coverDisk(payload);
        }
      } catch (error) {

      }
    },
    async coverDisk (payload) {
      try {
        const resp = await restoreBackup(payload);
        this.openNotification(resp);
        this.confirmLoading = false;
        this.handleCancel();
      } catch (error) {

      }
    }
  },
};
</script>
