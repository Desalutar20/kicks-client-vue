<script setup lang="ts">
import { useParseQuery } from '@/core/composables/use-parse-query.ts'
import { verifyAccountSchema } from '@/modules/auth/schemas/verify-account.schema.ts'
import ResetPasswordForm from '@/modules/auth/components/forms/ResetPasswordForm.vue'

const parsed = useParseQuery(verifyAccountSchema, 'Invalid reset password link')
</script>

<template>
  <ResetPasswordForm v-if="parsed" :data="parsed" />
</template>

<style scoped></style>
