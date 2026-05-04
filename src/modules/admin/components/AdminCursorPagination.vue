<script setup lang="ts">
import AppButton from '@/core/components/ui/AppButton.vue'
import { type Nullable } from '@/core/types/util.type'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

defineProps<{
  prevCursor: Nullable<string>
  nextCursor: Nullable<string>
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<template>
  <div :class="$style.container">
    <AppButton v-if="prevCursor" :disabled="disabled" @click="emit('prev')">
      <ChevronLeft
    /></AppButton>
    <AppButton v-if="nextCursor" :disabled="disabled" @click="emit('next')">
      <ChevronRight />
    </AppButton>
  </div>
</template>

<style module>
.container {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
