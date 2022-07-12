/*
 * @Author: DragonL
 * @Date: 2022-06-10 16:15:39
 * @LastEditors: DragonL
 * @LastEditTime: 2022-06-28 15:43:11
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import getStream from './samples/node-api'
let app = createApp(App)
getStream(app)
app.mount('#app').$nextTick(window.removeLoading)
