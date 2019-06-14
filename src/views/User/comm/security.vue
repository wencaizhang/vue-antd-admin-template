<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="16" :lg="12">
        <a-form layout="vertical">
          <a-form-item label="原始密码">
            <a-input value="xxx" />
          </a-form-item>
          <a-form-item label="设置新密码">
            <a-input value="xxx"/>
          </a-form-item>

          <a-form-item label="手机号" :required="false">
            <a-input placeholder="exp@admin.com"/>
          </a-form-item>

          <a-form-item label="输入验证码">
            <a-input value="xxx"  />
          </a-form-item>

          <a-form-item>
            <a-button type="primary">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
