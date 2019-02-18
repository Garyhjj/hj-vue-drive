<template>
  <div>
    <div v-if="inputOptions">
      <a-input
        :placeholder="inputOptions.placeHolder?inputOptions.placeHolder:' '"
        v-if="inputOptions.type === 'text'"
        @change="handleChange()"
        v-model="value"
      ></a-input>
    </div>
  </div>
</template>
<script>
import { Input } from "ant-design-vue";
export default {
  data() {
    return {
      value: ""
    };
  },
  props: ["inputOptions"],
  components: {
    [Input.name]: Input
  },
  methods: {
    handleChange() {
      this.$emit("change", this.value);
    }
  }
};
</script>

<style>
</style>
