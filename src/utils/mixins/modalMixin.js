export const baseModalMixins = {
  data() {
    return {
      module: '',
      bodyStyle: { "max-height": "400px", overflow: "auto" },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      confirmLoading: false,
      formValues: {},
      currRecord: {},
      fetchAPI: () => {},
      isRefreshParentTable: true, // 刷新父组件表格
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
        this.currRecord = this.$parent.currRecord;
        this.handleID();
        this.onShow();
      } else {
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
      this.form && this.form.resetFields();
    },
    handleCancel() {
      this.$store.commit(`${this.$parent.id}/toggleModalVisible`, this.name);
    },
    handleCreate() {
      this.handleFetch();
    },
    async handleFetch() {
      this.confirmLoading = true;
      try {
        console.log('this.formValues', this.formValues)
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
      this.$message.success(resp.desc);
      // this.$notification.open({
      //   message: "提醒",
      //   description: desc,
      //   icon: <a-icon type="check-circle" style="color: #52c41a" />
      // });
    },
    formatter(postfix, value) {
      // let v = parseInt(value);
      // if (isNaN(v)); {
      //   console.log('value', '---', v, '---', v==='')
      //   return '';
      // }
      return parseInt(value) + " " + postfix;
    },
    parser(value) {
      return parseInt(value);
    }
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
      this.form.validateFields((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          self.handleFetch();
        }
      });
    },
  }
};
