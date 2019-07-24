
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="`详情 - ${currRecord.authorizeType}（${currRecord.authorizeStaus}）`"
    >
      <a-content v-if="showContent" :currRecord="currRecord" />

      <template slot="footer">
        <a-button @click="handleCancel">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { createOrder as fetchAPI } from "@/api/user/order";
import AContent from './Content'
export default {
  mixins: [baseModalMixins],
  components: { AContent, },
  data() {
    return {
      fetchAPI,
      name: "detail",

      showContent: false,
    };
  },
  methods: {
    onShow () {
      this.showContent = true;
    },
    onHidden () {
      this.showContent = false;
    }
  },
};
</script>

