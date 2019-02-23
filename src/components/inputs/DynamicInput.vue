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
      <colleague-searcher
        @change="handleChange"
        v-model="stateValue"
        v-if="inputOptions.type === 'colleagueSearcher'"
        :miPlaceHolder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        :miDisabled="more.editable"
        :miPickerFormat="more.pickerFormat"
        :miSearchFilter="more.searchFilter"
      ></colleague-searcher>
      <mx-date-picker
        @change="handleChange"
        v-model="stateValue"
        v-if="inputOptions.type === 'datePicker'"
        :myPickerFormat="more.pickerFormat"
        :myFormat="more.showFormat"
        :myShowTime="more.showTime"
        :myPlaceHolder="inputOptions.placeHolder"
        :myMode="more.showMode"
      ></mx-date-picker>
    </div>
  </div>
</template>
<script>
import MxSelect from "./MxSelect.vue";
import ColleagueSearcher from "./ColleagueSearcher.vue";
import MxDatePicker from "./MxDatePicker.vue";

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
    MxSelect,
    ColleagueSearcher,
    MxDatePicker
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
      console.log(val);
      this.stateValue = val;
    }
  }
};
</script>

<style>
</style>
