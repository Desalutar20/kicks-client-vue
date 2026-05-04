import { createApp } from 'vue'

import './styles.css'
import App from './App.vue'
import { router } from '@/router.ts'
import { createToastflow } from 'vue-toastflow'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/core/lib/tanstack.lib.ts'
import { ConfirmationService } from 'primevue'

const app = createApp(App)

app.use(PrimeVue)
app.use(ConfirmationService)
app.use(
  createToastflow({
    position: 'top-right',
    duration: 5000,
    maxVisible: 5,
  }),
)
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(router)

app.mount('#app')
