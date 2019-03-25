
<template>
  <a-modal
    class="detail-modal"
    :title="title"
    okText="确定"
    :visible="visible"
    @cancel="handleCancel"
    @ok="handleCancel"
  >
    <ul v-if="show" class="item-descr-list">
      <li v-for="item in columns" :key="item.title">
        <span class="item-descr-tit">{{ item.title }}</span> <span class="item-descr-txt">{{ currRecord[ item.dataIndex ] || '无'}}</span>
      </li>
    </ul>
  </a-modal>
</template>
<script>
import { baseModalMixins } from "@/mixins/modalMixin";

export default {
  mixins: [baseModalMixins],
  data() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
      {
        title: "可用域",
        dataIndex: "availableDomains",
      },
      {
        title: "时间创建",
        dataIndex: "createDate",
      },
      // ===========
      // 规格
      {
        title: "云主机类型名称",
        dataIndex: "hostTypeName",
      },
      {
        title: "云主机类型ID",
        dataIndex: "hostTypeId",
      },
      {
        title: "内存",
        dataIndex: "memory",
      },
      {
        title: "VCPU",
        dataIndex: "vcpu",
      },
      {
        title: "磁盘",
        dataIndex: "disk",
      },
      {
        title: "IP地址",
        dataIndex: "ipAddress",
      },
      // ===========
      // 安全组

      // ==========
      // 元数据

      {
        title: "密钥对名称",
        dataIndex: "secretKeyName",
      },
      {
        title: "镜像名称",
        dataIndex: "imageName",
      },
      {
        title: "镜像ID",
        dataIndex: "imageId",
      },

      // ==========
      // 云硬盘
    ];
    return {
      name: "hostDetail",
      columns,
      show: false,
    };
  },
  computed: {
    title () {
      return `云主机/${this.currRecord.name} 概况`
    }
  },
  methods: {
    onShow () {
      console.log(this.currRecord)
      this.show = true;
    }
  }
};
</script>

<style>
.detail-modal .ant-modal-footer .ant-btn-default{
  /* 隐藏取消按钮 */
  display: none;
}
li {
  list-style: none;
}

.item-descr-list li {
  display: table-row;
}
.item-descr-tit {
  color: #888;
  padding-right: 20px;
  white-space: nowrap;
  text-align: left;
  width: auto;
  display: table-cell;
  vertical-align: top;
  padding-bottom: 16px;
}
.item-descr-txt {
  display: table-cell;
  vertical-align: top;
  padding-bottom: 16px;
  color: #444;
  word-break: break-word;
}
</style>
