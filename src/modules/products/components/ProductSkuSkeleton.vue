<script lang="ts" setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <article :class="$style.container">
    <div :class="$style.images">
      <Skeleton width="100%" height="300px" borderRadius="24px" />
    </div>

    <Skeleton width="70%" height="24px" />

    <div :class="$style.button">
      <Skeleton width="100%" height="42px" borderRadius="12px" />
    </div>
  </article>
</template>

<style module>
.container {
  min-width: 270px;
  max-width: 330px;
  width: 100%;
}

.images {
  padding: 8px;
  border-radius: 28px;
  background-color: var(--fa-white);
  margin-bottom: 20px;
  overflow: hidden;
}

.button {
  margin-top: 12px;
}
</style>
