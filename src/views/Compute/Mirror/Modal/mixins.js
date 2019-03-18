export default {
  methods: {
    handleID() {
      this.formValues = Object.assign({}, this.formValues, {
        id: this.currRecord.id
      });
    }
  }
}
