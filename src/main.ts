import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vAnimate } from './composables/useScrollAnimation'

import './styles/variables.css'
import './styles/portal.css'

const app = createApp(App)
app.use(router)
app.directive('animate', vAnimate)
app.mount('#app')
