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
      <a-button type="primary" html-type="submit" :disabled="!isValid">Submit</a-button>
    </a-form-item>
    <div v-if="form.childrenForm">
      <a-form
        :form="item"
        @submit="handleSubmit"
        v-for="item in form.childrenForm['fgfe']"
        :key="item._uid"
      >
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
    </div>
  </a-form>
</template>

<script>
import { alterForm } from "@/utils/form";
import dyInput from "../../inputs/DynamicInput.vue";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      form2: [this.$form.createForm(this)],
      formLayout: "horizontal",
      isValid: true
    };
  },
  props: ["inputSet"],
  components: {
    dyInput
  },
  computed: {},
  beforeMount() {},
  mounted() {
    const form = this.form;

    alterForm(form);
    form.addChildForm("fgfe", this.form2);
    console.log(form, this.inputSet);
    this.isValid = form.isValid;
    form.validChanges.subscribe(s => (this.isValid = s));
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.form.getFieldsValue(), this.form2.getFieldsValue());
      this.form.validateFields((err, values) => {
        console.log(err);
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
      // this.form.addChildFormByNumber("fgfe", 1);
    },
    handleChange() {}
  }
};
</script>