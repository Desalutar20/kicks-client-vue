<script setup lang="ts">
import { Flame } from '@lucide/vue'
import { ref } from 'vue'
import { Select } from 'primevue'
import { ROUTE_NAMES } from '@/core/const/router.const.ts'

//TODO
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
</script>

<template>
  <div :class="$style.left">
    <RouterLink :class="$style.link" :to="{ name: ROUTE_NAMES.home }">
      <span>New Drops</span>
      <Flame
        :size="20"
        style="fill: oklch(70.5% 0.213 47.604); stroke: oklch(70.5% 0.213 47.604)"
      />
    </RouterLink>
    <Select
      :class="$style.select"
      :options="cities"
      optionLabel="name"
      placeholder="Men"
      style="width: 55px"
      :panel-class="$style.customized"
      @update:modelValue="(val) => console.log(val.code)"
    />
    <Select
      :class="$style.select"
      :options="cities"
      style="width: 85px"
      optionLabel="name"
      placeholder="Women"
      :panel-class="$style.customized"
      @update:modelValue="(val) => console.log(val.code)"
    />
  </div>
</template>

<style module>
.customized {
  border-radius: 5px !important;
  padding: 4px;
  background-color: darkgray !important;
}
.customized li {
  font-weight: 700 !important;
}

.left {
  display: flex;
  align-items: center;
  column-gap: 40px;
  font-weight: 600;

  .link {
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  .select {
    width: 60px;

    li {
      font-weight: 700 !important;
    }
  }
}
</style>
