<script setup lang="ts">
import HeaderLeft from '@/core/components/Header/HeaderLeft.vue'
import { SearchIcon, ShoppingCart, UserRound } from '@lucide/vue'
import logoIcon from '@/core/assets/icons/logo.svg'
import { useGetProfile } from '@/core/composables/use-get-profile.ts'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'

const { user } = useGetProfile()
</script>

<template>
  <header :class="$style.header">
    <HeaderLeft />
    <RouterLink :to="{ name: ROUTE_NAMES.home }">
      <img :src="logoIcon" alt="Kicks" :class="$style.logo" />
    </RouterLink>

    <div :class="$style.right">
      <SearchIcon :class="$style.search" />
      <RouterLink
        :class="$style.shoppingCart"
        :to="{ name: user ? ROUTE_NAMES.shoppingCart : ROUTE_NAMES.auth.signIn }"
      >
        <ShoppingCart style="width: 100%; stroke: oklch(55.4% 0.046 257.417)" />
        <span>0</span>
      </RouterLink>
      <RouterLink
        :class="$style.shoppingCart"
        :to="{ name: user ? ROUTE_NAMES.profile : ROUTE_NAMES.auth.signIn }"
      >
        <UserRound style="width: 100%; fill: var(--dark-gray); stroke: var(--dark-gray)" />
      </RouterLink>
    </div>
  </header>
</template>

<style module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
}

.right {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.search {
  display: none;
  width: 20px;
}

.shoppingCart {
  position: relative;
  width: 20px;

  span {
    position: absolute;
    width: 16px;
    height: 16px;
    top: -6px;
    right: -6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: black;
    font-size: 9px;
    font-weight: 700;
    color: white;
  }
}

@media (min-width: 768px) {
  .logo {
    width: 128px;
    height: 32px;
  }

  .search {
    display: inline;
    width: 24px;
  }

  .shoppingCart {
    width: 24px;
  }
}
</style>
