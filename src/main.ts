import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles.css'
import App from './App.vue'
import { router } from '@/router.ts'
import { PiniaColada, PiniaColadaQueryHooksPlugin } from '@pinia/colada'
import { createToastflow } from 'vue-toastflow'
import { handleApiError } from '@/core/utils/handle-api-error.util.ts'
import { QUERY_KEYS } from '@/core/const/query-keys.const.ts'

const app = createApp(App)

app.use(
  createToastflow({
    position: 'top-right',
    duration: 5000,
    maxVisible: 5,
  }),
)

app.use(createPinia())
app.use(PiniaColada, {
  plugins: [
    PiniaColadaQueryHooksPlugin({
      onError: (error, entry) => {
        handleApiError(error, (err) => err.status === 401 && entry.key === QUERY_KEYS.getProfile)
      },
    }),
  ],
  queryOptions: {
    refetchOnWindowFocus: false,
  },
  mutationOptions: {
    onError: (error) => handleApiError(error),
  },
})
app.use(router)

app.mount('#app')
