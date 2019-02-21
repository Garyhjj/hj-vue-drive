import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Icon,Form,Input,Select
} from "ant-design-vue";
import router from './router';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    user: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    login(state,user) {
      state.user = user
    }
  }
})
store.commit('increment')

console.log(store.state.count) // -> 1
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
  Form,Form.Item,Input,Select,Select.Option]);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')