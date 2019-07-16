
import { LOGINFO, ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
export default {
  props: {
    authInfo: Object,
  },
  created () {
    this.form = this.$form.createForm(this);
  },
  mounted () {
    this.fetchSuccess();
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

      // 认证状态
      authStatusMap: [
        { val: 1,  editAble: true,  type: 'info',    label: '未认证' },
        { val: 2,  editAble: true,  type: 'success', label: '个人认证完成' },
        { val: 3,  editAble: true,  type: 'success', label: '企业认证完成' },
        { val: 4,  editAble: false, type: 'warning', label: '个人认证中' },
        { val: 5,  editAble: true,  type: 'error',   label: '个人认证未通过' },
        { val: 6,  editAble: false, type: 'warning', label: '企业认证中' },
        { val: 7,  editAble: true,  type: 'error',   label: '企业认证未通过' },
        { val: 8,  editAble: false, type: 'warning', label: '个人认证修改中' },
        { val: 9,  editAble: false, type: 'warning', label: '企业认证修改中' },
        { val: 10, editAble: true,  type: 'error',   label: '企业认证修改失败' },
        { val: 11, editAble: true,  type: 'error',   label: '个人认证修改失败' },
        { val: 12, editAble: false, type: 'info',    label: '企业未认证' },
      ],
    };
  },
  computed: {
    disabled () {
      return !this.authTypeItem.editAble;
    },
    authStatus () {
      return this.authInfo.authStatus;
    },
    status4P () {
      return this.authStatusMap.filter(item => item.label.includes('个人'));
    },
    status4C () {
      return this.authStatusMap.filter(item => item.label.includes('企业'));
    },

    props () {
      let token = this.$ls.get(LOGINFO)[ACCESS_TOKEN];
      return {
        name:"file",
        listType:"picture-card",
        headers: { 'X-Token': token },
        accept: this.acceptFileTypes,
        action: this.uploadAction,
      }
    }
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
      this[type] = fileList;
    },

    normFile (e) {
      if (Array.isArray(e)) {
        return e;
      }
      if (e.file.status === 'done') {
        // 上传成功
        return e.file.response.filePath[0].url;
      }
      if (e.file.status === 'removed') {
        // 删除文件
        return;
      }
    },

  }
}
