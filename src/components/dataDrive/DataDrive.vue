<template>
  <div>dataDrive
    <data-viewer>
        <template v-slot:action="{data}">
            {{data.name}}
        </template>
    </data-viewer>
  </div>
</template>
<script>
import DataDriveService from "./shared/services/dataDrive.service.js";
import DataViewer from "./viewers/DataViewer";

const dataDriveService = DataDriveService.getInstance();

export default {
  provide: {
    dataDriveService
  },
  data() {
    this.dataDriveService = dataDriveService;
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 5000);
  },
  props: ["name"],
  components: {
    DataViewer
  },
  methods: {
    init() {
      const name = this.name,
        dds = this.dataDriveService;
      dds.initDataDrive(this.name).then(dataDrive => {
        console.log(dataDrive, this);
        if (!dataDrive) {
          return;
        }
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
