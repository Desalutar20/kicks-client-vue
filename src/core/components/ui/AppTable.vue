<script lang="ts" setup generic="T">
import { useSlots } from 'vue'

const { data, columns } = defineProps<{
  columns: { header: string; key: keyof T }[]
  data: T[]
}>()

const slots = useSlots()
</script>

<template>
  <div :class="$style.container">
    <table :class="$style.table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.header" :class="$style.th">
            {{ col.header }}
          </th>
          <th :class="$style.th" v-if="slots.actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, i) in data" :key="'id' in row ? row.id : i" :class="$style.tr">
          <td v-for="col in columns" :key="col.key">
            <slot :name="col.key" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
          <td v-if="slots.actions">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module>
.container {
  padding: 24px 16px;
  border-radius: 16px;
  background-color: #f8f8f8;
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

.table {
  width: 100%;
  border-collapse: separate;
}

.th {
  text-align: start;
  font-weight: 600;
  color: var(--dark-gray);
  opacity: 0.8;
  padding-right: 40px;
  border-bottom: 1px solid color-mix(in srgb, var(--dark-gray) 20%, transparent);
  padding: 16px 40px 16px 0;
}

.tr {
  font-family: var(--second-family);
  font-weight: 600;

  td {
    max-width: 400px;
    text-align: start;
    font-size: 14px;
    border-bottom: 1px solid color-mix(in srgb, var(--dark-gray) 20%, transparent);
    padding: 16px 16px 16px 0;

    white-space: normal;
    overflow-wrap: anywhere;
    vertical-align: top;
  }

  td:last-child {
    padding-right: 0;
  }
}
</style>
