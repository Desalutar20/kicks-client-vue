<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <textarea v-model="model" :class="$style.textarea" />
</template>

<style module>
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid var(--dark-gray);
  letter-spacing: 0.03em;
  color: var(--dark-gray);
  background-color: transparent;
  outline: none;
}
</style>
