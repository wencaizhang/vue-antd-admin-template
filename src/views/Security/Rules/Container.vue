<template>
  <div>
    <PageLayout>

      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
                <a-button
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleSingleMenuClick('create')"
                >添加规则</a-button>
                <a-button
                  type="danger"
                  style="margin-right: 10px;"
                  icon="delete"
                  :disabled="!selectedRowKeys.length"
                  @click="handleMultiMenuClick('multiDeleta')"
                >删除规则</a-button>
              </a-row>
            </a-col>
            <a-col>
              <a-row type="flex" justify="space-between"></a-row>
            </a-col>
          </a-row>
        </div>
        <a-alert type="info" showIcon style="margin-bottom: 16px;">
          <div slot="message">
            已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;&nbsp;项
            <a style="margin-left: 24px" @click="handleClearSelected">清空</a>
          </div>
        </a-alert>
        <a-table
          :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onTableSelectChange}"
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a-button
              type="danger"
              style="margin-right: 10px;"
              icon="delete"
              @click="handleSingleMenuClick('delete', record)"
            >删除规则</a-button>
          </template>
        </a-table>
      </div>
    </PageLayout>

    <CreateModal />
    <DeleteModal />
    <MultiDelete />
  </div>
</template>

<script>
import CreateModal from "./Modal/Create";
import DeleteModal from "./Modal/Delete";
import MultiDelete from "./Modal/MultiDelete";
import PageLayout from "@/components/Layout/PageLayout.vue";

import rule from '@/i18n/zh/rule'

const statusDicts = rule.rule.status

import tablePageMixins from "@/mixins/tablePageMixins";

import { getRuleList as getList } from "@/api/security/index";
export default {
  mixins: [tablePageMixins],
  components: {
    CreateModal,
    MultiDelete,
    DeleteModal,
    PageLayout
  },

  data() {
    return {
      getList,
      module: "security",
      id: "rules",
      name: "管理安全组规则",
      SECURITY_GROUP_RULES: [
        {
          name: "All TCP",
          ip_protocol: "tcp",
          from_port: "1",
          to_port: "65535"
        },{
          name: "All UDP",
          ip_protocol: "udp",
          from_port: "1",
          to_port: "65535"
        },{
          name: "All ICMP",
          ip_protocol: "icmp",
          from_port: "-1",
          to_port: "-1"
        },{
          name: "SSH",
          ip_protocol: "tcp",
          from_port: "22",
          to_port: "22"
        },{
          name: "SMTP",
          ip_protocol: "tcp",
          from_port: "25",
          to_port: "25"
        },{
          name: "DNS",
          ip_protocol: "tcp",
          from_port: "53",
          to_port: "53"
        },{
          name: "HTTP",
          ip_protocol: "tcp",
          from_port: "80",
          to_port: "80"
        },{
          name: "POP3",
          ip_protocol: "tcp",
          from_port: "110",
          to_port: "110"
        },{
          name: "IMAP",
          ip_protocol: "tcp",
          from_port: "143",
          to_port: "143"
        },{
          name: "LDAP",
          ip_protocol: "tcp",
          from_port: "389",
          to_port: "389"
        },{
          name: "HTTPS",
          ip_protocol: "tcp",
          from_port: "443",
          to_port: "443"
        },{
          name: "SMTPS",
          ip_protocol: "tcp",
          from_port: "465",
          to_port: "465"
        },{
          name: "IMAPS",
          ip_protocol: "tcp",
          from_port: "993",
          to_port: "993"
        },{
          name: "POP3S",
          ip_protocol: "tcp",
          from_port: "995",
          to_port: "995"
        },{
          name: "MS SQL",
          ip_protocol: "tcp",
          from_port: "1433",
          to_port: "1433"
        },{
          name: "MYSQL",
          ip_protocol: "tcp",
          from_port: "3306",
          to_port: "3306"
        },{
          name: "RDP",
          ip_protocol: "tcp",
          from_port: "3389",
          to_port: "3389"
        }
      ],
    };
  },
  beforeMount () {
    const secGroupId = this.$route.params.id
    this.payload = { secGroupId }
  },

  methods: {
    __handleTransformToZh (status) {
      return statusDicts[status.toLowerCase()] || status
    },
    handleParseData (data) {
      const { SECURITY_GROUP_RULES } = this;
      data.forEach(item => {
        // 端口范围
        const { portRangeMax, portRangeMin } = item;
        let portScope;
        if (portRangeMax === portRangeMin) {
          const ruleItem = SECURITY_GROUP_RULES.find(item => item.to_port == portRangeMax);
          portScope = portRangeMax + (ruleItem ? `(${ruleItem.name})` : '');
        } else {
          portScope = portRangeMin + '~' + portRangeMax;
        };

        // 方向
        const direction_zh = this.__handleTransformToZh(item.direction);
        Object.assign(item, {
          portScope,
          direction_zh,
        })
      })
      return data;
    },
  }
};
</script>

<style scoped>
.ant-tabs-bar {
  margin: 0;
}
</style>
