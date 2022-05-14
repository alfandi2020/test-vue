import { createApp } from 'vue'
import App from './App.vue'
// import router from './router_old'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app')
