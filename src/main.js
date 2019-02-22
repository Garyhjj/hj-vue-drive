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
  Select
} from "ant-design-vue";
import {
  BehaviorSubject
} from "rxjs";
import router from './router';


import authService from './shared/services/auth.service';
import commonService from './shared/services/common.service';
import encryptService from './shared/services/encrypt.service';

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
    ls.forEach(l => vue.component(l.name, l))
  };
}

const registerCom = initRegisterCom(Vue);
registerCom([Icon, Button, Menu, Menu.SubMenu,
  Menu.Item, Layout, Layout.Header, Layout.Sider,
  Layout.Footer, Layout.Content, Breadcrumb, Breadcrumb.Item,
  Form, Form.Item, Input, Select, Select.Option
]);


Vue.config.productionTip = false;


Vue.prototype.userChanges = new BehaviorSubject(store.state.user);

const root = new Vue({
  router,
  store,
  render: h => h(App),
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


authService.getInstance(false, myAxios, encryptService.getInstance(), commonService.getInstance(false, router), root)