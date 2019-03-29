
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="重建云主机"
      okText="确定"
    >
      <a-form :form="form">
        <a-form-item :labelCol="{ span: 8 }" :wrapperCol="{ span: 14 }" label="选择镜像：">
          <a-spin :spinning="spinning" tip="Loading...">
            <a-select
              v-decorator="[
                'imageId',
                { 
                  initialValue: imageList[0] && imageList[0].value,
                  rules: [{ required: true, message: '请选择镜像！!' }]
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
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { rebuild as fetchAPI } from '@/api/compute/instance';
import { getImageList } from "@/api/compute/images";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      fetchAPI,
      name: "rebuildCloudHost",
      imageProvider: '0',
      imageList: [],
      spinning: false,
    };
  },
  methods: {
    onShow () {
      this.fetchImageList();
    },
    async fetchImageList () {
      if (this.imageList.length) {
        return;
      }
      this.spinning = true;
      try {
        const resp = await getImageList({ pageSize: 100, });
        this.imageList = resp.data;
      } catch (err) {
        if (err.response.status === 404) {
          
        }
      } finally {
        this.spinning = false;
      }
    },

    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
  }
};
</script>
