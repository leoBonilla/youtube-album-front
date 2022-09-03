import {createApp} from 'vue'
import {VueQueryPlugin} from "vue-query";
import WaveUI from 'wave-ui'
import App from './App.vue'
import 'wave-ui/dist/wave-ui.css'
import 'material-design-icons/iconfont/material-icons.css'
import './assets/styles.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App)
new WaveUI(app, {
    css: {
        grid: 12
    },
    iconsLigature: 'material-icons'
})
app.use(VueSweetalert2);
app.use(VueQueryPlugin).mount('#app')
