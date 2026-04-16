<script setup lang="ts">
import { Loader2 } from '@lucide/vue'

const sizes = {
  sm: 'spinner--sm',
  md: 'spinner--md',
  lg: 'spinner--lg',
  xl: 'spinner--xl',
} as const

const variants = {
  primary: 'spinner--primary',
  secondary: 'spinner--secondary',
} as const

const { size = 'sm', variant = 'primary' } = defineProps<{
  size?: keyof typeof sizes
  variant?: keyof typeof variants
}>()
</script>

<template>
  <Loader2 :class="[$style.spinner, $style[sizes[size]], $style[variants[variant]]]" :size="40" />
</template>

<style module>
.spinner {
  animation: spin 1s linear infinite;
}

.spinner--sm {
  width: 24px;
  height: 24px;
}

.spinner--md {
  width: 40px;
  height: 40px;
}

.spinner--lg {
  width: 64px;
  height: 64px;
}

.spinner--xl {
  width: 128px;
  height: 128px;
}

.spinner--primary {
  color: var(--blue); /* blue-600 */
}

.spinner--secondary {
  color: var(--dark-gray);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
