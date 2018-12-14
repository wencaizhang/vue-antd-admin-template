<template>
  <a-modal
    title="云主机/bkv4 概况"
    okText="确定"
    :visible="visible"
    :bodyStyle="{ 'max-height': '500px', overflow: 'auto' }"
    :confirmLoading="confirmLoading"
    @cancel="$emit('cancel')"
    @ok="$emit('cancel')"
  >
    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
      <template slot="action" slot-scope="text, record">
        <span>
          <a href="javascript:;">Action 一 {{record.name}}</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">Delete</a>
          <a-divider type="vertical"/>
          <a href="javascript:;" class="ant-dropdown-link">More actions
            <a-icon type="down"/>
          </a>
        </span>
      </template>
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
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park"
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park"
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
      // {
      //   title: "Home phone",
      //   colSpan: 2,
      //   dataIndex: "tel",
      //   customRender: (value, row, index) => {
      //     const obj = {
      //       children: value,
      //       attrs: {}
      //     };
      //     if (index === 2) {
      //       obj.attrs.rowSpan = 2;
      //     }
      //     // These two are merged into above cell
      //     if (index === 3) {
      //       obj.attrs.rowSpan = 0;
      //     }
      //     if (index === 4) {
      //       obj.attrs.colSpan = 0;
      //     }
      //     return obj;
      //   }
      // },
      // {
      //   title: "Phone",
      //   colSpan: 0,
      //   dataIndex: "phone",
      //   customRender: renderContent
      // },
      {
        title: "Address",
        dataIndex: "address",
        customRender: renderContent
      }
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

