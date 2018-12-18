
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      title="挂载硬盘到主机"
      okText="提交"
    >
      <a-alert
        message="注意：如果需要在linux系统开机时自动挂载硬盘，请不要在/etc/fstab文件指定/dev/vd**的写法，因为有几率出现硬盘设备顺序编码变化，推荐使用命令blkid 分区获取UUID来挂载硬盘分区。"
        type="warning"
        showIcon
      />
      <a-radio-group @change="onChange" v-model="value">
        <a-radio :style="radioStyle" :value="1">Option A</a-radio>
        <a-radio :style="radioStyle" :value="2">Option B</a-radio>
        <a-radio :style="radioStyle" :value="3">Option C</a-radio>
      </a-radio-group>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "mount",
      value: "",
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.modalVisible[this.name];
    }
  },
  methods: {
    onChange() {
      console.log("xx");
    },
    handleCancel() {
      this.$store.commit("toggleModalVisible", this.name);
    },
    handleCreate() {
      this.$store.commit("toggleModalVisible", this.name);
    }
  }
};
</script>