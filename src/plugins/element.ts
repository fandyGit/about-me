import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const install = (app: App): void => {
  app.use(ElementPlus)
}

export default {
  install
}