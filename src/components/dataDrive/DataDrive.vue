<template>
  <div v-if="inited">
    <drive-tool></drive-tool>
    <data-viewer v-if="inited">
        <template v-slot:tableAction="{data}">
            <slot name="tableAction" :data="data"></slot>
        </template>
        <template v-slot:tableHeader="{property,value}">
            <slot name="tableHeader" :property="property" :value="value"></slot>
         </template>
         <template v-slot:tableBody="{property,value, record}">
            <slot name="tableBody" :property="property" :value="value" :record="record"></slot>
         </template>
    </data-viewer>
  </div>
</template>
<script>
import DataDriveService from "./shared/services/dataDrive.service.js";
import DataViewer from "./viewers/DataViewer";
import DriveTool from "./DriveTool";

const dataDriveService = DataDriveService.getInstance();
const dataDrive = {};
export default {
  provide: {
    dataDriveService,
    dataDrive
  },
  data() {
    this.dataDriveService = dataDriveService;
    return {
      inited: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 5000);
  },
  props: ["name"],
  components: {
    DataViewer,
    DriveTool
  },
  methods: {
    updateProvideDataDrive(d) {
      if(d) {
Object.assign(dataDrive,d);
      dataDrive.__proto__ = d.constructor.prototype;
      }else {
        dataDrive =null;
      }
    },
    init() {
      const name = this.name,
        dds = this.dataDriveService;
      dds.initDataDrive(this.name).then(dataDrive => {
        if (!dataDrive) {
          return;
        }
        this.updateProvideDataDrive(dataDrive);
        this.inited = true;
        this.dataDrive = dataDrive;
        this.$emit("inited", dataDrive);
        const tableData = (this.tableData = dataDrive.tableData);
        this.isShowModal = dataDrive.observeIsShowModal();
        if (tableData && !tableData.stopFirstInit) {
          dataDrive.isGetingData = true;
          const final = () =>
            setTimeout(() => (dataDrive.isGetingData = false), 200);
          dds.getInitData(dataDrive, true).subscribe(
            ds => {
              dds.initTableData(dataDrive, ds);
              final();
            },
            err => {
              dd.util.errDeal(err);
              final();
            }
          );
        }
      });
    }
  }
};
</script>

<style>
</style>
