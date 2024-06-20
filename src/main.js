import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './plugin/globalComponent'
import './assets/css/bootstrap-grid.min.css'
import './assets/css/main.css'
import axios from './plugin/axios'
import VueAxios from 'vue-axios'
import HeaderTitle from '@/components/layout/HeaderTitle.vue'
import vueDebounce from 'vue-debounce'
import Vue3Marquee from 'vue3-marquee'
document.title = 'Dashboard'

createApp(App)
.directive('debounce', vueDebounce({ lock: true }))
.use(store)
.use(router)
.use(components)
.use(Vue3Marquee)
.use(VueAxios, axios)
.component('header-title', HeaderTitle)
.mount('#app')