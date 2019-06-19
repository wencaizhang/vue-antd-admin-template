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
                  v-if="isAdmin"
                  @change="onChange"
                  v-model="workOrderStatus"
                >
                  <!-- 工单状态 [0:未处理 1:已解决 2:处理中] -->
                  <a-radio-button value="0">未处理工单</a-radio-button>
                  <a-radio-button value="2">处理中工单</a-radio-button>
                  <a-radio-button value="1">已关闭工单</a-radio-button>
                </a-radio-group>
                <a-button
                  v-if="!isAdmin"
                  type="primary"
                  style="margin-right: 10px;"
                  icon="plus"
                  @click="handleSingleMenuClick('create')"
                >
                  创建工单
                </a-button>
              </a-row>
            </a-col>
            <a-col>
              <a-row v-if="isAdmin" type="flex" justify="space-between">
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
            <a title="点击查看镜像属性" @click="handleSingleMenuClick('detail', record)">{{ text.substring(0, 8) }}</a>
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
  </div>
</template>
<script>
import PageLayout from "@/components/Layout/PageLayout";
import tablePageMixins from "@/mixins/tablePageMixins";
import create from './Modal/Create'
import { getOrderList as getList } from "@/api/user/order";
export default {
  mixins: [tablePageMixins],
  components: {
    PageLayout,
    create,
  },
  data() {
    return {
      getList,
      module: "user",
      id: "order",
      name: "订单",
      workOrderStatus: '0',
      isAdmin: true,
      searchValues: {
        type: 'name',
        inputValue: '',
        status: 'all',
      },
      types: {
        name: '姓名',
      },
    };
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('update: ', to)
  },
  mounted () {
    console.log(this.$route);
    const { name, params } = this.$route;
    if (params.workOrderStatus) {
      this.workOrderStatus = workOrderStatus;
    }
    if (name === "user-order") {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      const names = {
        user_order: 'user-order',
        admin_order: 'admin-order',
      };

      const { name, params } = to;
      if (params.workOrderStatus) {
        this.workOrderStatus = workOrderStatus;
      }
      if (name === names.user_order) {
        this.isAdmin = false;
      } else {
        this.isAdmin = true;
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
