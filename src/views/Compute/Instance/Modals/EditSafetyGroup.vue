<template>
  <a-modal
    title="编辑云主机安全组"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleCreate"
    :visible="visible"
    :confirmLoading="confirmLoading"
  >
    <a-spin :spinning="spinning">
      <a-transfer
        class="transfer-container"
        :dataSource="dataSource"
        :titles="['全部安全组', '云主机安全组']"
        :targetKeys="targetKeys"
        :selectedKeys="selectedKeys"
        :render="item=>item.title"
        @change="handleChange"
        @selectChange="handleSelectChange"
      >
      </a-transfer>
    </a-spin>
  </a-modal>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { editSecuritygroup as fetchAPI } from "@/api/compute/instance";
import { getGroupList } from "@/api/security/index";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "editSafetyGroup",
      confirmLoading: false,

      isFetchGroupList: false,
      dataSource: [],
      targetKeys: [],
      selectedKeys: [],

      formValues: [],
    };
  },
  watch: {
    "currRecord.securityGroups" (newV, oldV) {
      this.updateTargetKeys()
    }
  },
  computed: {
    spinning () {
      return this.isFetchGroupList || this.currRecord.loadingGroup
    }
  },
  methods: {
    onShow() {
      !this.dataSource.length && this.fetchList();
      this.targetKeys = [];
      this.selectedKeys = [];
      this.updateTargetKeys();
    },

    updateTargetKeys () {
      this.targetKeys = this.dataSource.filter(item => this.currRecord.securityGroups.includes(item.title)).map(item => item.key)
      this.getFormValues();
    },

    async fetchList () {
      this.isFetchGroupList = true;
      try {
        const resp = await getGroupList();
        this.dataSource = resp.data.map(item => ({
          title: item.name,
          key: item.id,
        }));
        this.updateTargetKeys()
      } catch (error) {

      } finally {
        this.isFetchGroupList = false;
      }
    },

    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;
      this.getFormValues();
    },

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },

    getFormValues () {
      this.formValues = {
        instanceId: this.currRecord.id,
        securitygroups: this.targetKeys
      };
    }
  }
};
</script>

<style scoped>
.transfer-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
