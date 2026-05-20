<script lang="ts" setup>
import AppInput from '@/core/components/ui/AppInput.vue'
import { useAttrs, useTemplateRef } from 'vue'
import { Image } from '@lucide/vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

defineOptions({
  inheritAttrs: false,
})

const { maxFileSize, maxFilesLength } = defineProps<{
  maxFileSize: number
  maxFilesLength: number
}>()

const emit = defineEmits<{
  change: [files: File[]]
}>()

const attrs = useAttrs()

const inputRef = useTemplateRef<ComponentExposed<typeof AppInput>>('inputRef')

const onClick = () => {
  inputRef.value?.open?.()
}

const onChange = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
    .slice(0, maxFilesLength)
    .filter((f) => f.size <= maxFileSize)

  emit('change', files)
}
</script>

<template>
  <div @click="onClick" :class="[$style.container, attrs.class]" role="button">
    <Image :size="45" :class="$style.icon" />
    <p :class="$style.text">Drop your image here, or browse<br />Jpeg, png are allowed</p>
    <AppInput @change="onChange" v-bind="$attrs" ref="inputRef" :class="$style.input" type="file" />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 26px;

  border: 1px dashed var(--dark-gray);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
}

.icon {
  width: 60px;
  height: 60px;
  color: var(--blue);
}

.text {
  font-weight: 600;
  text-align: center;
  color: var(--gray-main);
}

.input {
  display: none;
}
</style>
