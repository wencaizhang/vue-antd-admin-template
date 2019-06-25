<template>
  <div>
    <page-layout>

      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-row type="flex" justify="space-between">
                <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
                <a-radio-group
                  @change="onChange"
                  v-model="workOrderStatus"
                >
                  <a-radio-button
                    v-for="item in status"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-radio-button>
                </a-radio-group>
              </a-row>
            </a-col>
            <a-col>
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
  </div>
</template>
<script>
import PageLayout from "@/components/Layout/PageLayout";
import tablePageMixins from "@/mixins/tablePageMixins";
import { getOrderList as getList } from "@/api/user/order";
export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
  },
  data() {
    return {
      getList,
      module: "admin",
      id: "auth",
      name: "身份认证审核",

      workOrderStatus: "0",

      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      },
      types: {
        name: '姓名',
      },

      status: [
        { value: '0', label: '等待审核', },
        { value: '1', label: '已通过审核', },
        { value: '2', label: '未通过认证', },
      ],
    };
  },
  methods: {
    onChange (e) {
      const value = e.target.value;
      // const { name } = this.$route;
      // this.$router.push({ name, params: { workOrderStatus: this.workOrderStatus } })
    },
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
