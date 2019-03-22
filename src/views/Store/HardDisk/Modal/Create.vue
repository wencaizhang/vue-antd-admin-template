<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :bodyStyle="bodyStyle"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建硬盘"
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
          label="数量："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            v-decorator="[
              'num',
              {
                rules: [{ required: true, message: '请输入数量' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="硬盘来源："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            @select="handleSelect"
            v-decorator="[
              'source',
              {
                rules: [{ required: true, message: '请选择硬盘来源' }]}
            ]"
          >
            <a-select-option
              v-for="item in sourceOptions"
              :key="item.id"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="source && source != 0"
          :label="formItemData.label"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <!-- 此 item 根据硬盘来源进行变化 -->
          <a-select
            v-decorator="[
              formItemData.id,
              {
                initialValue: formItemData.option[0]
              }
            ]"
          >
            <a-select-option v-for="item in formItemData.option" :key="item" :value="item">{{item}}</a-select-option>
          </a-select>
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
            <a-radio value="普通">普通</a-radio>
            <a-radio value="SSD">SSD</a-radio>
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
        <a-col :span="12" :offset="8">配置费用： ￥10.00</a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "create",
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
