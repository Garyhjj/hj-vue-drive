<template>
  <a-table :columns="columns" :dataSource="data">
    <template v-slot:[item.slots.title] v-for="item in columns">
      <div class="break-word" :key="item.property" :style= "{ fontSize: more.header.textSize}">
      <slot name="tableHeader" :property="item.property" :value="item.value">
          {{item.value}}
        </slot>
        </div>
    </template>

    <template v-slot:[item.scopedSlots.customRender]="value,record" v-for="item in columns">
      <div class="break-word" :key="item.property">
      <slot name="tableBody" :property="item.property" :value="value" :record="record" v-if="item.property!=='Action'">
          {{value}}
      </slot>
      <span v-if="item.property==='Action'">
        <a href="javascript:;">修改</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">删除</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">更新</a>
        <slot name="tableAction" :data="record"></slot>
      </span>
      </div>
    </template>
  </a-table>
</template>
<script>
// const columns = [
//   {
//       property:'TITLE',
//       value:'fdgf4',
//     dataIndex: "TITLE",
//     key: "TITLE",
//     slots: { title: "TITLETitle" },
//     scopedSlots: { customRender: "name" }
//   },
//   {
//       property:'age',
//       value:'AGE',
//     dataIndex: "age",
//      slots: { title: "customTitle4" },
//     key: "age"
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//      slots: { title: "customTitle3" },
//     key: "address"
//   },
//   {
//     title: "Tags",
//     key: "tags",
//     dataIndex: "tags",
//      slots: { title: "customTitle1" },
//     scopedSlots: { customRender: "tags" }
//   },
//   {
//     title: "Action",
//     key: "action",
//      slots: { title: "customTitle2" },
//     scopedSlots: { customRender: "action" }
//   }
// ];

export default {
  inject: ["dataDrive"],
  data() {
    const d = this.dataDrive;
    this.tableData = d.tableData;
    return {
      data: [],
      headers: [
        { property: "a", value: "7895" },
        { property: "b", value: "456123" }
      ],
      columns:[],
      more: d.dataViewSet.more
    };
  },
  beforeCreate() {
  },
  beforeMount() {
    this.bindEvent();
    const d = this.dataDrive;
    this.initTableData(d.tableData.data);
    this.initColumns();
  },
  methods: {
    bindTableData() {
      this.dataDrive.afterDataInit((ds) => {
        // this.tableData.data = this._dataDrive.tableData.data;
        this.allChecked = false;
        // this.updateFilterColumns(true);
        console.log(456)
        this.initTableData(ds);
      });
    },
    bindEvent() {
      this.bindTableData();
    },
    initColumns() {
const columns = this.tableData.columns.map(v => {
      const { property, value } = v;
      return Object.assign(
        {},
        {
          dataIndex: property,
          key: property,
          slots: { title: `${property}Title` },
          scopedSlots: { customRender: `${property}Body` }
        },
        v
      );
    });
    columns.push({
        property: 'Action',
        value: 'Action',
    key: "action",
     slots: { title: "Action" },
    scopedSlots: { customRender: "myAction" }
  })
    this.columns = columns;
    console.log(columns);
    },
    initTableData(data) {
      if (Array.isArray(data)) {
        let i = 1;
        this.data = [].concat(
          data.map(bs => {
            const originalData = bs.originalData;
            const { ID } = originalData;
            return Object.assign(
              {},
              {
                key: ID || ++i
              },
              originalData
            );
          })
        );
      } else {
        this.data = [];
      }
      console.log(this.data,789);
    }
  }
};
</script>
<style>
.break-word {
  word-break: break-word;
}
</style>
