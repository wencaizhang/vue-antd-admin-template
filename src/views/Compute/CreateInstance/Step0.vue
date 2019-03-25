<template>
  <div>
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="映像提供方：">
        <a-radio-group
          @change="handleChange"
          buttonStyle="solid"
          v-decorator="[
            'imageProvider',
            {
              rules: [{ required: true, message: '请选择一个映像提供方!' }],
              initialValue: '0'
            }
          ]"
        >
          <a-radio-button value="0">系统</a-radio-button>
          <a-radio-button value="1">自有</a-radio-button>
          <a-radio-button value="2">共享</a-radio-button>
        </a-radio-group>
        <!-- 映像提供方[0:系统 1:自有 2:共享] -->
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="选择操作系统：">
        <a-spin :spinning="spinning" tip="Loading...">
          <a-select
            v-decorator="[
              'os',
              { 
                initialValue: imageList[0] && imageList[0].value,
                rules: [{ required: true, message: '请选择一个操作系统!' }]
              }
            ]"
            placeholder="请选择"
          >
            <a-select-option
              v-for="item in imageList"
              :key="item.id"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-spin>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { getImageList } from "@/api/compute/images";

// 映像提供方[0:系统 1:自有 2:共享]
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
      imageProvider: '0',
      imageObj: {},
      spinning: false,
    };
  },
  mounted () {
    this.fetchImageList();
  },
  computed: {
    imageList () {
      return this.imageObj[this.imageProvider] || [];
    },
  },
  methods: {
    async fetchImageList () {
      if (this.imageObj[this.imageProvider]) {
        return;
      }
      this.spinning = true;
      let list = [];
      try {
        const resp = await getImageList({
          imageSource: this.imageProvider
        })
        list = resp.data;
      } catch (err) {
        if (err.response.status === 404) {
          
        }
      } finally {
        this.$set(this.imageObj, this.imageProvider, list);
        this.spinning = false;
      }
    },
    handleChange (e) {
      this.imageProvider = e.target.value;
      this.fetchImageList();
    },
    handleSubmit() {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          this.handleGetUserName();
          err ? reject(err) : resolve(values);
        });
      })
    },
    handleGetUserName () {
      let defaultUserName;
      const osid = this.form.getFieldValue('os');
      const item = Object.keys(this.imageObj).find(key => {
        const list = this.imageObj[key];
        const img = list.find(item => item.id === osid);
        if (img) {
          defaultUserName = img.defaultUserName
        }
        return img;
      });
      this.$emit('setDefaultUserName', defaultUserName);
    }
  }
};
</script>
<style>
</style>
