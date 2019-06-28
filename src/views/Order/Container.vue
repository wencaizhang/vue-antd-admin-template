<template>
  <div>
    <page-layout>
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
                >
                  创建工单
                </a-button>
              </a-row>
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
          <template slot="detail" slot-scope="text, record">
            <a title="点击查看工单详情" @click="handleSingleMenuClick('detail', record)">{{ text.substring(0, 8) }}</a>
          </template>

          <template slot="operation" slot-scope="text, record">
            <a-dropdown style="margin-right: 10px;">
              <a-menu slot="overlay" @click="handleSingleMenuClick($event.key, record)">
                <a-menu-item
                  v-for="item in singleMenuOptions"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                操作
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </template>
        </a-table>
      </div>
    </page-layout>
    <create />
    <detail />
  </div>
</template>
<script>
import PageLayout from "@/components/Layout/PageLayout";
import tablePageMixins from "@/mixins/tablePageMixins";
import create from './Modal/Create'
import detail from './Modal/Detail'
import { getOrderList as getList } from "@/api/user/order";
export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
    create,
    detail,
  },
  data() {
    return {
      getList,
      module: "order",
      id: "order",
      name: "工单",

    };
  },

  methods: {
    handleParseData (data) {
      data.forEach(item => {
        // 工单状态 [0:未处理 1:已解决 2:处理中]
        const mapStatus = ['未处理',  '已解决',  '处理中',];
        let workOrderStatus_zh = mapStatus[item.workOrderStatus];
        Object.assign(item, {
          workOrderStatus_zh,
        })
      })
      return data;
    }
  }
};
</script>

<style scoped>

</style>
