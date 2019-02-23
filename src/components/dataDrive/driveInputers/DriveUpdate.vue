<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item
      :label="item.label"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      v-for="item in inputSet"
      :key="item.property"
    >
      <dy-input
        v-decorator="[
           item.property,
          {rules: item.registerValidators(form),initialValue: item.default,validateFirst: true}
        ]"
        :inputOptions="item.inputOptions"
      ></dy-input>
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
    {{userName}}
  </a-form>
</template>

<script>
import { alterForm } from "@/utils/form";
import validators from "../../../shared/services/validatorExtend.service";
import authService from "../../../shared/services/auth.service";
import encryptUtilService from "../../../shared/services/encrypt.service.js";
import DyInput from "../../inputs/DynamicInput.vue";
import { myAxios } from "@/utils";

const eee = encryptUtilService.getInstance();
function getNewToken(userName, password) {
  let enUsername = eee.AesEncrypt(userName, eee.key, eee.iv);
  let enPassword = eee.AesEncrypt(password, eee.key, eee.iv);
  return { userName: enUsername, password: enPassword };
}

let id = 0;
export default {
  data() {
    const form = this.$form.createForm(this);
    alterForm(form);
    this.vali = validators.getInstance().maxLength(20);
    this.func = function(f, validator) {
      return (rule, value, callback) => {
        const { field } = rule;
        Promise.resolve(validator(f.controls[field])).then(b => {
          callback(!b ? [] : "err");
        });
      };
    };
    return {
      form,
      formLayout: "horizontal",
      isValid: true
    };
  },
  props: ["inputSet"],
  components: {
    DyInput
  },
  beforeMount() {
    authService
      .getInstance()
      .login({ userName: "gary.h", password: "M-480023" })
      .then(res => {
        console.log(res);
      });
  },
  mounted() {
    const form = this.form;
    form
      .addChildFormByNumber("fgfe", 1)
      .then(f => f[0].controls["note"].setValue(478463)).then(() => {
// setTimeout(() => form.controls['note6'].setValue('FE716'),20000)
      });
    console.log(form, this.inputSet);
    this.isValid = form.isValid;
    form.validChanges.subscribe(s => (this.isValid = s));
  },
  computed: {
    userName() {
      return this.$store.state.user.USER_NAME;
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.form.value);
      this.form.validateFields((err, values) => {
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