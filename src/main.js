import Vue from 'vue'
import App from './App.vue'
import CoreuiVue from '@coreui/vue' //
import { iconsSet as icons } from './assets/icons/icons.js' // สำหรับเรียกใช้ CIcon

// 1. โหลด CSS หลัก
import '@coreui/coreui/dist/css/coreui.min.css' 

// 2. ลงทะเบียน Component ทั้งหมดของ CoreUI แบบ Global
Vue.use(CoreuiVue) 

new Vue({
  el: '#app',
  icons,
  render: h => h(App)
})