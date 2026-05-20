<script setup lang="ts">
import { useLogout } from '@/modules/auth/composables/use-logout.ts'
import { useRouter } from 'vue-router'
import { LogOutIcon } from '@lucide/vue'
import AppButton from '@/core/components/ui/AppButton.vue'
import { ROUTE_NAMES } from '@/core/const/router.const'

// const router = useRouter()
const router = useRouter()

const { mutate, isPending } = useLogout({
  onSuccess: () => {
    router.push({
      name: ROUTE_NAMES.auth.signIn,
    })
  },
})
</script>

<template>
  <AppButton :disabled="isPending" @click="mutate()" variant="ghost">
    <LogOutIcon :size="40" />
  </AppButton>
</template>

<style scoped></style>
