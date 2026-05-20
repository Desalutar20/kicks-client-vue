<script setup lang="ts">
import { Flame, Menu } from '@lucide/vue'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'
import { ref, useAttrs } from 'vue'
import { useBodyClass } from '@/core/composables/use-body-class'
import { Drawer } from 'primevue'
import AppButton from '@/core/components/ui/AppButton.vue'
import { ProductGender } from '@/core/types/api/admin/admin-product.type'

const isVisible = ref(false)

useBodyClass('drawer-open', isVisible)

const attrs = useAttrs()
</script>

<template>
  <div :class="[$style.drawerContainer, attrs.class]">
    <AppButton variant="ghost" @click="isVisible = true">
      <Menu />
    </AppButton>

    <Drawer blockScroll :class="$style.drawer" v-model:visible="isVisible">
      <template #container>
        <div :class="$style.mobileNav">
          <RouterLink @click="isVisible = false" :to="{ name: ROUTE_NAMES.home }">
            <span>New Drops</span>

            <Flame
              :size="20"
              style="fill: oklch(70.5% 0.213 47.604); stroke: oklch(70.5% 0.213 47.604)"
            />
          </RouterLink>

          <RouterLink
            @click="isVisible = false"
            :to="{ name: ROUTE_NAMES.products.root, query: { gender: 'men' } }"
          >
            Men
          </RouterLink>

          <RouterLink
            @click="isVisible = false"
            :to="{ name: ROUTE_NAMES.products.root, query: { gender: 'women' } }"
          >
            Women
          </RouterLink>

          <RouterLink
            :class="$style.selectLink"
            :to="{ name: ROUTE_NAMES.products.root, query: { gender: ProductGender.Unisex } }"
          >
            Unisex
          </RouterLink>
        </div>
      </template>
    </Drawer>
  </div>

  <div :class="[$style.left, attrs.class]">
    <RouterLink :class="$style.link" :to="{ name: ROUTE_NAMES.home }">
      <span>New Drops</span>

      <Flame
        :size="20"
        style="fill: oklch(70.5% 0.213 47.604); stroke: oklch(70.5% 0.213 47.604)"
      />
    </RouterLink>

    <RouterLink
      :class="$style.selectLink"
      :to="{ name: ROUTE_NAMES.products.root, query: { genders: ProductGender.Men } }"
    >
      Men
    </RouterLink>

    <RouterLink
      :class="$style.selectLink"
      :to="{ name: ROUTE_NAMES.products.root, query: { genders: ProductGender.Men } }"
    >
      Women
    </RouterLink>

    <RouterLink
      :class="$style.selectLink"
      :to="{ name: ROUTE_NAMES.products.root, query: { genders: ProductGender.Unisex } }"
    >
      Unisex
    </RouterLink>
  </div>
</template>

<style module>
.drawer {
  padding: 20px;
  background-color: white !important;
}

.mobileNav {
  display: flex;
  flex-direction: column;
  row-gap: 28px;
  padding-top: 12px;

  a {
    width: fit-content;
    display: flex;
    align-items: center;
    column-gap: 6px;
    font-size: 22px;
    font-weight: 600;
  }
}

.left {
  display: none;
  align-items: center;
  column-gap: 40px;
  font-weight: 600;

  .link {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  .selectLink {
    transition: opacity 0.2s ease;
  }

  .selectLink:hover {
    opacity: 0.7;
  }
}

@media (min-width: 768px) {
  .left {
    display: flex;
  }

  .drawerContainer {
    display: none;
  }
}
</style>
