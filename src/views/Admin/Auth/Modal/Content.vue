<template>
  <div class="admin-auth-detail-wrapper">
      <a-row v-if="currRecord.authorizeStaus === '未通过审核'" style="margin-bottom: 20px;">
        <a-col class="left" :span="7">未通过原因</a-col>
        <a-col class="right" :span="17">{{ currRecord.reviewContent }}</a-col>
      </a-row>
    <div v-if="currRecord.authorizeType !== '个人认证'">
      <a-row>
        <a-col class="left" :span="7">企业名称</a-col>
        <a-col class="right" :span="17">{{ authInfo.enterpriseName }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">统一社会信用代码</a-col>
        <a-col class="right" :span="17">{{ authInfo.creditCode }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">注册地址</a-col>
        <a-col class="right" :span="17">{{ authInfo.registerAddress }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">营业执照</a-col>
        <a-col class="right" :span="17">
          <a-image :src="authInfo.businessLicense" />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">企业法人</a-col>
        <a-col class="right" :span="17">{{ authInfo.legalPersonName }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">法人身份证号</a-col>
        <a-col class="right" :span="17">{{ authInfo.legalPersonIDCardNum }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">法人身份证人像面</a-col>
        <a-col class="right" :span="17">
          <a-image :src="authInfo.legalPersonIDCardFront" />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">法人身份证国徽面</a-col>
        <a-col class="right" :span="17">
          <a-image :src="authInfo.legalPersonIDCardBack" />
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col class="left" :span="7">真实姓名</a-col>
        <a-col class="right" :span="17">{{ authInfo.realName }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">身份证号</a-col>
        <a-col class="right" :span="17">{{ authInfo.idCardNum }}</a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">身份证人像面</a-col>
        <a-col class="right" :span="17">
          <a-image :src="authInfo.idCardFront" />
        </a-col>
      </a-row>
      <a-row>
        <a-col class="left" :span="7">身份证国徽面</a-col>
        <a-col class="right" :span="17">
          <a-image :src="authInfo.idCardBack" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import AImage from "@/components/tools/AImage";
export default {
  components: { AImage },
  props: {
    currRecord: {
      type: Object
    },
    test: String
  },
  computed: {
    authInfo() {
      return this.currRecord.authenticationInfo;
    }
  }
};
</script>

<style>
.admin-auth-detail-wrapper .ant-row {
  margin-bottom: 20px;
}
.admin-auth-detail-wrapper .ant-row  .left {
  color: #888;
}
.admin-auth-detail-wrapper .ant-row  .right {
  color: #444;
}
</style>
