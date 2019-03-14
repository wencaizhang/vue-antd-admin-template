<template>
  <a-modal
    title="编辑云主机安全组"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleCreate"
    :visible="visible"
    :confirmLoading="confirmLoading"
  >
    <a-transfer
      :dataSource="mockData"
      :titles="['全部安全组', '云主机安全组']"
      :targetKeys="targetKeys"
      :selectedKeys="selectedKeys"
      :render="item=>item.title"
      @change="handleChange"
      @selectChange="handleSelectChange"
      @scroll="handleScroll"
    ></a-transfer>
  </a-modal>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/utils/mixins/modalMixin";
export default {
  mixins: [baseModalMixins, formModalMixins],
  props: ["record"],
  data() {
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    const targetKeys = mockData
      .filter(item => +item.key % 3 > 1)
      .map(item => item.key);
    return {
      name: "editSafetyGroup",
      mockData,
      targetKeys,
      selectedKeys: ["1", "4"],
      confirmLoading: false
    };
  },
  methods: {
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys;

      console.log("targetKeys: ", this.targetKeys);
      console.log("direction: ", direction);
      console.log("moveKeys: ", moveKeys);
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];

      console.log("sourceSelectedKeys: ", sourceSelectedKeys);
      console.log("targetSelectedKeys: ", targetSelectedKeys);
    },
    handleScroll(direction, e) {
      console.log("direction:", direction);
      console.log("target:", e.target);
    }
  }
};
</script>
