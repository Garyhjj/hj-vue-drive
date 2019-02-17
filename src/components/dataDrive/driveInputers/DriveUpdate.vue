<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="[
          'note',
          {rules: [{ required: true, message: 'Please input your note!' },
          { min: 7, message: '789465' }
          ]}
        ]"
        @change="handleChange('note')"
      />
    </a-form-item>
    <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
        placeholder="Select a option and change input text above"
        @change="handleChange('gender')"
      >
        <a-select-option value="male">male</a-select-option>
        <a-select-option value="female">female</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" :disabled="!isValid">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { isNil } from "@/utils";
import {formMixins} from '@/utils/mixins'
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const changeSubject = new Subject();

export default {
  mixins: [
    formMixins
  ],
  data() {
    return {
      formLayout: "horizontal",
    };
  },
  props: ["inputSet"],
  computed: {},
  beforeMount() {
  },
  mounted() {
    
  },
  methods: {
    handleChange(key) {
      console.log(key, this.form);
      // this.changeSet.add(key);
      // changeSubject.next(this.changeSet);
      // this.$nextTick(() => this.calValid(key))
      // this.form.setFieldsValue({
      //   note: `Hi, ${45 === "male" ? "man" : "lady"}!`
      // });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value, this.form);
      window["form1"] = this.form;
      //   this.form.setFieldsValue({
      //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      //   });
    }
  }
};
</script>