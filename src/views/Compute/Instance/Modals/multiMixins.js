export default {
  data() {
    return {
      list: [],
      some: 0,
      handleItemCount: 0,
      isRefreshParentTable: false,
      availableStatus: [] 
    };
  },
  methods: {

    onShow () {
      this.availableStatus = this.$parent.menuOptions.find(item => item.id === this.name).availableStatus;

      this.confirmLoading  = false;
      const selectedList   = this.$parent.data.filter(item => {
        return this.$parent.selectedRowKeys.includes(item.id)
      })
      this.handleItemCount = selectedList.filter(item => this.availableStatus.includes(item.status)).length;
      this.some = this.handleItemCount;
      this.list  = selectedList;
    },
    handleFetch () {
      this.handleLoopFetchStart();
    },
    handleLoopFetchStart() {
      /**
       * 遍历发送请求
       * Promise.all 只要有一个失败就直接返回失败的结果，所以使用遍历
       */
      if (!this.list.length || !this.handleItemCount) { return;}
      this.confirmLoading = true;
      this.list.forEach(item => {
        this.availableStatus.includes(item.status) && this.handleItemFetch(item);
      })
    },
    handleLoopFetchEnd () {
      // 所有请求全部结束
      this.confirmLoading = false;
      // this.$message.success('操作完成');
      // this.handleCancel();
    },
    async handleItemFetch (item) {
      try {
        const payload = { instanceId: item.id }
        const resp = await this.fetchAPI(payload);
      }
      catch (err) {

      }
      finally {
        this.$parent.handleTraceStatus(item.id)
        this.handleItemCount = this.handleItemCount - 1;
        if (this.handleItemCount === 0) {
          this.handleLoopFetchEnd();
        }
      }
    },
  }
}