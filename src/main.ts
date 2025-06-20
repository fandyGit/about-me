import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlusPlugin from './plugins/element'
import router from './router'

const app = createApp(App)
app.use(router)
app.use(ElementPlusPlugin)
app.mount('#app')
