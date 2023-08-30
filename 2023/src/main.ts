import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const locations = {
  "morten": {
    "one": [55.83586804837251, 12.270102782277808],
    "two": [55.83636084800567, 12.270125653891546]
  },
  "nicolai": {
    "one": [55.842241038500816, 12.42550192368334],
    "two": [55.8426482781694, 12.42579507996865]
  }
}


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
