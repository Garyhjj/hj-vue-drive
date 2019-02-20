<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <dyInput
        v-decorator="[
          'note',
          {rules: [{ required: true, min: 7,message: 'Please input your note!' },
          { min: 7, message: '789465' },
          {message: '55654',validator: func(form,function(length) {
      return (ctrl) => {
        let value = ctrl.value;
        if (!value) {
          return null;
        }
        let valueL = value.length;
        return !value || valueL === Number(length)
          ? null
          : {
            length: {
              requiredLength: Number(length),
              actualLength: valueL,
            },
          };
      };
    })}
          ],initialValue: '343435654645'}
        ]"
        :inputOptions="{type:'text'}"
      ></dyInput>
    </a-form-item>
    <a-form-item label="Gender" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-select
        v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }],initialValue: 'male'}
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
      <a-form :form="item" v-for="item in form.childrenForm['fgfe']" :key="item._uid">
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
let id = 0;
export default {
  data() {
    this.func = function(f, validator) {
      return (rule, value, callback) => {
        const { field } = rule;
        Promise.resolve(validator(f.controls[field])).then(b => {
          b && callback("err");
        });
      };
    };
    return {
      form: this.$form.createForm(this),
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
    form.addChildFormByNumber("fgfe", 1);
    console.log(form, this.inputSet);
    this.isValid = form.isValid;
    form.validChanges.subscribe(s => (this.isValid = s));
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(err);
        if (!err) {
          console.log(
            "Received values of form: ",
            this.form.getFieldValue("note")
          );
        }
      });
      // this.form.addChildFormByNumber("fgfe", 1);
    },
    handleChange() {}
  }
};
</script>