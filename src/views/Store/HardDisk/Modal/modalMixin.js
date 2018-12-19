export const baseModalMixins = {
  data() {
    return {
      bodyStyle: { "max-height": "500px", overflow: "auto" },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      }
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("toggleModalVisible", this.name);
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
      form: this.$form.createForm(this)
      
    };
  },
  computed: {
    visible() {
      return this.$store.state.store.modalVisible[this.name];
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit("toggleModalVisible", this.name);
    },
    handleCreate() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.form.resetFields();
        this.handleCancel();
      });
    }
  }
};
