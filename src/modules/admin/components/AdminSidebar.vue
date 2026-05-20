<script lang="ts" setup>
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { DeepStringValue } from '@/core/types/util.type'
import logoIcon from '@/core/assets/icons/logo.svg'
import { LayoutDashboard, FileText, Users, ClipboardList, Menu } from '@lucide/vue'
import { onWatcherCleanup, ref, useAttrs, watchEffect, onCleanup, type Component } from 'vue'
import { Drawer } from 'primevue'
import AppButton from '@/core/components/ui/AppButton.vue'
import { useBodyClass } from '@/core/composables/use-body-class'

type AdminRouteNames = DeepStringValue<typeof ROUTE_NAMES.admin>
const links: {
  routeName: AdminRouteNames
  icon: Component
  label: Uppercase<string>
}[] = [
  {
    routeName: ROUTE_NAMES.admin.root,
    icon: LayoutDashboard,
    label: 'DASHBOARD',
  },
  {
    routeName: ROUTE_NAMES.admin.products,
    icon: ClipboardList,
    label: 'PRODUCTS LIST',
  },
  {
    routeName: ROUTE_NAMES.admin.categories,
    icon: ClipboardList,
    label: 'CATEGORIES LIST',
  },
  {
    routeName: ROUTE_NAMES.admin.brands,
    icon: ClipboardList,
    label: 'BRANDS LIST',
  },
  {
    routeName: ROUTE_NAMES.admin.root,
    icon: FileText,
    label: 'ORDER LIST',
  },
  {
    routeName: ROUTE_NAMES.admin.users,
    icon: Users,
    label: 'USERS LIST',
  },
] as const

const attrs = useAttrs()

const isVisible = ref(false)
useBodyClass('drawer-open', isVisible)
</script>

<template>
  <div :class="[$style.drawerContainer, attrs.class]">
    <AppButton variant="ghost" @click="isVisible = true"><Menu /></AppButton>
    <Drawer blockScroll :class="$style.drawer" v-model:visible="isVisible">
      <template #container>
        <div :class="$style.container">
          <img :src="logoIcon" alt="Kicks" :class="$style.logo" />
          <nav>
            <ul :class="$style.list">
              <li v-for="{ routeName, icon, label } in links" :key="routeName">
                <RouterLink
                  :exactActiveClass="$style.active"
                  :class="$style.link"
                  :to="{ name: routeName }"
                  @click="isVisible = false"
                >
                  <component :is="icon" :size="16" />
                  <span>{{ label }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </template>
    </Drawer>
  </div>

  <div :class="[$style.container, $style.withinDrawer, $attrs.class]">
    <img :src="logoIcon" alt="Kicks" :class="$style.logo" />
    <nav>
      <ul :class="$style.list">
        <li v-for="{ routeName, icon, label } in links" :key="routeName">
          <RouterLink
            :exactActiveClass="$style.active"
            :class="$style.link"
            :to="{ name: routeName }"
          >
            <component :is="icon" :size="16" />
            <span>{{ label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style module>
.drawerContainer {
  display: none;
}

.container {
  display: flex;
  flex-direction: column;
  row-gap: 48px;
  padding: 32px 24px;
  background-color: var(--fa-white);
  border-right: 1px solid rgba(35, 35, 33, 0.2);
  min-width: var(--sidebar-min-width);
  max-width: var(--sidebar-max-width);
  width: 100%;
  min-height: 100dvh;
}

.logo {
  max-width: 128px;
  height: 32px;
  width: 100%;
  margin: 0 auto;
}

.list {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.link {
  display: flex;
  align-items: center;
  column-gap: 10px;
  padding: 18px;
  text-transform: uppercase;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  font-family: var(--second-family);
  transition:
    background-color 0.3s,
    color 0.3s ease;

  &:hover {
    background-color: var(--blue-hover);
    color: var(--white);
  }

  &.router-link-active {
    display: none !important;
  }
}

.active {
  background-color: var(--blue-hover);
  color: var(--white);
}

@media screen and (max-width: 1500px) {
  .drawerContainer {
    display: initial;
  }

  .withinDrawer {
    display: none;
  }
}
</style>
