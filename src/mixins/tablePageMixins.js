export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      name: "选项",
      pagination: {
        showSizeChanger: true
      },
      url: "/api/demo",
      data: [],
      loading: false,

      selectedRowKeys: [],
      currRecord: {}
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
    handleRefresh() {
      this.handleClearSelected();
      this.fetch();
    },

    async fetch () {
      this.loading = true;
      try {
        const resp = await this.getList(this.payload);
        this.data = this.handleParseData ? this.handleParseData(resp.data) : resp.data
        // 数据只有一页时不显示分页
        if (resp.totalPage > 1) {
          this.pagination.total = resp.totalPage;
        } else {
          this.pagination = false;
        }
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
    handleFetchSuccess () {

    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },

    onTableSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },

    handleClearSelected() {
      this.selectedRowKeys = [];
    },

    onSearch(value) {
      // this.fetch();
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
    }
  }
};
