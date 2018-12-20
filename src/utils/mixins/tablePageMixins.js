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
      // url: "/api",
      url: "https://www.easy-mock.com/mock/5bcef2cec8d32e559a452810/example/demo",
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
    },
    columns() {
      return this.$store.state.store[this.id].columns;
    },
    singleOperations() {
      return this.$store.state.store[this.id].singleOperations;
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
    handleClearSelected() {
      this.selectedRowKeys = [];
    },

    onSearch(value) {
      console.log(value);
      this.fetch();
    },
    handleCreate() {
      this.$store.commit(`${this.id}/toggleModalVisible`, "create");
    },
    handleViewDetail(record) {
      this.$store.commit(`${this.id}/setHandleRowData`, record);
      this.$router.push({
        name: "diskInstance",
        params: { id: record.id.value || "abcdef" }
      });
    },
    handleSingleMenuClick(record, { key }) {
      const id = this.singleOperations[key].id;
      this.$store.commit(`${this.id}/toggleModalVisible`, id);
    },
    handleBatchDelete() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.info(`请先选择您要操作的${this.name}`);
        return;
      }
      this.showBatchDeleteModal();
    },
    _showBatchDeleteModal() {
      const vm = this;
      const h = this.$createElement;
      const vnode = h(
        "ul",
        this.selectedRowKeys.map(item => {
          return h("li", item);
        })
      );

      // 批量删除
      this.$confirm({
        title: `您已经选择了下列${this.name}，即将进行删除，请确认你的操作。`,
        content: vnode,
        iconType: "warning",
        okText: "删除",
        okType: "danger",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
          })
            .then(() => {
              const indexs = vm.selectedRowKeys.map(key => {
                return vm.data.findIndex(item => item.cell == key);
              });
              vm._deleteData(indexs);
            })
            .catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
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
