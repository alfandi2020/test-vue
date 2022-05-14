
import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Notify,LocalStorage } from "quasar";
// import { router} from 'vue-router'


// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    LocalStorage
  }
}