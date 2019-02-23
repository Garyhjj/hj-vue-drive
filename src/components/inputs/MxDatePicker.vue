<template>
  <div>
    <a-date-picker
      :value="stateValue"
      @change="handleChange"
      v-if="myMode0 === 'day'"
      :placeholder="myPlaceHolder"
      :format="myFormat"
    />
    <a-month-picker
      @change="handleChange"
      :format="myFormat"
      :placeholder="myPlaceHolder"
      v-if="myMode0 === 'month'"
    />
    <a-range-picker
      @change="handleChange"
      :format="myFormat"
      v-if="myMode0 === 'range'"
      :placeholder="myPlaceHolder"
    />
    <a-week-picker
      @change="handleChange"
      :format="myFormat"
      v-if="myMode0 === 'range'"
      :placeholder="myPlaceHolder"
    />
  </div>
</template>
<script>
import * as moment from "moment";

export default {
  data() {
    this.emiting = false;
    const { value } = this.$props;
    this.myPickerFormat0 = "YYYY-MM-DD";
    return {
      stateValue: moment(value),
      myMode0: "day"
    };
  },
  props: [
    "myPickerFormat",
    "value",
    "myMode",
    "myFormat",
    "myShowTime",
    "myPlaceHolder"
  ],
  components: {},
  computed: {},
  watch: {
    value: function(val) {
      if (this.emiting) {
        this.emiting = false;
      } else {
        this.updateInput(val);
      }
    },
    myMode: function(val) {
      this.myMode0 = val || "day";
    },
    myPickerFormat(val) {
        this.myPickerFormat0= val || "YYYY-MM-DD";
    }
  },
  methods: {
    updateInput(value) {
      if (value) {
        if (this.myMode === "range") {
          if (isArray(value)) {
            this.stateValue = value
              .map(v => {
                const m = moment(v);
                if (m.isValid()) {
                  return m;
                } else {
                  return null;
                }
              })
              .filter(v => !!v);
          }
        } else {
          const date = new Date(value);
          if (date.toString() !== "Invalid Date") {
            this.dataString = value;
            this.stateValue = moment(date);
          } else {
            this.stateValue = null;
            setTimeout(() => this.change(null), 20);
          }
        }
      } else {
        if (this._date) {
          this._date = null;
          setTimeout(() => this.change(null), 20);
        }
      }
    },
    change(value) {
      this.emiting = true;
      if (this.myMode === "range" && isArray(value)) {
        this.dataString = value
          .map(v => moment(v).format(this.myPickerFormat0))
          .join(",");
      } else {
        this.dataString = value
          ? moment(value).format(this.myPickerFormat0)
          : "";
      }
      this.$emit("change", this.dataString); // 去触发外部监控的函数
    },
    handleChange(value) {
      this.change(value);
      this.stateValue = value;
    }
  }
};
</script>

<style>
</style>
