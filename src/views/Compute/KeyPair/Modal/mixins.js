export default {
  methods: {
    bindId() {
      this.formValues = Object.assign({}, this.formValues, {
        secretKeyId: this.currRecord.id || ''
      });
    }
  }
}
