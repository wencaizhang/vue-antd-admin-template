<template>
  <a-modal
    title="编辑云主机安全组"
    okText="确定"
    :visible="visible"
    :bodyStyle="{ 'max-height': '500px', overflow: 'auto' }"
    :confirmLoading="confirmLoading"
    @cancel="$emit('cancel')"
    @ok="$emit('create')"
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
export default {
  props: ["record", "visible"],
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
    },

    handleCancel() {
      this.$emit("cancel");
    },
    handleCreate() {
      const form = this.formRef.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.submit(values);
      });
    },
    submit(values) {
      const form = this.formRef.form;
      this.confirmLoading = true;
      setTimeout(() => {
        // 提交数据成功之后
        this.confirmLoading = false;
        form.resetFields();
        this.$emit("success");
      }, 2000);
    }
  }
};
</script>