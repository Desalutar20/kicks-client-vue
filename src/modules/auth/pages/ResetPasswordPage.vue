<script setup lang="ts">
import { useParseQuery } from '@/core/composables/use-parse-query.ts'
import { verifyAccountSchema } from '@/modules/auth/schemas/verify-account.schema.ts'
import ResetPasswordForm from '@/modules/auth/components/forms/ResetPasswordForm.vue'
import { useRouter } from 'vue-router'
import { routeNames } from '@/core/const/router.const.ts'

const route = useRouter()
const parsed = useParseQuery(verifyAccountSchema, {
  error: 'Invalid reset password link',
  invalidCallback: () => route.push({ name: routeNames.home }),
})
</script>

<template>
  <ResetPasswordForm v-if="parsed" :data="parsed" />
</template>

<style scoped></style>
