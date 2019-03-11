
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="titleList[currStep].title"
      okText="确定"
    >
      <a-form v-show="currStep === 0" :form="form0">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网络名称："
        >
          <a-input
            v-decorator="[
            'hostName',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'admin',
            ]">启用管理员状态</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'share',
            ]">是否共享</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'subnet',
            ]">创建子网</a-checkbox>
        </a-form-item>
      </a-form>

      <a-form v-show="currStep === 1" :form="form1">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="子网名称："
        >
          <a-input
            v-decorator="[
            'subNetName',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网络地址段："
        >
          <a-input
            v-decorator="[
            'ip',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="IP版本："
        >
          <a-input
            v-decorator="[
            'ip',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网关IP："
        >
          <a-input
            v-decorator="[
            'gatewayIp',
            {rules: [{ required: true, message: '请填写网关IP!' }]}
          ]"
            style="width: 250px"
            placeholder="网关IP"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'disableGateway',
            ]">禁用网关</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'activeDHCP',
            ]">激活DHCP</a-checkbox>
        </a-form-item>
      </a-form>

      <a-form v-show="currStep === 2" :form="form2">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="分配地址池："
        >
          <a-textarea
            :rows="4"
            v-decorator="[
            'subNetName',
            {rules: [{ required: true, message: '请填写地址池!' }]}
          ]"
            style="width: 250px"
            placeholder="示例：192.168.100.1，192.168.100.10；每行一条记录"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="DNS服务器："
        >
          <a-textarea
            :rows="4"
            v-decorator="[
            'DNS',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="示例：114.114.114.114，每行一个地址"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="主机路由："
        >
          <a-textarea
            :rows="4"
            v-decorator="[
            'router',
            {rules: [{ required: true, message: '请填写网络名称!' }]}
          ]"
            style="width: 250px"
            placeholder="主机额外增加的路由，格式：目的CIDR 下一跳地址；示例：192.168.1.0/24，10.10.10.10;每行一条记录"
          />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button v-if="currStep !== 0" @click="handlePrevStep">上一步</a-button>
        <a-button v-if="currStep !== 2" @click="handleNextStep">下一步</a-button>
        <a-button v-if="currStep === 2" type="primary" :loading="loading" @click="handleCreate">
          创建
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      form0: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      name: "create",
      type: "0",
      titleList: [
        { title: '新建网络', data: {} },
        { title: '配置子网', data: {} },
        { title: '配置子网扩展属性', data: {} }
      ],
      currStep: 0,
      loading: false,
    };
  },

  methods: {
    onChange(e) {
      this.type = e.target.value;
    },

    handlePrevStep () {
      if (this.currStep > 0) {
        this.currStep--
      }
    },
    handleNextStep () {
      const result = this._handleValidate();
      if (result && this.currStep < this.titleList.length) {
        this.currStep++
      }
    },
    handleCreate () {
      this._handleValidate();
    },
    _handleValidate () {
      var result
      this['form' + this.currStep].validateFields((err, values) => {
        if (err) {
          result = false;
        } else {
          console.log("Received values of form: ", values);
          Object.assign(this.titleList[this.currStep].data, values);
          result = true;
        }
      });
      return result;
    },
  }
};
</script>
