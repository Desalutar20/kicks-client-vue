<script setup lang="ts">
import { computed, useSlots } from 'vue'

const { variant = 'primary' } = defineProps<{
  variant?: 'primary' | 'secondary' | 'third' | 'ghost'
}>()

const slots = useSlots()

const hasIcon = computed(() => !!slots.icon)
</script>

<template>
  <button :class="['button', variant, { 'with-icon': hasIcon }]">
    <slot></slot>
    <slot name="icon"></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.button.with-icon {
  justify-content: space-between;
}

.button:disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.button.primary {
  background-color: var(--dark-gray);
  color: var(--white);
}

.button.primary:hover {
  background-color: var(--dark-gray-hover);
}

.button.primary:disabled {
  background-color: #d2d1d3;
  color: #8f8c91;
}

.button.secondary {
  color: var(--dark-gray);
  background-color: var(--gray);
  border: 1px solid var(--dark-gray);
}

.button.secondary:hover {
  background-color: var(--gray-hover);
}

.button.secondary:disabled {
  border: 1px solid #d2d1d3;
}

.button.third {
  color: var(--white);
  background-color: var(--blue);
}

.button.third:hover {
  background-color: var(--blue-hover);
}

.button.third:disabled {
  opacity: 0.7;
}

.button.ghost {
  padding: 0;
  color: var(--dark-gray);
}

@media screen and (min-width: 768px) {
  .button {
    font-size: 14px;
    padding: 16px 20px;
  }
}
</style>
