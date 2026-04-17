<script setup lang="ts">
import AppFooter from '@/core/components/AppFooter.vue'
import AppHeader from '@/core/components/Header/AppHeader.vue'
</script>

<template>
  <div class="box">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter class="footer" />
  </div>
</template>

<style scoped>
.footer {
  padding-top: 100px;
}
</style>
`
