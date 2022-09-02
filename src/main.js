import { createApp } from 'vue'
import { VueQueryPlugin } from "vue-query";
import WaveUI from 'wave-ui'
import App from './App.vue'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
const app = createApp(App)
new WaveUI(app, {
    css: {
        grid: 12
      }
  })
  
app.use(VueQueryPlugin).mount('#app')
