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
      confirmLoading: false
    };
  },
  computed: {
    visible() {
      console.log(this.$parent.id, this.name)
      const visible = this.$store.getters[`${this.$parent.id}/getVisibleById`](this.name);
      return visible;
    }
  },
  methods: {
    handleCancel() {
      this.$store.commit(`${this.$parent.id}/toggleModalVisible`, this.name);
    },
    handleCreate() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.handleCancel();
      }, 1000);
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
      form: this.$form.createForm(this)
    };
  },

  methods: {
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
