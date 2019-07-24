
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :title="`审核 - ${currRecord.authorizeType}`"
    >
      <a-content v-if="showContent" :currRecord="currRecord" />

      <a-form :form="form">
        <a-form-item
          label=""
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="{ span: 24 }"
          :validate-status="validateStatus"
          :help="help"
        >
        请填写未通过审核的原因
          <a-textarea
            v-model="comment"
            @change="onChange"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="不通过审核时，请填写原因"
          />
        </a-form-item>
      </a-form>

      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="confirmLoading1" @click="onClick(true)">
          通过
        </a-button>
        <a-button class="danger-btn" type="danger" :loading="confirmLoading2" @click="onClick(false)">
          不通过
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { reviewUserAuth as fetchAPI } from "@/api/user/order";
import rulesObj from '@/utils/rules'
import AContent from './Content'
export default {
  mixins: [baseModalMixins, formModalMixins],
  components: { AContent, },
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "check",

      showContent: false,

      confirmLoading1: false,
      confirmLoading2: false,

      comment: '',
      validateStatus: '',
      help: '',
    };
  },
  methods: {
    onShow () {
      this.comment = '';
      this.showContent = true;
    },
    onHidden () {
      this.showContent = false;
    },
    onChange (e) {
      if (this.comment) {
        this.validateStatus = 'success';
        this.help = '';
      }
      if (this.comment.length >= 50) {
        this.validateStatus = 'error';
        this.help = '原因描述字符50个汉字';
        return;
      }
    },
    onClick (pass) {
      let reviewId = this.currRecord.reviewId;
      // 审核状态[1:审核通过 2:审核不通过]

      this.validateStatus = 'success';
      this.help = '';
      if (!pass) {
        if (!this.comment) {
          this.validateStatus = 'error';
          this.help = '请填写审核失败原因';
          return;
        }
        this.confirmLoading2 = true;
        this.formValues = {
          reviewId,
          reviewState: '2',
          reviewComments: this.comment,
        }
      }
      if (pass) {
        this.confirmLoading1 = true;
        this.validateStatus = 'success';
        this.formValues = { 
          reviewId,
          reviewState: '1',
        }
      }
      
      this.handleCreate();
    },
    handleFetchSuccess(resp) {
      this.confirmLoading1 = false;
      this.confirmLoading2 = false;
    },
    handleFetchFailed (err) {
      this.handleFetchSuccess();
    },
  },
};
</script>

<style>
.danger-btn {
  color: rgba(0, 0, 0, 0.65);
}
</style>
