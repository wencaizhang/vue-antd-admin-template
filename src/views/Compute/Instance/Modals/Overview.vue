
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
      <li v-for="item in columns" :key="item.title || item.dataIndex">
        <span v-if="item.type === 'title'" class="item-descr-tit" style="color: #333; padding-top: 10px; font-weight: bold;">{{ item.title }}</span>
        <span v-else-if="item.type === 'html'" v-html="currRecord[item.dataIndex]"></span>
        <template v-else>
          <span class="item-descr-tit">{{ item.title }}</span>
          <span class="item-descr-txt">{{ currRecord[ item.dataIndex ] || '无'}}</span>
        </template>
      </li>
    </ul>
  </a-modal>
</template>
<script>
import { baseModalMixins } from '@/mixins/modalMixin';
import { getTimeDiff } from "@/utils/util";
export default {
  mixins: [baseModalMixins],
  data() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'status_zh',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
      },
      {
        title: '创建以来',
        dataIndex: 'timeDiff',
      },
      // ===========
      // 规格
      {
        type: 'title',
        title: '规格'
      },
      {
        title: '云主机类型名称',
        dataIndex: 'hostTypeName',
      },
      {
        title: '云主机类型ID',
        dataIndex: 'hostTypeId',
      },
      {
        title: '内存',
        dataIndex: 'memory',
      },
      {
        title: 'VCPU(核)',
        dataIndex: 'vcpu',
      },
      {
        title: '磁盘',
        dataIndex: 'disk',
      },
      {
        type: 'title',
        title: 'IP地址',
      },
      {
        title: '',
        type: 'html',
        dataIndex: 'ip',
      },
      // ===========
      // 安全组
      {
        type: 'title',
        title: '安全组',
      },
      {
        title: '',
        type: 'html',
        dataIndex: 'securityGroupsList',
      },
      // ==========
      // 元数据
      {
        type: 'title',
        title: '元数据',
      },
      {
        title: '密钥对名称',
        dataIndex: 'secretKeyName',
      },
      {
        title: '镜像名称',
        dataIndex: 'imageName',
      },
      {
        title: '镜像ID',
        dataIndex: 'imageId',
      },

      // ==========
      // 云硬盘
      {
        type: 'title',
        title: '云硬盘',
      },
      {
        type: 'html',
        dataIndex: 'cloudHost',
      },
      
    ];
    return {
      name: 'hostDetail',
      columns,
      show: false,
    };
  },
  computed: {
    title () {
      return `云主机 / ${this.currRecord.name} 概况`
    }
  },
  methods: {
    onShow () {
      this.show = true;
      this.currRecord.securityGroupsList = this.currRecord.securityGroups.map(item2 => {
        return `<p>${item2.securityGroupName}</p>`
      }).join('');

      this.currRecord.cloudHost = '未连接云硬盘';
      this.currRecord.ip = this.currRecord.network.join(', ');
      this.setTimeDiff()
    },
    setTimeDiff () {
      const timeDiff = getTimeDiff(this.currRecord.timestamp)
      this.currRecord.timeDiff = timeDiff;
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
  padding-bottom: 4px;
}
.item-descr-txt {
  display: table-cell;
  vertical-align: top;
  padding-bottom: 4px;
  color: #444;
  word-break: break-word;
}
</style>
