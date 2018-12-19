export const baseModalMixins = {
  data() {
    return {
      bodyStyle: { "max-height": "500px", overflow: "auto" },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      confirmLoading: false
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.backups.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("backups/toggleModalVisible", this.name);
    },
    handleCreate() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.handleCancel();
      }, 1000);
    }
  }
};

export const formModalMixins = {
  data() {
    return {
      bodyStyle: { "max-height": "500px", overflow: "auto" },
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      form: this.$form.createForm(this),
      confirmLoading: false
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.backups.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("backups/toggleModalVisible", this.name);
    },
    handleCreate() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.form.resetFields();

        this.confirmLoading = true;
        setTimeout(() => {
          this.confirmLoading = false;
          this.handleCancel();
        }, 1000);
      });
    }
  }
};
