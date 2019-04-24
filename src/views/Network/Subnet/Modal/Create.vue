
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      v-if="visible"
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
            'networkName',
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
              'ipVersion',
              {
                initialValue: 'IPv4',
                rules: [{ required: true, message: '请选择IP版本' }]
              }
            ]"
          >
            <a-select-option value="IPv4">IPv4</a-select-option>
            <a-select-option value="IPv6">IPv6</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="网络地址段："
        >
          <a-input
            v-decorator="[
              'segmentNetwork',
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
            <!-- <a-checkbox checked>禁用网关</a-checkbox> -->
            <a-checkbox @change="onChangeDisableGateway" v-decorator="[
                'isDisableGateway',
              ]">禁用网关</a-checkbox>
          </a-form-item>
          <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
            <a-checkbox checked>激活DHCP</a-checkbox>
          </a-form-item>

          <a-form-item
            v-if="!formValues.isDisableGateway"
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
                'addressPool',
              ]"
              placeholder="示例：192.168.100.1，192.168.100.10；每行一条记录，使用逗号分割。"
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
                'dnsServer',
              ]"
              placeholder="示例：114.114.114.114，每行一个地址，使用逗号分割。"
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
                'hostRouter',
              ]"
              placeholder="主机额外增加的路由，格式：目的CIDR 下一跳地址；示例：192.168.1.0/24，10.10.10.10； 每行一条记录，使用逗号分割。"
            />
          </a-form-item>
        </template>
      </a-form>

      <template slot="footer">
        <a-button v-if="currStep !== 0" @click="handlePrevStep">上一步</a-button>
        <a-button v-if="currStep !== 1" @click="handleNextStep">下一步</a-button>
        <a-button v-if="currStep === 1" type="primary" :loading="confirmLoading" @click="handleNextStep">
          创建
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rulesObj } from '@/utils/util';
import { createNetwork as fetchAPI } from '@/api/network/network';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
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


      formValues: {
        // 启用管理员状态[0:否 1:是]
        isEnableAdministrator: 1,
        // 创建子网[0:否 1:是]
        isCreateSubnetwork: 1,
        // 禁用网关[0:否 1:是]
        isDisableGateway: false,  // 提交时进行转化
        // 激活DHCP[0:否 1:是]
        isActivateDHCP: 1,
      },

    };
  },

  methods: {
    onShow () {
      this.currStep = 0;
      this.formValues = {};
    },
    onChangeDisableGateway (e) {
      this.formValues.isDisableGateway = e.target.checked;
    },
    onChange(e) {
      this.type = e.target.value;
    },

    handlePrevStep () {
      if (this.currStep > 0) {
        this.currStep--
      }
    },
    async handleNextStep () {
      try {
        const result = await this._handleValidate();
        if (result && this.currStep + 1 < this.titleList.length) {
          this.currStep++
        } else if (this.currStep + 1 === this.titleList.length) {
          this.titleList.forEach(item => {
            Object.assign(this.formValues, item.data);
          })
          this.formValues.isDisableGateway = this.formValues.isDisableGateway ? 1 : 0;
          this.handleFetch();
        }
      } catch (error) {
        
      }
      
    },
    _handleValidate () {
      return new Promise((resolve, reject) => {
        this['form' + this.currStep].validateFieldsAndScroll((err, values) => {
          if (err) {
            reject(err);
          } else {
            console.log("Received values of form: ", values);
            Object.assign(this.titleList[this.currStep].data, values);
            resolve(true);
          }
        });
      })
    },
  }
};
</script>
