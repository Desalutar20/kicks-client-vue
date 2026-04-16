<script setup lang="ts">
import AppInput from '@/core/components/ui/AppInput.vue'
import type { RegleFieldStatus } from '@regle/core'
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const modelValue = defineModel<string>()

const { field } = defineProps<{
  field: Partial<RegleFieldStatus<string>>
}>()

const attrs = useAttrs()
</script>

<template>
  <div :class="['container', attrs.class]">
    <AppInput v-model="modelValue" v-bind="$attrs" />
    <ul class="errors" v-if="field.$errors?.length">
      <li class="error" v-for="error of field.$errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}

.errors {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.error {
  color: red;
}
</style>
