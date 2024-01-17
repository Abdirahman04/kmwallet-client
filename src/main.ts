import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./assets/global.css"

import 'jquery'
import 'popper.js'
import 'bootstrap'

createApp(App).use(router).mount('#app')
