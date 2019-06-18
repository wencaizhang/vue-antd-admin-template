<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="16" :lg="12">
        <a-form layout="vertical">
          <a-form-item label="用户ID">
            <a-input :value="userInfo.id" disabled />
          </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model="userInfo.userName" disabled />
          </a-form-item>

          <a-form-item label="邮箱">
            <a-input  v-model="userInfo.email" disabled />
          </a-form-item>

          <a-form-item label="注册时间">
            <a-input :value="userInfo.createTime" disabled />
          </a-form-item>

          <a-form-item label="联系地址">
            <a-input v-model="userInfo.address" @change="onChange"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" :disabled="submitAble">修改</a-button>
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
      userInfo: {
        id: '12342131',
        userName: 'wencaizhang',
        email: 'sss@qq.com',
        createTime: '1990年',
        address: '南京路22号'
      },
      snap: null,
      submitAble: true,
    };
  },
  mounted () {
    this.createSnap()
  },
  methods: {
    createSnap () {
      this.snap = JSON.parse(JSON.stringify(this.userInfo));
    },
    onChange () {
      this.submitAble = JSON.stringify(this.snap) === JSON.stringify(this.userInfo);
    }
  }
};
</script>

<style scoped>

</style>
