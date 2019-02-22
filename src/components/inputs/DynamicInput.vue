<template>
  <div>
    <div v-if="inputOptions">
      <a-input
        :placeholder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        v-if="inputOptions.type === 'text'"
        @change="handleChange(stateValue)"
        v-model="stateValue"
      ></a-input>
      <mx-select
        @change="handleChange"
        v-model="stateValue"
        v-if="inputOptions.type === 'select'"
        :placeholder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        :options="more.options"
        :lazyAPI="more.lazyAPI"
        :lazyParams="more.lazyParams"
      ></mx-select>
      <colleague-searcher @change="handleChange"
        v-model="stateValue" v-if="inputOptions.type === 'colleagueSearcher'"
        :miPlaceHolder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        :miDisabled="more.editable"
        :miPickerFormat="more.pickerFormat"
        :miSearchFilter="more.searchFilter"
        ></colleague-searcher>
    </div>
  </div>
</template>
<script>
import { Input } from "ant-design-vue";
import MxSelect from "./MxSelect.vue";
import ColleagueSearcher from "./ColleagueSearcher.vue";

export default {
  data() {
    var _$props = this.$props,
      value = _$props.value;
    return {
      stateValue: value
    };
  },
  props: ["inputOptions", "value"],
  components: {
    [Input.name]: Input,
    MxSelect,
    ColleagueSearcher
  },
  computed: {
    more() {
      return this.inputOptions.more;
    }
  },
  methods: {
    handleChange(v) {
      this.$emit("change", v);
    }
  },
  watch: {
    value: function value(val) {
      this.stateValue = val;
    }
  }
};
</script>

<style>
</style>
