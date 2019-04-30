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
      ></a-transfer>
    </a-spin>

  </a-modal>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { editSecuritygroup as fetchAPI } from "@/api/compute/instance";
import { getGroupList } from "@/api/security/index";
export default {
  mixins: [baseModalMixins],
  props: ["record"],
  data() {
    return {
      fetchAPI,
      name: "editSafetyGroup",
      confirmLoading: false,

      isFetchGroupList: false,
      dataSource: [],
      targetKeys: [],
      selectedKeys: [],

      loop: true,
      list: [],
    };
  },
  watch: {
    "currRecord.securityGroups" (newV, oldV) {
      this.targetKeys = newV;
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
    },
    async fetchList () {
      this.isFetchGroupList = true;
      try {
        const resp = await getGroupList();
        this.dataSource = resp.data.map(item => ({
          title: item.name,
          key: item.name,
        }));
      } catch (error) {

      } finally {
        this.isFetchGroupList = false;
      }
    },
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;
      this.getResult();
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },

    getResult () {
      const instanceId = this.currRecord.id;
      // 原有的
      const oldGroup = this.currRecord.securityGroups;

      // 现有的
      const newGroup = this.targetKeys;

      const result = [];

      // actionType 执行类型[0:添加 1:移除]
      // 新数组元素在原数组中不存在，即为新增
      newGroup.forEach(item => {
        !oldGroup.includes(item) && result.push({ actionType: 0, securitygroup: item, instanceId,  })
      })
      // 原数组元素在新数组中不存在，即为删除
      oldGroup.forEach(item => {
        !newGroup.includes(item) && result.push({ actionType: 1, securitygroup: item, instanceId,  })
      })
      this.list = result;
      this.handleItemCount = result.length;
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
