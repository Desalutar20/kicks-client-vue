<script lang="ts" setup>
import { Breadcrumb } from 'primevue'

const { title, breadcrumb } = defineProps<{
  title: string
  breadcrumb: string[]
}>()
</script>

<template>
  <div :class="$style.container">
    <h2 :class="$style.title">{{ title }}</h2>
    <Breadcrumb
      class="breadcrumb"
      :model="breadcrumb.map((val) => ({ label: val, disabled: true }))"
    />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.title {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 24px;
}
</style>
