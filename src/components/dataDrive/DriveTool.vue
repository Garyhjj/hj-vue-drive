<template>
  <div>
    <a-tooltip placement="top" title="字体大小">
      <a-button size="small" @click="showFontSet">
        <a-icon type="bold"/>
      </a-button>
    </a-tooltip>

    <a-modal title="字体调整" v-model="fontVisible" :footer="null">
      <a-row type="flex">
        <a-col :span="6">
          <div class="flex-center">
            <div>栏位字体：</div>
          </div>
        </a-col>
        <a-col :span="18">
          <a-slider
            v-model="headerFontSize"
            :min="10"
            :max="60"
            :defaultValue="30"
            @afterChange="changeHeaderFontSize"
          />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  inject: ["dataDrive"],
  data() {
    return {
      fontVisible: false,
      headerFontSize: 14
    };
  },
  beforeMount() {
    this.initFontSize();
  },
  methods: {
    showFontSet() {
      this.fontVisible = true;
    },
    changeHeaderFontSize(v) {
      this.changeViewHeaderSize();
    },
    changeViewHeaderSize() {
      this.viewerType = this.dataDrive.dataViewSet.type;
      const size = this.headerFontSize + "px";
      switch (this.viewerType) {
        case "table":
          this.dataDrive.dataViewSet.changeHeaderFontSize(size);
          this.dataDrive.updateSelfSetStore({ headerFontSize: size });
          break;
      }
    },
    initFontSize() {
      const setStore = this.dataDrive.getSetStore();
      if (typeof setStore === "object" && setStore) {
        if (setStore.headerFontSize) {
          this.headerFontSize = Number(
            setStore.headerFontSize.replace("px", "")
          );
          this.changeViewHeaderSize();
        }
        if (setStore.bodyFontSize) {
          this.bodyFontSize = Number(setStore.bodyFontSize.replace("px", ""));
          this.changeBodySize();
        }
      }
    }
  }
};
</script>

<style>
.flex-center {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 37px;
  line-height: 30px;
}
</style>
