<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <dyInput
        v-decorator="[
          'note',
          {rules: [{ required: true, min: 7,message: 'Please input your note!' },
          { min: 7, message: '789465' },
          {message: '',/*validator: (r,v,cb) => {cb(2)}*/}
          ]}
        ]"
        :inputOptions="{type:'text'}"
      ></dyInput>
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
      <a-button type="primary" html-type="submit" :disabled="!form.isValid">Submit</a-button>
    </a-form-item>
    <a-form :form="form2" @submit="handleSubmit">
      <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'note',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
        />
      </a-form-item>
      <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-select
          v-decorator="[
          'gender2',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
          placeholder="Select a option and change input text above"
        >
          <a-select-option value="male">male</a-select-option>
          <a-select-option value="female">female</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-form>
</template>

<script>
import { alterForm } from "@/utils";
import dyInput from "../../inputs/DynamicInput.vue";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      formLayout: "horizontal"
    };
  },
  props: ["inputSet"],
  components: {
    dyInput
  },
  computed: {},
  beforeMount() {},
  mounted() {
    console.log(this.inputSet);
    alterForm(this.form);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log(this);
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleChange() {}
  }
};
</script>