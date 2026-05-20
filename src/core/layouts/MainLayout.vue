<script setup lang="ts">
import AppFooter from '@/core/components/AppFooter.vue'
import AppHeader from '@/core/components/Header/AppHeader.vue'
</script>

<template>
  <div :class="$style.box">
    <AppHeader :class="$style.header" />
    <main>
      <router-view />
    </main>
    <AppFooter :class="$style.footer" />
  </div>
</template>

<style module>
.box {
  max-width: var(--container-max-width);
  width: 100%;
  margin: 0 auto;
  padding: 28px var(--container-padding-x);
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  padding-bottom: 80px;
}

.footer {
  padding-top: 100px;
}
</style>
`
