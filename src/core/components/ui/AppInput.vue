<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/vue'
import { computed, ref, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { type = 'text' } = defineProps<{
  type?: HTMLInputElement['type']
}>()

const attrs = useAttrs()

const isVisible = ref(false)

const model = defineModel<string>()

const inputType = computed(() => {
  if (type === 'password') {
    return isVisible.value ? 'text' : 'password'
  }

  return type || 'text'
})

function toggle() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div :class="['wrapper', attrs.class]">
    <input v-model="model" v-bind="$attrs" class="input" :type="inputType" />
    <button v-if="type === 'password'" class="icon" type="button" @click="toggle">
      <EyeIcon v-if="!isVisible" :size="18" color="black" />
      <EyeOffIcon v-else :size="18" color="black" />
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid var(--dark-gray);
  letter-spacing: 0.03em;
  color: var(--dark-gray);
  background-color: transparent;
  outline: none;
}

.input[type='password'] {
  padding-right: 60px;
}

.input[type='radio'],
.input[type='checkbox'] {
  padding: 10px;
  position: relative;
  cursor: pointer;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid black;
  border-radius: 4px;
}

.input[type='checkbox']:checked,
.input[type='radio']:checked {
  background-color: var(--dark-gray);
}

.input[type='checkbox']:checked::after,
.input[type='radio']:checked::after {
  content: '✓';
  position: absolute;
  top: 5%;
  left: 20%;
  width: 2px;
  height: 2px;
  color: var(--white);
}

.icon {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-main);
}

.input::placeholder {
  color: #79767c;
  text-transform: capitalize;
}

.input:disabled {
  border-color: #a5a3a7;
}

.input:not([type='checkbox']):not([type='radio']):focus:placeholder-shown {
  border-color: var(--dark-gray);
  box-shadow: 0 0 0 2px rgba(35, 35, 33, 0.15);
}

.input:not([type='checkbox']):not([type='radio']):not(:placeholder-shown):focus:valid {
  border-color: #008b28;
}

.input:not([type='checkbox']):not([type='radio']):not(:placeholder-shown):focus:invalid {
  border-color: #da1e28;
}
</style>
