
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
                rules: [{ required: true, message: '请输入名称!' }]}
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
                rules: [{ message: '请输入描述' }]}
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
              'description',
              {
                rules: [{ required: true, message: '请选择镜像源' }]}
            ]"
          >
            <a-select-option value="0">镜像文件</a-select-option>
            <a-select-option value="1">镜像地址</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          v-show="sourceType == 0"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像文件："
          :help="!validateFilePass ? '请上传镜像地址!' : ''"
          :validateStatus="!validateFilePass ? 'error' : ''"
        >
          <a-upload
            action="/"
            :multiple="true"
            :fileList="fileList"
            @change="handleFileChange"
            v-decorator="[
              'file',
            ]"
          >
            <a-button>
              <a-icon type="upload"/>上传
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          v-show="sourceType == 1"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像地址："
          :help="!validateUrlPass ? '请输入镜像地址!' : ''"
          :validateStatus="!validateUrlPass ? 'error' : ''"
        >
          <a-input placeholder="请输入镜像地址" v-decorator="[
              'url',
            ]"/>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="镜像格式："
        >
          <a-select
            placeholder="选择镜像格式"
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择镜像格式!' }]}
            ]"
          >
            <a-select-option value="QCOW2-QEMU">QCOW2-QEMU</a-select-option>
            <a-select-option value="Docker">Docker</a-select-option>
            <a-select-option value="ISO-光盘镜像">ISO-光盘镜像</a-select-option>
            <a-select-option value="Raw">Raw</a-select-option>
            <a-select-option value="VMDK-Vmware虚拟磁盘">VMDK-Vmware虚拟磁盘</a-select-option>
            <a-select-option value="VHD-Vmware虚拟硬盘">VHD-Vmware虚拟硬盘</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="架构："
        >
          <a-input
            v-decorator="[
              'framework',
              {
                rules: [{ required: true, message: '请填写架构!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="最小磁盘(GB)："
        >
          <a-input-number
            :min="40"
            :max="200"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'minDisk',
              {
                rules: [{ required: true, message: '请填写最小磁盘!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
          label="最低内存(GB)："
        >
          <a-input-number
            :min="2"
            :max="100"
            :formatter="value => formatter('G', value)"
            :parser="value => parser(value)"
            v-decorator="[
              'minMemory',
              {
                rules: [{ required: true, message: '请填写最低内存!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          v-show="sourceType == 1"
         :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox checked v-decorator="[
              'copy',
            ]">数据复刻</a-checkbox>
        </a-form-item>
        <a-form-item :labelCol="formItemLayout.labelCol" :wrapperCol="{ span: 14,offset:8 }" label>
          <a-checkbox v-decorator="[
              'public',
            ]">公有</a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      name: "create",
      fileList: [],
      sourceType: 0,
      validateUrlPass: true,
      validateFilePass: true,
    };
  },

  methods: {
    handleSelectSource(value) {
      if (value == 0) {
        this.validateUrlPass = true;
      } else {
        this.validateFilePass = true;
      }
      this.sourceType = value;
    },
    handleFileChange(info) {
      let fileList = info.fileList;

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      // 3. filter successfully uploaded files according to response from server
      fileList = fileList.filter(file => {
        if (file.response) {
          return file.response.status === "success";
        }
        return true;
      });

      this.fileList = fileList;
    }
  }
};
</script>
