import { createApp } from "vue"
import "virtual:svg-icons-register"
import ElementPlus from "element-plus"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"

import "./style.scss"

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(ElementPlus).mount("#app")
