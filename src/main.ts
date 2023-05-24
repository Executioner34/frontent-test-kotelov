import { createApp } from "vue"
import "virtual:svg-icons-register"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"

import "./style.scss"

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount("#app")
