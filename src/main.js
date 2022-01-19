import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { makeServer } from "./server"


if (process.env.NODE_ENV === "development") {
  makeServer()
}

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')