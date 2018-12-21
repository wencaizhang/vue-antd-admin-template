export const baseModalMixins = {
  props: ["module"],
  data() {
    return {
      bodyStyle: { "max-height": "400px", overflow: "auto" },
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
      const visible = this.$store.getters[`${this.module}/getVisibleById`](this.name);
      return visible;
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit(`${this.module}/toggleModalVisible`, this.name);
    },
    handleCreate() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.handleCancel();
      }, 1000);
    },
    formatter(postfix, value) {
      return parseInt(value) + " " + postfix;
    },
    parser(value) {
      return parseInt(value);
    }
  }
};

export const formModalMixins = {
  props: ["module"],
  data() {
    return {
      bodyStyle: { "max-height": "400px", overflow: "auto" },
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
      const visible = this.$store.getters[`${this.module}/getVisibleById`](this.name);
      return visible;
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit(`${this.module}/toggleModalVisible`, this.name);
    },
    handleCreate() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);

        this.confirmLoading = true;
        setTimeout(() => {
          this.confirmLoading = false;
          this.handleCancel();
          this.form.resetFields();
        }, 1000);
      });
    }
  }
};
