import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Icon,Form,Input,Select
} from "ant-design-vue";
import router from './router'


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
  render: h => h(App),
}).$mount('#app')