<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <dy-input
        v-decorator="[
          'note',
          {rules: inputSet[0].registerValidators(form),initialValue: '3434',validateFirst: true}
        ]"
        :inputOptions="inputSet[0].inputOptions"
      ></dy-input>
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
    {{userName}}
  </a-form>
</template>

<script>
import { alterForm } from "@/utils/form";
import validators from "../../../shared/services/validatorExtend.service";
import encryptUtilService from "../../../shared/services/encrypt.service.js"
import DyInput from "../../inputs/DynamicInput.vue";
import axios from "axios";

const eee = encryptUtilService.getInstance();
function getNewToken(userName, password) {
    let enUsername = eee.AesEncrypt(
      userName,
      eee.key,
      eee.iv,
    );
    let enPassword = eee.AesEncrypt(
      password,
      eee.key,
      eee.iv,
    );
    return { userName: enUsername, password: enPassword };
  }
var instance = axios.create({
baseURL: 'https://miwebapi.mic.com.cn/',
timeout: 1000*60,
headers: {'Content-Type': 'application/json; charset=utf-8'}
});

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
  computed: {},
  beforeMount() {
    instance.post("global/login",getNewToken("gary.h","M-480023")).then((res) => {
  console.log(res);
  this.$store.commit('login',res.data.User);
  console.log(this.$store)
})
  },
  mounted() {
    const form = this.form;
    form
      .addChildFormByNumber("fgfe", 1)
      .then(f => f[0].controls["note"].setValue(478463));
    console.log(form, this.inputSet);
    this.isValid = form.isValid;
    form.validChanges.subscribe(s => (this.isValid = s));
  },
  computed: {
    userName(){
      return this.$store.state.user.USER_NAME;
    }
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