<script setup lang="ts">
import JoinClub from '@/modules/auth/components/JoinClub.vue'
import { useGetProfile } from '@/core/composables/use-get-profile.ts'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { routeNames } from '@/core/const/router.const.ts'
import { UserRole } from '@/core/types/user.type.ts'

const { user } = useGetProfile()
const router = useRouter()

onBeforeMount(() => {
  if (!user.value) return

  const target = user.value.role === UserRole.Admin ? routeNames.admin.root : routeNames.home

  if (router.currentRoute.value.name !== target) {
    router.replace({ name: target })
  }
})
</script>

<template>
  <div :class="$style.container">
    <RouterView />
    <JoinClub />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
    row-gap: 0;
    column-gap: 20px;
    justify-content: space-between;
    align-items: start;
  }
}
</style>
