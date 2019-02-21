<template>
  <div>
    <div v-if="inputOptions">
      <a-input
        :placeholder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        v-if="inputOptions.type === 'text'"
        @change="handleChange()"
        v-model="stateValue"
      ></a-input>
      <mx-select
        @change="handleChange()"
        v-model="stateValue"
        v-if="inputOptions.type === 'select'"
        :placeholder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        :options="more.options"
        :lazyAPI="more.lazyAPI"
        :lazyParams="more.lazyParams"
      ></mx-select>
    </div>
  </div>
</template>
<script>
import { Input } from "ant-design-vue";
import MxSelect from "./MxSelect.vue";

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
    [Input.name]: Input
  },
  methods: {
    handleChange() {
      this.$emit("change", this.stateValue);
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
