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
                rules: [{ message: '请输入描述' }]}
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
              'disk',
              {
                initialValue: 'web1',
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
              'type',
              {
                rules: [{ required: true, message: '请选择类型' }]}
            ]"
          >
            <a-radio value="HHD">HHD</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="容量："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'size',
              {
                initialValue: '1',
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
              'time',
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
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "cloneDisk",
      source: "",
      sourceOptions: [
        {
          value: 0,
          text: "空白硬盘",
          id: "blank",
          option: ["web1-2018.10.11", "web1-2012.13.11"]
        },
        {
          value: 1,
          text: "快照",
          id: "snapshoot",
          option: ["web1-2018.10.11", "web1-2012.13.11"]
        },
        {
          value: 2,
          text: "备份",
          id: "backup",
          option: ["db3-2018.11.10", "db3-2018.11.11"]
        },
        {
          value: 3,
          text: "硬盘",
          id: "disk",
          option: ["db3", "web1", "centos7.4"]
        },
        {
          value: 4,
          text: "镜像",
          id: "mirror",
          option: [
            "ubunt14.04",
            "ubunt16.04",
            "ubunt18.04",
            "centos6.8",
            "centos7.5"
          ]
        }
      ]
    };
  },
  computed: {
    formItemData() {
      const key = Number.parseInt(this.source);
      const item = this.sourceOptions[key];
      const data = {
        id: item.id,
        validateStatus: "success",
        help: `请选择${item.text}`,
        label: `选择${item.text}`,
        option: item.option
      };
      return data;
    }
  },
  methods: {
    handleSelect(v) {
      this.source = v;
    }
  }
};
</script>
