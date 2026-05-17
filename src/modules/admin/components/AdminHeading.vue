<script lang="ts" setup>
import type { ROUTE_NAMES } from '@/core/const/router.const'
import type { DeepStringValue } from '@/core/types/util.type'
import { Breadcrumb } from 'primevue'

const { title, breadcrumb } = defineProps<{
  title: string
  breadcrumb: (string | { to: DeepStringValue<typeof ROUTE_NAMES>; label: string })[]
}>()
</script>

<template>
  <div :class="$style.container">
    <h2 :class="$style.title">{{ title }}</h2>
    <Breadcrumb
      class="breadcrumb"
      :model="
        breadcrumb.map((val) => {
          const isPrimitive = typeof val === 'string'

          const label = isPrimitive ? val : val.label

          return {
            label: label,
            disabled: isPrimitive ? true : false,
            route: isPrimitive ? undefined : val.to,
          }
        })
      "
    >
      <template #item="{ item, props }">
        <RouterLink v-if="item.route" :to="{ name: item.route }">{{ item.label }}</RouterLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span>{{ item.label }}</span>
        </a>
      </template>

      <!-- <template #item="props">{{ props.props.action. }}</template> -->
    </Breadcrumb>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.title {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 24px;
}
</style>
