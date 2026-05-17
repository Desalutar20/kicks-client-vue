<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const { options } = defineProps<{
  options: {
    label: string
    value: string
  }[]
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const selectAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
</script>

<template>
  <div :class="[$style.wrapper, attrs.class]">
    <select
      v-bind="selectAttrs"
      :value="modelValue"
      :class="$style.select"
      @change="(e) => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
    >
      <option v-if="!modelValue" disabled hidden value="">
        {{ attrs.placeholder }}
      </option>

      <slot :options="options">
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </slot>
    </select>
  </div>
</template>

<style module>
.wrapper {
  border-radius: 8px;
  border: 1px solid var(--dark-gray);
  background-color: transparent;
  display: flex;
  align-items: center;
  position: relative;
}

.wrapper::after {
  content: '⌄';
  font-size: 1rem;
  top: 6px;
  right: 10px;
  position: absolute;
  pointer-events: none;
}

.select {
  padding: 14px 16px;

  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--dark-gray);
  letter-spacing: 0.03em;
  /* pointer-events: none; */
  cursor: pointer;

  border-right: 10px solid transparent;

  -webkit-appearance: none;
  appearance: none;
}
</style>
