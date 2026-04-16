<script setup lang="ts">
import { PiniaColadaDevtools } from '@pinia/colada-devtools'
import { ToastContainer } from 'vue-toastflow'
import { useGetProfile } from '@/core/composables/use-get-profile.ts'
import Spinner from '@/core/components/ui/Spinner.vue'

const { asyncStatus } = useGetProfile()
</script>

<template>
  <ToastContainer />
  <div v-if="asyncStatus === 'loading'" :class="$style.loadingContainer">
    <Spinner size="xl" />
  </div>
  <RouterView v-else />
  <PiniaColadaDevtools />
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
