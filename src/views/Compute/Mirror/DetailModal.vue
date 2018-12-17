<template>
  <a-modal
    title="基本属性"
    okText="确定"
    :visible="visible"
    :bodyStyle="{ 'max-height': '500px', overflow: 'auto' }"
    :confirmLoading="confirmLoading"
    @cancel="$emit('cancel')"
    @ok="$emit('cancel')"
  >
    <a-table :columns="columns" :dataSource="data" bordered>
    </a-table>
  </a-modal>
</template>
<script>
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
  }
];
export default {
  props: ["record", "visible"],
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5
            }
          };
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        customRender: renderContent
      },
    ];
    return {
      data,
      columns,
      confirmLoading: false
    };
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleCreate() {
      const form = this.formRef.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        this.submit(values);
      });
    },
    submit(values) {
      const form = this.formRef.form;
      this.confirmLoading = true;
      setTimeout(() => {
        // 提交数据成功之后
        this.confirmLoading = false;
        form.resetFields();
        this.$emit("success");
      }, 2000);
    }
  }
};
</script>

