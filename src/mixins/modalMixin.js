export const baseModalMixins = {
  data() {
    return {
      module: '',
      bodyStyle: { "max-height": "400px", overflow: "auto" },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
      },
      confirmLoading: false,
      formValues: {},  // 存放表单数据，可以
      currRecord: {},  // 单项操作时的数据
      fetchAPI: () => {},
      isRefreshParentTable: true, // 刷新父组件表格

      loop: false,  // 是否遍历发送请求
      list: [],  // 遍历数据数组
      handleItemCount: 0,  // 数据个数
    };
  },
  computed: {
    visible() {
      const visible = this.$store.getters[`${this.$parent.id}/getVisibleById`](this.name);
      return visible;
    }
  },
  watch: {
    visible (newVal, oldVal) {
      if (newVal) {
        this.currRecord = this.$parent.currRecord || {};
        this.handleID();
        this.onShow();
      } else {
        this.form && this.form.resetFields();
        this.onHidden();
      }
    }
  },
  methods: {
    handleID () {
      // 不同模块下调用 api 时需要传递不同的 id
    },
    onShow () {
      // 自定义钩子函数～～
      // 显示 modal 之后触发，参见 watch.visible
    },
    onHidden () {
      // 自定义钩子函数～～
      // 隐藏 modal 之后触发，参见 watch.visible
    },
    handleCancel() {
      this.$store.commit(`${this.$parent.id}/toggleModalVisible`, this.name);
    },
    handleCreate() {
      this.handleFetch();
    },
    async handleFetch() {

      if (this.loop) {
        this.handleLoopFetchStart();
        return false;
      }

      this.confirmLoading = true;
      try {
        const resp = await this.fetchAPI(this.formValues);
        this.handleCancel();
        this.openNotification(resp);
        this.handleRefreshParentTable();
      }
      catch (err) {
        this.handleFetchFailed (err);
      }
      finally {
        this.confirmLoading = false;
        // this.handleCancel();
      }
    },
    handleFetchFailed (err) {
      // 请求失败处理函数
    },
    handleRefreshParentTable () {
      this.isRefreshParentTable ? this.$parent.handleRefresh() : '';
    },
    openNotification(resp) {
      this.$message.success(resp.desc || '操作成功');
    },
    formatter(postfix, value) {
      return parseInt(value) + " " + postfix;
    },
    parser(value) {
      return parseInt(value);
    },

    handleLoopFetchStart() {
      /**
       * 遍历发送请求
       * Promise.all 只要有一个失败就直接返回失败的结果，所以使用遍历
       */
      if (!this.list.length || !this.handleItemCount) { return;}
      this.confirmLoading = true;
      this.list.forEach(item => {
        this.handleItemFetch(item);
      })
    },
    handleLoopFetchEnd () {
      // 所有请求全部结束
      this.confirmLoading = false;
      this.$message.success('操作完成');
      this.handleRefreshParentTable();
      this.handleCancel();
    },
    // async handleItemFetch (item) {
    //   try {
    //     const payload = { routerId: item.id }
    //     const resp = await this.fetchAPI(payload);
    //   }
    //   catch (err) {

    //   }
    //   finally {
    //     this.handleItemCount = this.handleItemCount - 1;
    //     if (this.handleItemCount === 0) {
    //       this.handleLoopFetchEnd();
    //     }
    //   }
    // },
  }
};

export const formModalMixins = {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this),
    };
  },

  methods: {
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.handleFetch();
        }
      });
    },
  }
};
