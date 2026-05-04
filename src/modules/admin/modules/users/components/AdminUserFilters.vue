<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { useBodyClass } from '@/core/composables/use-body-class'
import { FilterIcon } from '@lucide/vue'
import { Drawer } from 'primevue'
import { ref } from 'vue'

const isVisible = ref(false)
useBodyClass('drawer-open', isVisible)
</script>

<template>
  <AppButton variant="ghost" @click="isVisible = true"><FilterIcon /></AppButton>
  <Drawer blockScroll v-model:visible="isVisible" position="right">
    <template #container>
      <div :class="$style.container">Ok</div>
    </template>
  </Drawer>
</template>

<style module>
.container {
  background-color: white;
  height: 100%;
}
</style>
