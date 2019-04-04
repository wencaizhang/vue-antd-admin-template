import { transToTimestamp } from '@/utils/util'
export default {
  mounted() {
    this.handleRefresh();
  },
  data() {
    return {
      name: "选项",
      pagination: { },
      initPagination: {
        total: 0,     // 数据个数
        current: 1,   // 当前页码
        pageSize: 10, // 每页显示数量
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      },

      url: "/api/demo",

      allData: [],  // 所有的数据
      tempData: [], // 中间处理过程把数据临时存放到 tempData
      data: [],     // 最终要展示在网页上的数据

      loading: false,

      selectedRowKeys: [],
      currRecord: {},

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
      return this.menuOptions.filter(item => item.type === 'batch')
    },
    singleMenuOptions () {
      return this.menuOptions.filter(item => item.type === 'single')
    },
  },
  methods: {
    /**
     * 分页
     */
    getCurrPageData () {
      const { total, current, pageSize  } = this.pagination;
      const begin = (current - 1) * pageSize;
      const end = current * pageSize;
      this.tempData = this.tempData.slice( begin, end );
    },
    handleDATA () {
      this.handleClearSelected()
      // 处理数据：分页，排序，过滤，搜索
      this.tempData = this.allData;

      this.handleCustomData && this.handleCustomData();

      // 页码需要在分页之前
      this.pagination = Object.assign({}, this.pagination, { total: this.tempData.length });

      this.getCurrPageData();  // 分页

      this.loading = true;
      setTimeout(() => {
        this.data = this.tempData;
        this.loading = false;
        this.handleFetchSuccess();
      }, 100);
    },

    handleRefresh() {
      this.pagination = Object.assign({}, this.pagination, this.initPagination);
      this.fetch();
    },

    async fetch (payload={}) {
      this.loading = true;
      this.handleClearSelected();
      try {
        const resp = await this.getList(payload);
        this.allData = this.handleParseData ? this.handleParseData(resp.data) : resp.data;

        resp.data.forEach(item => {
          if (item.createDate) {
            // 计算时间戳
            item.timestamp = transToTimestamp(item.createDate + ':00');
          }
          if (item.status) {
            // 保证状态永远是小写字母
            item.status = item.status.toLowerCase();
          }
        })
        
        this.handleDATA();
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
    handleFetchSuccess () {
      // 数据请求结束后执行
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = Object.assign({}, this.pagination, pagination);
      this.handleDATA();
    },

    onTableSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    handleClearSelected() {
      this.selectedRowKeys = [];
    },

    handleViewDetail(record) {
      this.$store.commit(`${this.id}/setHandleRowData`, record);
      this.$router.push({
        name: `${this.id}-instance`,
        params: { id: record.id }
      });
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
