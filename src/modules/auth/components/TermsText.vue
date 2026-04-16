<script setup lang="ts">
const { type } = defineProps<{ type: 'signUp' | 'signIn' }>()
</script>

<template>
  <span class="text"
    >By clicking '{{ type === 'signUp' ? 'Register' : 'Log In' }}' you agree to our website
    KicksClub <a href="" class="link">Terms & Conditions</a>,
    <a href="" class="link">Kicks Privacy Notice</a> and
    <a href="" class="link">Terms & Conditions</a>.</span
  >
</template>

<style scoped>
.text {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 14px;
}

.link {
  text-decoration: underline;
  color: var(--dark-gray);
}

@media screen and (min-width: 768px) {
  .text {
    font-size: 16px;
  }
}
</style>
