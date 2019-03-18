export default {
  methods: {
    handleID() {
      this.formValues = Object.assign({}, this.formValues, {
        secretKeyId: this.currRecord.name
      });
    }
  }
}
