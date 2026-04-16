<script setup lang="ts">
import SignInForm from '@/modules/auth/components/forms/SignInForm.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const redirectPath = computed(() => {
  const value = route.query['redirectPath']
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value[0] ?? ''
  }

  return ''
})
</script>

<template><SignInForm :redirect-path="redirectPath" /></template>

<style scoped></style>
