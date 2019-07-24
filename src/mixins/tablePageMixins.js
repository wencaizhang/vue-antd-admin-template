import { getTimestamp } from '@/utils/util'
export default {
  data() {
    return {
      name: "选项",
      pagination: { },
      payload: {},
      url: "/api/demo",

      data: [],     // 最终要展示在 table 中网页上的数据

      loading: false,

      selectedRowKeys: [],
      currRecord: {},

      searchValues: {},

    };
  },
  computed: {
    message() {
      let len = this.selectedRowKeys.length;
      return `已选择 ${len} 项`;
    },
    columns() {
      return this.$store.state[this.module][this.id].columns;
    },
    menuOptions() {
      return this.$store.state[this.module][this.id].menuOptions;
    },
    multiMenuOptions () {
      return this.menuOptions.filter(item => item.type === 'multi')
    },
    singleMenuOptions () {
      return this.menuOptions.filter(item => item.type === 'single')
    },
  },
  mounted() {
    this.handleRefresh();
  },
  methods: {
    handleRefresh() {
      if (this.searchValues) {
        this.searchValues = Object.assign({}, this.searchValues, { inputValue: '' })
      }
      this.initPagination();
      this.fetch();
    },

    initPagination () {
      this.pagination = {
        total: 0,     // 数据个数
        current: 1,   // 当前页码
        pageSize: 10, // 每页显示数量
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      }
    },

    async fetch (payload = this.payload) {
      this.loading = true;
      this.data = [];
      this.handleClearSelected();
      try {
        const resp = await this.getList(payload);

        this.pagination = Object.assign({}, this.pagination, {
          total: resp.count,     // 数据个数
          current: resp.pageIndex,   // 当前页码
          pageSize: resp.pageSize, // 每页显示数量
        });
        this.data = resp.data;
        this.defaultParseData();
        this.handleParseData && this.handleParseData();

        this.handleFetchSuccess();
      }
      catch (err) {
        if (err.response.status === 404) {
          this.data = [];
        }
      }
      finally {
        this.loading = false;
      }
    },

    defaultParseData () {
      this.data.forEach(item => {
        if (item.id) {
          item.shortID = item.id.substring(0, 8);
        }
        if (item.createDate) {
          // 计算时间戳
          const createDate = item.createDate;
          item.timestamp = getTimestamp(createDate);
        }
        if (item.status) {
          // 保证状态永远是小写字母
          item.status = item.status.toLowerCase();
        }

        // 缺省处理
        Object.keys(item).forEach(k => {
          const value = item[k];
          const str = '无';
          if ([null, undefined, ''].includes(value)) {
            item[k] = str;
          }
          if (value && Array.isArray(value) && value.length === 0) {
            item[k] = [ ];
          }
        })
      })
    },

    handleFetchSuccess () {
      // 数据请求结束后执行
    },
    
    handleTableChange(pagination, filters, sorter) {
      this.payload = Object.assign(this.payload, {
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
        ...this._parseSort(sorter)
      })
      this.fetch();
    },


    _parseSort (sorter) {
      // 自定义排序字段转化
      return sorter
    },

    onTableSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    handleClearSelected() {
      this.selectedRowKeys = [];
    },

    handleMultiMenuClick (key) {
      // 批量操作
      if (this.selectedRowKeys.length === 0) {
        this.$message.info(`请先选择您要操作的${this.name || '数据'}`);
        return;
      }
      this.handleShowModal(key);
    },

    handleSingleMenuClick(key, record) {
      // 单项操作
      this.currRecord = record;
      this.handleShowModal(key);
    },

    handleShowModal (key) {
      this.$store.commit(`${this.id}/toggleModalVisible`, key);
    },

    getSearchData() {},

  }
};
