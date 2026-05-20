<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { useBodyClass } from '@/core/composables/use-body-class'
import ProductsFilters from '@/modules/products/components/ProductsFilters.vue'
import { ListFilter } from '@lucide/vue'
import { Drawer } from 'primevue'
import { ref, useAttrs } from 'vue'

const isVisible = ref(false)

useBodyClass('drawer-open', isVisible)

const attrs = useAttrs()
</script>

<template>
  <div :class="[$style.drawerContainer, attrs.class]">
    <AppButton :class="$style.btn" variant="ghost" @click="isVisible = true">
      Filters
      <template #icon>
        <ListFilter :size="16" />
      </template>
    </AppButton>

    <Drawer blockScroll :class="$style.drawer" v-model:visible="isVisible">
      <template #container>
        <ProductsFilters @click="isVisible = false" />
      </template>
    </Drawer>
  </div>

  <ProductsFilters :class="$style.filters" />
</template>

<style module>
.drawerContainer {
  display: block;
}

.drawer {
  padding: 20px;
  width: 400px !important;
  background-color: white !important;
}

.btn {
  display: flex;
  border-radius: 8px;
  padding: 8px 16px !important;
  width: 169px;
  height: 35px;
  font-family: var(--second-family);
  font-weight: 600 !important;
  font-size: 14px;

  background: #f4f2f2 !important;
  text-transform: capitalize !important;
}

.filters {
  display: none;
}

@media (min-width: 768px) {
  .drawerContainer {
    display: none;
  }

  .filters {
    display: initial;
  }
}
</style>
