<template>
  <a-table :columns="columns" :dataSource="data">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
<span :slot="item.slots.title" v-for="item in columns" :key="item.key">
    <slot name="header" :property="item.property" :value="item.value">{{item.value}}</slot>
</span>

    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
    <template v-slot:action="data">
      <span>
        <a href="javascript:;">Invite 一 {{data.name}}</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">Delete</a>
        <a-divider type="vertical"/>
        <a href="javascript:;" class="ant-dropdown-link">More actions
          <a-icon type="down"/>
        </a>
      </span>
      <slot name="action" :data="data"></slot>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
      property:'name',
      value:'NAME',
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle5" },
    scopedSlots: { customRender: "name" }
  },
  {
      property:'age',
      value:'AGE',
    dataIndex: "age",
     slots: { title: "customTitle4" },
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
     slots: { title: "customTitle3" },
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
     slots: { title: "customTitle1" },
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
     slots: { title: "customTitle2" },
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export default {
  data() {
      console.log(this.$slots,this)
    return {
      data,
      columns,
      headers:[{property:'a',value:'7895'},{property:'b',value:'456123'}]
    };
  }
};
</script>
