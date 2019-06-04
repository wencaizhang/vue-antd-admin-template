
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建镜像"
      okText="创建"
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
                rules: [
                  { required: true, message: '请输入名称!' },
                  rulesObj.name,
                ]
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
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                rules: [{ message: '请输入描述' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="镜像源："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            @change="handleSelectSource"
            placeholder="请选择镜像源"
            v-decorator="[
              'imageSource',
              {
                initialValue: sourceType,
                rules: [{ required: true, message: '请选择镜像源' }]
              }
            ]"
          >
            <!-- 镜像源[0:镜像文件 1:镜像路径] -->
            <a-select-option :value="0">镜像文件</a-select-option>
            <a-select-option :value="1">镜像地址</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="sourceType == 0"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像文件："
        >

          <uploader ref="uploader"></uploader>

        </a-form-item>
        <a-form-item
          v-if="sourceType == 1"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像地址："
        >
          <a-input placeholder="请输入镜像地址" v-decorator="[
              'imageUrl',
              {
                rules: [{ required: true, message: '请输入镜像地址' }]
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
              { rules: [{ required: true, message: '请选择镜像格式!' }] }
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
          label="架构："
        >
          <a-select
            placeholder="选择架构"
            v-decorator="[
              'architecture',
              {
                initialValue: 'bare',
                rules: [{ required: true, message: '请选择架构!' }]
              }
            ]"
          >
            <a-select-option
              v-for="item in containerFormatList"
              :value="item"
              :key="item"
            >
              {{ item }}
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
              { rules: [{ required: true, message: '请填写最小磁盘!' }] }
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
            :max="64"
            v-decorator="[
              'memory',
              { rules: [{ required: true, message: '请填写最低内存!' }] }
            ]"
          />
        </a-form-item>
        <a-form-item
          v-show="sourceType == 1"
         :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'isReplicaData',
            ]">数据复刻</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'isPublic',
            ]">公有</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import uploader from "./Uploader";
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { createImage as fetchAPI } from '@/api/compute/images';
import { rulesObj } from '@/utils/util';
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create",
      fileList: [],
      sourceType: 0,
      // 镜像源[0:镜像文件 1:镜像路径]

      // 架构
      containerFormatList: [
        'bare', 'ami', 'ari', 'aki', 'docker', 'ova', 'ovf',
      ],
    };
  },
  components: {
    uploader,
  },
  computed: {
    imageFormatList () {
      return this.$parent.imageFormatList;
    }
  },
  methods: {
    handleSelectSource(value) {
      this.sourceType = value;
    },

    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values, {
            memory: values.memory * 1024,
            imageUrl: this.$refs.uploader.file.url
          });
          self.handleFetch();
        }
      });
    },
  }
};
</script>

<style>

</style>
