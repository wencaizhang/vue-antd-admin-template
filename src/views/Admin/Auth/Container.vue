<template>
  <div>
    <page-layout>

      <div class="content">
        <div class="table-operator" style="margin-bottom: 16px;">
          <a-row type="flex" justify="space-between">
            <a-col :span="12">
              <a-button icon="sync" :disabled="loading" @click="handleRefresh" style="margin-right: 10px;" title="刷新"></a-button>
              <a-radio-group
                @change="onChange"
                v-model="payload.authorizeStatus"
              >
                <a-radio-button
                  v-for="item in status"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </a-col>
            <a-col :span="12">
              <span style="display: flex; justify-content: flex-end;">
                <a-input-group compact class="compact-search-input" style="display: inline-block; width: auto;">
                  <a-select @change="v => searchValues.type = v" v-model="searchValues.type" style="width:100px!important;">
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
                    @pressEnter="handleSearch"
                    v-model="searchValues.inputValue"
                    :placeholder="`请输入${types[searchValues.type]}信息`"
                  >
                    <a-icon v-if="searchValues.inputValue" slot="suffix" type="close-circle" @click="searchValues.inputValue = ''" />
                  </a-input>
                </a-input-group>
                <a-button type="primary" :disabled="!searchValues.inputValue" @click="handleSearch" style="margin-left: 8px">
                  搜索
                  <a-icon type="search" />
                </a-button>
              </span>
            </a-col>
          </a-row>
        </div>
        <a-table
          :columns="columns"
          :rowKey="record => record.reviewId"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a @click="handleSingleMenuClick('check', record)">执行审核</a>
          </template>
          <template slot="detail" slot-scope="text, record">
            <a @click="handleSingleMenuClick('detail', record)">查看详情</a>
          </template>
        </a-table>
      </div>
    </page-layout>
    <a-check />
    <a-detail />
  </div>
</template>
<script>
import PageLayout from "@/components/Layout/PageLayout";
import tablePageMixins from "@/mixins/tablePageMixins";
import { getOrderList as getList } from "@/api/user/order";
import ACheck from './Modal/Check'
import ADetail from './Modal/Detail'
export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
    ACheck,
    ADetail,
  },
  data() {
    return {
      getList,
      module: "admin",
      id: "auth",
      name: "身份认证审核",

      payload: {
        authorizeStatus: "0",
      },

      searchValues: {
        type: 'authNumber',
        inputValue: '',
      },

      status: [
        { value: '0', label: '等待审核', },
        { value: '1', label: '已通过审核', },
        { value: '2', label: '未通过审核', },
      ],
    };
  },
  computed: {
    types () {
      return this.payload.authorizeStatus == 0
        ?
        {
          authNumber: '认证编号',
          userName: '账号名称',
          authUser: '提交人',
        }
        :
        {
          authNumber: '认证编号',
          userName: '账号名称',
          authUser: '提交人',
          reviewerRealName: '审核人',
        }
    },
    columns() {
      const data = this.$store.state[this.module][this.id].columns.concat();
      if (this.payload.authorizeStatus != 0) {
        // 添加 审核人
        data.splice(3, 0,
          { title: '审核人', dataIndex: 'reviewerRealName',  }
        )
      }
      if (this.payload.authorizeStatus == 1) {
        // 移除 提交时间 和 执行审核
        // 添加 详情
        data.splice(-2, 2,
          { 
            title: '审核时间',
            sorter: true,
            dataIndex: 'authenticationInfo.reviewedTime'
          },
          { 
            title: '详情',
            dataIndex: 'singleMenuOptions',
            scopedSlots: { customRender: 'detail' } 
          },
        )
      }
      if (this.payload.authorizeStatus == 2) {
        // 移除 提交时间 和 执行审核
        // 添加 未通过原因 和 详情
        data.splice(-2, 2,
          { title: '未通过原因', dataIndex: 'reviewContent', },
          { 
            title: '详情',
            dataIndex: 'singleMenuOptions',
            scopedSlots: { customRender: 'detail' } 
          },
        )
      }
      return data;
    },
  },
  methods: {
    handleSearch () {
      const { type, inputValue } = this.searchValues;
      if (!inputValue) { return false; }

      this.fetch(Object.assign({},this.payload, {
        [type]: inputValue,
        pageIndex: 1,
        pageSize: this.pagination.pageSize
      }));
    },
    onChange (e) {
      const { type } = this.searchValues;
      Object.assign(this.payload, {
        pageIndex: 1,
        pageSize: this.pagination.pageSize
      });
      this.handleRefresh();
    },
    handleParseData () {

      this.data.forEach(item => {
        // item.applicationTime
      })

    },
    _parseSort (sorter) {
      // 排序字段 (1:认证编号 2:用户名 3:提交人 4:审核人 5:认证类型 6:提交时间 7:审核时间)
      const fieldMap = {
        authorizeType: '5',
        applicationTime: '6',
        'authenticationInfo.reviewedTime': '7',
      };

      // 排序类型(1:升序 2:降序)
      const orderMap = {
        ascend: '1',
        descend: '2',
      }
      return {
        sortField: fieldMap[sorter.field],
        sortType: orderMap[sorter.order],
      }
    },
  }
};
</script>

<style scoped>

</style>
