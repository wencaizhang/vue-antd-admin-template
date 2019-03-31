<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="计费方式：">
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'billingRule',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请选择计费方式!' }]
            }
          ]"
        >
          <!-- 计费方式[0:预付费 1:按量付费] -->
          <a-radio :value="0">预付费</a-radio>
          <a-radio :value="1">按量付费</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机名称：">
        <a-input
          v-decorator="[
            'hostName',
            {
              rules: [{ required: true, message: '请填写主机名称!' }]
            }
          ]"
          style="width: 250px"
          placeholder="请填写主机名称"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主机数量：">
        <a-input-number
          style="width: 250px"
          :min="1"
          :max="10"
          v-decorator="[
            'hostNumber',
            {
              initialValue: 1,
              rules: [{ required: true, message: '请填写主机数量!' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名：">
        <a-select
          mode="tags"
          @change="handleSelectUserName"
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: '请选择用户名!' }]
            }
          ]"
          style="width: 250px"
        >
          <a-select-option value="urcentos">urcentos</a-select-option>
          <a-select-option value="ubuntu">ubuntu</a-select-option>
          <a-select-option value="admin">admin</a-select-option>
          <a-select-option value="administrator">administrator</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="SSH密钥："
      >
        <div>
          <span style="margin-right: 3px;">选择已有密钥，或</span>
          <a @click="createKeypair">新建</a>
        </div>
        <a-spin
          :spinning="loading"
          tip="正在加载密钥数据..."
          class="a-spin-text-align-left"
        >
          <a-radio-group
            v-decorator="[
              'secretKey',
              {rules: [{ required: true, message: '请选择密钥!' }]}
            ]"
          >
            <a-radio
              v-for="item in keypairList"
              :key="item.name"
              :value="item.name"
              style="display: block;"
            >{{ item.name }}</a-radio>
          </a-radio-group>
        </a-spin>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户数据：">
        <a-radio-group
          @change="e => userData = e.target.value"
          v-decorator="[
            'userDataType',
            {
              initialValue: 0,
              rules: [{ required: true, message: '请选择用户数据!' }]
            }
          ]"
        >
          <!-- 用户数据类型[0:无 1:文本 2:可执行文件] -->
          <a-radio :value="0">无</a-radio>
          <a-radio :value="1">文本</a-radio>
          <a-radio :value="2">可执行文件</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-row style="margin-bottom: 24px;">
        <a-col :offset="8" :span="12" style="text-align: left;">
          <a-form-item
            v-show="userData == 1"
          >
            <a-textarea v-decorator="[ 'userDataText', ]" placeholder="请填写用户数据" :rows="4"/>
          </a-form-item>
          <a-form-item
            v-show="userData == 2"
          >
            <a-upload
              :action="uploadAction"
              :multiple="true"
              :fileList="fileList"
              @change="handleChange"
            >
              <a-button>
                <a-icon type="upload" /> Upload
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- <CreateModal /> -->
  </div>
</template>
<script>
import { getKeyPairList } from "@/api/compute/keypair";
// import CreateModal from "@/views/Compute/KeyPair/Modal/Create";
export default {
  // components: [CreateModal],
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      userData: 0,
      customValidateErrors: {
        userDataText: false,
        userDataText: false
      },

      keypairList: [],
      loading: false,

      fileList: [],
      uploadAction: '',
    };
  },
  mounted() {
    this.fetchKeyPairList();
  },
  methods: {
    async fetchKeyPairList () {
      this.loading = true;
      try {
        const resp = await getKeyPairList();
        this.keypairList = resp.data;
      } catch (err) {

      } finally {
        this.loading = false;
      }
    },
    createKeypair () {

    },
    handleSelectUserName (value) {
      // 只允许选择一个名字
      if (value.length > 1) {
        value.splice(0, value.length - 1);
      }
    },
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          err ? reject(err) : resolve(Object.assign({}, values, {
            userName: values.userName[0]
          }));
        });
      })
    },
    handleChange(info) {
      let fileList = info.fileList;

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter((file) => {
        if (file.response) {
          return file.response.status === 'success';
        }
        return false;
      });

      this.fileList = fileList
    },
  }
};
</script>

<style>

/* a-spin 加载动画靠左显示 */
.a-spin-text-align-left .ant-spin-dot {
  left: 0 !important;
  margin-left: 40px !important;
}

.a-spin-text-align-left .ant-spin-text {
  width: auto !important;
}
</style>
