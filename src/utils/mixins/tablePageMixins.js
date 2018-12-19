export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      pagination: {
        showSizeChanger: true
      },
      url    : "https://randomuser.me/api",
      data   : [],
      loading: false,
      
      selectedRowKeys: [],
      handleRowData  : {}
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
      const pager           = { ...this.pagination };
            pager.current   = pagination.current;
            this.pagination = pager;
      this.fetch({
        results  : pagination.pageSize,
        page     : pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },

    fetch(params = {}) {
          this.loading = true;
      let url          = this.url;
      this.$http
        .get(url, {
          params: {
            results: 10,
            ...params
          }
        })
        .then(data => {
          const pagination       = { ...this.pagination };
                pagination.total = 200;
                this.loading     = false;
                this.data        = data.results;
                this.pagination  = pagination;
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
    },
    _deleteData(indexs = []) {
      if (!indexs.length) return;
      // 数组删除一个元素之后，索引会发生变化。所以要对删除目标的索引进行处理。
      const parseIndexs = indexs.map((item, index) => item - index);
      const keys = parseIndexs.map(index => {
        const key = this.data[index].cell;
        this.data.splice(index, 1);
        return key;
      });
      this.$message.success("删除成功！");
      this._updateSelectedRowKeys(keys);
    },
    _updateSelectedRowKeys(keys) {
      // 删除后需要更新 selectedRowKeys
      keys.forEach(key => {
        let index = this.selectedRowKeys.findIndex(item => item === key);
        if (index !== -1) {
          this.selectedRowKeys.splice(index, 1);
        }
      });
    }
  }
};
