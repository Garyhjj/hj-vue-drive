import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('@/views/Home');
const Esd = () => import('@/views//board/Esd');
// import Address from '@/views/Address'
// import OrderConfirm from '@/views/OrderConfirm'
// import OrderSuccess from '@/views/OrderSuccess'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/board/esd',
            component: Esd
        }
    ]
})