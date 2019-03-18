export default {
  methods: {
		handleID () {
			this.formValues = Object.assign({}, this.formValues, {
        instanceId: this.currRecord.id
      });
		}
  }
}
