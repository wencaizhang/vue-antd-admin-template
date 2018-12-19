export const toggleModalVisible = (state, name = "") => {
  let visible;
  if (name) {
    visible = state.modalVisible[name];
  }
  for (let prop in state.modalVisible) {
    state.modalVisible[prop] = false;
  }
  if (name) {
    state.modalVisible[name] = !visible;
  }
};
export const setHandleRowData = (state, record) => {
  Object.assign(state.handleRowData, record);
};
