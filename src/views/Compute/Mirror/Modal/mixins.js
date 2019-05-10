export default {
  methods: {
    bindId() {
      this.formValues = Object.assign({}, this.formValues, {
        id: this.currRecord.id
      });
    }
  }
}
