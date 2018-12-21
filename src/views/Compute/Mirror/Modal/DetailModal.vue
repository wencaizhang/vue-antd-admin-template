<template>
  <a-modal
    @cancel="handleCancel"
    @ok="handleCreate"
    :visible="visible"
    :confirmLoading="confirmLoading"
    title="基本属性"
    okText="确定"
  >
    <a-table :columns="columns" :dataSource="data" bordered></a-table>
  </a-modal>
</template>
<script>
import { baseModalMixins } from "@/utils/mixins/modalMixin";

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
    age: 32
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18
  },
  {
    key: "5",
    name: "Jake White",
    age: 18
  }
];
export default {
  mixins: [baseModalMixins],
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
      }
    ];
    return {
      name: "detail",
      data,
      columns,
      confirmLoading: false
    };
  },
  methods: {}
};
</script>

