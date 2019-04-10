
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
            {
              rules: [
                { required: true, message: '请填写网络名称!' },
                rulesObj.name,
              ]
            }
          ]"
            placeholder="网络名称"
          />
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox checked>启用管理员状态</a-checkbox>
          <!-- <a-checkbox disabled v-decorator="[
              'admin',
              { valuePropName: 'checked', initialValue: true }
            ]">启用管理员状态</a-checkbox> -->
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox checked>创建子网</a-checkbox>
          <!-- <a-checkbox v-decorator="[
              'subnet',
              { valuePropName: 'checked', initialValue: true }
            ]">创建子网</a-checkbox> -->
        </a-form-item>
      </a-form>

      <a-form v-show="currStep === 1" :form="form1">
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="IP版本："
        >
          <a-select
            v-decorator="[
              'bootable',
              {
                initialValue: 1,
                rules: [{ required: true, message: '请选择IP版本' }]
              }
            ]"
          >
            <a-select-option :value="1">IPV4</a-select-option>
            <a-select-option :value="0">IPV6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网络地址段："
        >
          <a-input
            v-decorator="[
            'ip',
            {rules: [{ required: true, message: '请填写网络地址段!' }]}
          ]"
            placeholder="网络地址段"
          />

          <a-tooltip style="position: absolute; top: 50%; right: -5px; transform: translate(100%, -50%);">
            <template slot='title'>
              CIDR格式的网络地址 (例如 192.168.0.0/24, 2001:DB8::/48)
            </template>
            <a-icon type="info-circle"/>
          </a-tooltip>
          
        </a-form-item>

        <a-row type="flex">
          <a-col :offset="8" :span="14">
            <div style="display: block; text-align: right;">
              <a @click="showMore = !showMore">
                高级<a-icon style="margin-left: 5px;" :type="showMore ? 'up' : 'down'" />
              </a>
            </div>
          </a-col>
        </a-row>

        <template v-if="showMore">
          <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
            <a-checkbox checked>禁用网关</a-checkbox>
          </a-form-item>
          <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
            <a-checkbox checked>激活DHCP</a-checkbox>
          </a-form-item>
          <a-form-item
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            label="网关IP："
          >
            <a-input
              v-decorator="[
              'gatewayIp',
            ]"
              placeholder="网关IP"
            />
          </a-form-item>
          <a-form-item
            style="margin-top: 24px;"
            :labelCol="formItemLayout.labelCol"
            :wrapperCol="formItemLayout.wrapperCol"
            label="分配地址池："
          >
            <a-textarea
              :rows="4"
              v-decorator="[
              'subNetName',
            ]"
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
            ]"
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
            ]"
              placeholder="主机额外增加的路由，格式：目的CIDR 下一跳地址；示例：192.168.1.0/24，10.10.10.10;每行一条记录"
            />
          </a-form-item>
        </template>
      </a-form>

      <template slot="footer">
        <a-button v-if="currStep !== 0" @click="handlePrevStep">上一步</a-button>
        <a-button v-if="currStep !== 1" @click="handleNextStep">下一步</a-button>
        <a-button v-if="currStep === 1" type="primary" :loading="loading" @click="handleCreate">
          创建
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      form0: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      name: "create",
      type: "0",
      titleList: [
        { title: '新建网络', data: {} },
        { title: '配置网络网段', data: {} },
      ],
      currStep: 0,
      loading: false,

      showMore: false,
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
      this['form' + this.currStep].validateFieldsAndScroll((err, values) => {
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
