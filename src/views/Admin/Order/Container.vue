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
              <a-row type="flex" justify="space-between">
                <a-input-group compact class="compact-search-input" style="width: auto;">
                  <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width: 90px!important;">
                    <a-select-option
                      v-for="(value, key) in types"
                      :value="key"
                      :key="key"
                    >
                      {{ value }}
                    </a-select-option>
                  </a-select>
                  <a-input
                    style="width: 200px"
                    @pressEnter="handleDATA"
                    v-model="searchValues.inputValue"
                    :placeholder="`请输入${types[searchValues.type]}信息`"
                  >
                    <a-icon v-if="searchValues.inputValue" slot="suffix" type="close-circle" @click="searchValues.inputValue = ''" />
                  </a-input>
                </a-input-group>
                <a-select @change="v => searchValues.status = v" v-model="searchValues.status" style="margin-left: 8px; width: 100px;">
                  <a-select-option key="all" value="all">全部</a-select-option>
                  <a-select-option key="0" value="0">个人认证</a-select-option>
                  <a-select-option key="1" value="1">企业认证</a-select-option>
                </a-select>
                <a-button type="primary" @click="handleDATA" style="margin-left: 8px">
                  搜索
                  <a-icon type="search" />
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
            <a title="点击查看详细" @click="handleSingleMenuClick('detail', record)">{{ text.substring(0, 8) }}</a>
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
      id: "adminOrder",
      name: "订单",
      workOrderStatus: '0',

      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      },
      types: {
        name: '姓名',
      },

      // 工单状态 [0:未处理 1:已解决 2:处理中]
      status: [
        { value: '0', label: '未处理工单', },
        { value: '1', label: '处理中工单', },
        { value: '2', label: '已关闭工单', },
      ],

    };
  },

  mounted () {
    const { name, params } = this.$route;
    if (params.workOrderStatus) {
      this.workOrderStatus = workOrderStatus;
    }
  },
  watch: {
    '$route' (to, from) {
      const { params } = to;
      if (params.workOrderStatus) {
        this.workOrderStatus = workOrderStatus;
      }
      this.handleRefresh();
    }
  },
  methods: {
    onChange () {
      // this.workOrderStatus
      const { name } = this.$route;
      this.$router.push({ name, params: { workOrderStatus: this.workOrderStatus } })
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
