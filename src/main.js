import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Form,
  Input,
  Select,
  Spin,
  DatePicker,message,Table,Tag,Divider,Modal,
  Tooltip,Slider,Row,Col
} from "ant-design-vue";
import {
  BehaviorSubject
} from "rxjs";
import router from './router';


import AuthService from './shared/services/auth.service';
import CommonService from './shared/services/common.service';
import EncryptService from './shared/services/encrypt.service';
import CacheService from './shared/services/cache.service';
import DataDriveService from './components/dataDrive/shared/services/dataDrive.service';

import {
  myAxios
} from '@/utils';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    count: 0,
    user: {}
  },
  mutations: {
    increment(state) {
      state.count++
    },
    loginIn(state, user) {
      state.user = user
    }
  }
})


function initRegisterCom(vue) {
  return (com) => {
    const ls = [].concat(com);
    ls.forEach(l => l&& vue.component(l.name, l))
  };
}

const registerCom = initRegisterCom(Vue);
registerCom([Icon, Button, Menu, Menu.SubMenu,
  Menu.Item, Layout, Layout.Header, Layout.Sider,
  Layout.Footer, Layout.Content, Breadcrumb, Breadcrumb.Item,
  Form, Form.Item, Input, Select, Select.Option,Spin,DatePicker,
  DatePicker.WeekPickerker,DatePicker.MonthPicker,DatePicker.RangePicker,
  Table,Tag,Divider,Modal,Tooltip,Slider,Row,Col
]);


Vue.config.productionTip = false;


Vue.prototype.userChanges = new BehaviorSubject(store.state.user);
const authService = {};
const commonService = CommonService.getInstance(false, router, myAxios, message);

const root = new Vue({
  router,
  store,
  render: h => h(App),
  provide: {
    authService,
    commonService
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  watch: {
    user(n) {
      this.userChanges.next(n);
    }
  }
}).$mount('#app');

const auth = AuthService.getInstance(false, myAxios, EncryptService.getInstance(),commonService, root);
Object.assign(authService,auth);
authService.__proto__ = auth.constructor.prototype;
DataDriveService.getInstance(false,myAxios,commonService,authService,CacheService.getInstance());
auth.login({ userName: "gary.h", password: "M-480023" })
      .then(res => {
        console.log(res);
      });