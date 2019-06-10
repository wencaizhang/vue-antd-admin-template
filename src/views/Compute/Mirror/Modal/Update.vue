<template>
  <a-modal
    title="更新镜像元数据"
    okText="确定"
    @cancel="handleCancel"
    @ok="handleCreate"
    :visible="visible"
    :confirmLoading="confirmLoading"
  >
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button
        @click="handleCreate"
        :disabled="confirmDisabled"
        :loading="confirmLoading"
        type="primary"
      >
        确定
      </a-button>
    </template>

    <div class="content">
      <p style="margin-bottom: 5px;">
        <span>定制元数据</span>
      </p>
      <a-input-group compact style="margin-bottom: 10px;">
        <a-input style="width: 40%" v-model="inputValue.key" @change="onInputChange('key', $event)" />
        <a-input style="width: 50%" v-model="inputValue.value" @change="onInputChange('value', $event)" />
        <a-button
          style="width: 10%"
          :disabled="!inputValue.key || !inputValue.value"
          @click="handleAdd"
          type="primary"
          icon="plus"
          title="添加"
        ></a-button>
      </a-input-group>

      <p v-if="!metaDatas.length">暂无元数据</p>
      <p v-else style="margin-bottom: 5px;">
        <span>已存在元数据</span>
        <span v-if="metaDatas.length === maxMetaDataCount">（元数据最多 {{ maxMetaDataCount }} 条，不可再添加）</span>
      </p>
      <a-input-group compact v-for="item in metaDatas" :key="item.key" style="margin-bottom: 10px;">
        <a-input style="width: 40%" :defaultValue="item.key" :title="item.key" disabled />
        <a-input style="width: 50%" v-model="item.value" @change="handleChange(item, $event)"  />
        <a-button style="width: 10%" @click="handleDelete(item)" type="danger" icon="minus" title="删除"></a-button>
      </a-input-group>
    </div>
  </a-modal>
</template>
<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";
import { editImage as fetchAPI } from "@/api/compute/images";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      fetchAPI,
      name: "update",

      formValues: [],

      confirmDisabled: true,
      metaDatas: [],
      metaDatas_back: [],
      inputValue: {
        key: '',
        value: '',
      },

      maxMetaDataCount: 100,  // 元数据最大个数
      maxInputLen: 100,  // 元数据键值对字符最大长度
    };
  },
  methods: {
    onShow() {
      this.confirmDisabled = true;
      this.inputValue = {
        key: '',
        value: '',
      };
      this.formValues = Object.assign({}, this.formValues, { id: this.currRecord.id })
      this.metaDatas = JSON.parse(JSON.stringify(this.currRecord.metaDatas === '无' ? [] : this.currRecord.metaDatas))
      this.metaDatas_back = JSON.parse(JSON.stringify(this.metaDatas));
    },
    handleCreate () {
      this.formValues = Object.assign(this.formValues, { metaDatas: this.metaDatas });
      this.handleFetch();
    },
    is (o1, o2) {
      return JSON.stringify(o1) === JSON.stringify(o2)
    },
    hasEmptyValue (objArr) {
      return objArr.some(item => item.value === '')
    },
    diff () {
      // 以下两种情况禁止提交
      // 1. 和原来数据相同
      // 2. 有为空的 value
      this.confirmDisabled = this.is(this.metaDatas, this.metaDatas_back) || this.hasEmptyValue(this.metaDatas);
    },
    handleChange (item, e) {
      const value = e.target.value;
      if (value.length > this.maxInputLen) {
        item.value = value.substring(0, this.maxInputLen)
      }
      this.diff();
    },
    handleDelete (item) {
      const index = this.metaDatas.indexOf(item);
      this.metaDatas.splice(index, 1);
      this.diff();
    },
    handleAdd () {
      if (this.metaDatas.length === this.maxMetaDataCount) {
        return;
      }
      const { key, value } = this.inputValue;
      const index = this.metaDatas.findIndex(item => item.key === key)
      const temp = Object.assign({}, this.inputValue);
      if (index >= 0) {
        this.metaDatas.splice(index, 1, temp)
      } else {
        this.metaDatas.push(temp);
      }
      Object.keys(this.inputValue).forEach(key => this.inputValue[key] = '');
      this.diff();
    },
    onInputChange(key, e) {
      const value = e.target.value;
      if (value.length > this.maxInputLen) {
        this.inputValue[key] = value.substring(0, this.maxInputLen)
      }
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
