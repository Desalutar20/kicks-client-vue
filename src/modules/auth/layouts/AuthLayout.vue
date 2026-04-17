<script setup lang="ts">
import JoinClub from '@/modules/auth/components/JoinClub.vue'
</script>

<template>
  <div :class="$style.container">
    <RouterView />
    <JoinClub />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
    row-gap: 0;
    column-gap: 20px;
    justify-content: space-between;
    align-items: start;
  }
}
</style>
