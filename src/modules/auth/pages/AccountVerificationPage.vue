<script setup lang="ts">
import { verifyAccountSchema } from '@/modules/auth/schemas/verify-account.schema.ts'
import AccountVerification from '@/modules/auth/components/AccountVerification.vue'
import { useParseQuery } from '@/core/composables/use-parse-query.ts'

const parsed = useParseQuery(verifyAccountSchema, 'Invalid account verification link')
</script>

<template>
  <AccountVerification v-if="parsed" :data="parsed" />
</template>

<style scoped></style>
