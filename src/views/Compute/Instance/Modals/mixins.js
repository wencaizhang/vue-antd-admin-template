export default {
  methods: {
		bindId () {
			this.formValues = Object.assign({}, this.formValues, {
        instanceId: this.currRecord.id
      });
		}
  }
}
