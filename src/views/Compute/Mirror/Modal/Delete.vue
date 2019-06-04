<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="删除镜像"
      okText="删除"
      okType="danger"
    >
      <p>即将删除镜像“{{ currRecord.name }}”，请确认你的操作。</p>

    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
import { deleteImage as fetchAPI } from '@/api/compute/images';

import mixins from './mixins'
export default {
  mixins: [baseModalMixins, mixins],
  data() {
    return {
      fetchAPI,
      name: "delete"
    };
  },

  methods: {
    onShow () {
      this.formValues = Object.assign(this.formValues, { imageId: this.currRecord.id });
    },
  }
};
</script>

<style scoped>
p {
  margin-bottom: 10px;
  text-align: center;
}
table {
  margin: 0 auto;
  width: 100%;
}
table td, table th {
  padding: 5px 10px;
  border: 1px solid #f2f2f2;
}
.status-disabled {
  user-select: none;
  color: #BBB;
}
.fb {
  font-weight: bold;
}
</style>
