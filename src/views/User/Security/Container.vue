<template>
  <div>
    <page-layout>
      <a-spin :spinning="loading" size="large" />
      <a-list v-if="!loading" itemLayout="horizontal" :dataSource="listData">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.desc"
          >
            <a slot="title" >{{item.title}}</a>

          </a-list-item-meta>
            <a slot="actions" @click="handleClick(item)">{{ item.btnText }}</a>
        </a-list-item>
      </a-list>
    </page-layout>

    <bind-email />
    <edit-phone-or-email :currItem="currItem"/>
    <edit-pwd />
  </div>
</template>

<script>
import BindEmail from './Modal/BindEmail'
import EditPhoneOrEmail from './Modal/EditPhoneOrEmail'
import EditPwd from './Modal/EditPwd'
import PageLayout from "@/components/Layout/PageLayout";
export default {
  components: {
    PageLayout,
    BindEmail,
    EditPhoneOrEmail,
    EditPwd,
  },
  data() {
    return {

      module: "user",
      id: "security",
      name: "安全设置",

      loading: false,
      userInfo: {},

      listData: [],
      currItem: {}
    };
  },
  created () {
    this.fetch()
  },
  methods: {
    handleRefresh () {
      this.fetch()
    },
    async fetch () {
      try {
        this.loading = true;
        const resp = await this.$store.dispatch('app/fetchUserInfo')
        this.$store.commit('app/setUserInfo', resp);
        this.userInfo = resp;
        this.listData = [
          {
            id: 'editPwd',
            key: 'editPwd',
            title: "账户密码",
            desc: "",
            btnText: '修改',
          },
          {
            id: 'editPhone',
            key: 'phone',
            title: "密保手机",
            desc: `已绑定手机 : ${resp.phone}`,
            btnText: '修改',
          },
          {
            id: resp.email ? 'editPhone' : 'editEmail',
            key: 'email',
            title: "备用邮箱",
            desc: resp.email ? `已绑定邮箱 : ${resp.email}` : "尚未绑定邮箱",
            btnText: resp.email ? '修改' : '绑定',
          },
        ];
        this.loading = false;
      } catch (error) {
        this.loading = false;
        
      }
    },
    handleShowModal (key) {
      this.$store.commit(`${this.id}/toggleModalVisible`, key);
    },
    handleClick (item) {
      // console.log(item);
      this.currItem = item;
      this.handleShowModal (item.id);
    }
  }
};
</script>

<style scoped>
</style>
