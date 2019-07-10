export default {
  created () {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    this.fetchSuccess(this.authInfo);
  },
  data() {
    return {
      form: null,
      loading: false,

      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
      },

      previewVisible: false,
      previewImage: '',
      idCardFront: [],
      idCardBack: [],

      acceptFileTypes: '.png,.jpg,.bmp,.gif',
      uploadAction: '/cmp/v1/upload/batch/Certificates',
    };
  },
  computed: {
    authInfo () {
      return this.$store.state.app.authInfo;
    },
    disabled () {
      return !this.authTypeItem.editAble;
    },
    authTypeItem () {
      const authType = this.$store.state.app.authStatus;
      const authMap = [
        { val: 1, editAble: true, label: '未认证', type: 'info', },
        { val: 2, editAble: false, label: '已认证', type: 'success', },
        { val: 4, editAble: false, label: '认证中', type: 'warning', },
        { val: 5, editAble: true, label: '认证未通过', type: 'error', },
      ];
      return authMap.find(item => item.val == authType) || authMap[0];
    },
  },
  methods: {

    fetchSuccess (resp) {
      
    },

    _validate () {
      return new Promise ((reslove, reject) => {
        this.form.validateFieldsAndScroll((err, values) => {
          err ? reject() : reslove(values);
        });
      })
    },

    handleCancel () {
      this.previewVisible = false
    },

    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },

    handleChange (type, e) {
      const { file, fileList } = e;
      if (file.status === 'error') {
        this.$message.error('上传失败，请重试');
        let index = fileList.findIndex(item => item.uid === file.uid);
        fileList.splice(index, 1);
      }
      this[type] = fileList
    },

    normFile (e) {
      console.log(e);
      if (Array.isArray(e)) {
        return e;
      }
      return e.file.status === 'done' && e.file.response.filePath[0].url;
    },

  }
}