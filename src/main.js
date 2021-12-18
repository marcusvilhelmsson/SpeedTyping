import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import "../public/scss/_style.scss";

library.add(fas)
library.add(fab)

const app = createApp(App)
app.mount('#app')

