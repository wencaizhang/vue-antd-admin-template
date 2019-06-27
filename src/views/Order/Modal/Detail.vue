
<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="工单详情"
    >
      <template slot="footer">
        <a-button @click="handleCancel">
          确定
        </a-button>
      </template>

      <ul class="item-descr-list">
        <li>
          <span class="item-descr-tit">
            工单编号:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单标题:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单内容:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            资源ID:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单处理记录:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单提交人:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单处理人:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单提交时间:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
        <li>
          <span class="item-descr-tit">
            工单关闭时间:
          </span>
          <span class="item-descr-txt">
            {{ currRecord.id || '无'}}            
          </span>
        </li>
      </ul>

    </a-modal>
  </div>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";
export default {
  mixins: [baseModalMixins],
  data() {
    return {
      name: "detail"
    };
  },
  methods: {

  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.item-descr-list li {
  display: table-row;
}
.item-descr-tit {
  color: #888;
  padding-top: 10px;
  padding-right: 20px;
  white-space: nowrap;
  text-align: left;
  width: auto;
  display: table-cell;
  padding-bottom: 4px;
}
.item-descr-txt {
  display: table-cell;
  padding-bottom: 4px;
  color: #444;
  word-break: break-word;
}
</style>
