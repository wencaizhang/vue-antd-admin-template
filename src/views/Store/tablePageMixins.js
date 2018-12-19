export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      pagination: {
        showSizeChanger: true
      },
      url: "https://randomuser.me/api",
      data: [],
      loading: false,
      
      selectedRowKeys: [],
      handleRowData: {}
    };
  },
  computed: {
    message() {
      let len = this.selectedRowKeys.length;
      return `已选择 ${len} 项`;
    }
  },
  methods: {
    handleRefresh() {
      this.fetch();
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

    fetch(params = {}) {
      this.loading = true;
      let url = this.url;
      this.$http
        .get(url, {
          params: {
            results: 10,
            ...params
          }
        })
        .then(data => {
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.data = data.results;
          this.pagination = pagination;
        });
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    onClearSelected() {
      this.selectedRowKeys = [];
    },

    onSearch(value) {
      console.log(value);
      this.fetch();
    },
    handleSingleMenuClick(record, { key }) {
      const modalName = this.singleOperations[key].modalName;
      this.$store.commit(`${this.name}/toggleModalVisible`, modalName);
    }
  }
};
