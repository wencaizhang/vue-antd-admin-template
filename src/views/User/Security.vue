<template>
  <div>
    <page-layout>
      <a-list itemLayout="horizontal" :dataSource="listData">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.desc"
          >
            <a slot="title" >{{item.title}}</a>

          </a-list-item-meta>
            <a slot="actions" @click="handleClick(item)">修改</a>
        </a-list-item>
      </a-list>
    </page-layout>
    <EditEmail />
    <EditPhone />
    <EditPwd />
  </div>
</template>

<script>
import EditEmail from './Modal/EditEmail'
import EditPhone from './Modal/EditPhone'
import EditPwd from './Modal/EditPwd'
import PageLayout from "@/components/Layout/PageLayout";
export default {
  components: {
    PageLayout,
    EditEmail,
    EditPhone,
    EditPwd,
  },
  data() {
    return {

      module: "user",
      id: "security",
      name: "安全认证",

      listData: [
        {
          id: 'editPwd',
          title: "账户密码",
          desc: "当前密码强度 : 强"
        },
        {
          id: 'editPhone',
          title: "密保手机",
          desc: "已绑定手机 : 138****8293",
        },
        {
          id: 'editEmail',
          title: "备用邮箱",
          desc: "已绑定邮箱 : ant***sign.com",
        },
      ]
    };
  },
  methods: {
    handleRefresh () {

    },
    handleShowModal (key) {
      this.$store.commit(`${this.id}/toggleModalVisible`, key);
    },
    handleClick (item) {
      console.log(item);
      this.handleShowModal (item.id);
    }
  }
};
</script>

<style scoped>
</style>
