<script lang="ts" setup>
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import { formatDate } from '@/core/utils/date.util'
import AdminProductActions from '@/modules/admin/modules/products/components/AdminProductActions.vue'
import { useGetAdminProductFilterOptions } from '@/modules/admin/modules/products/composables/use-get-admin-product-filter-options'
import { Calendar, CheckCircle, Package, Trash2 } from '@lucide/vue'

const { product } = defineProps<{ product: AdminProduct }>()
const { data } = useGetAdminProductFilterOptions()
</script>

<template>
  <article :class="$style.card">
    <div :class="$style.header">
      <div :class="$style.info">
        <h3 :class="$style.title">
          {{ product.title }}
        </h3>

        <p :class="$style.description">
          {{ product.description || '—' }}
        </p>
      </div>

      <AdminProductActions :product="product" />
    </div>

    <div :class="$style.statusRow">
      <span :class="[$style.status, product.isDeleted ? $style.deleted : $style.active]">
        <Trash2 v-if="product.isDeleted" :size="12" />
        <CheckCircle v-else :size="12" />

        {{ product.isDeleted ? 'Deleted' : 'Active' }}
      </span>

      <span v-if="product.gender" :class="$style.badge">
        {{ product.gender }}
      </span>
    </div>

    <div :class="$style.grid">
      <div :class="$style.item">
        <Package :size="16" :class="$style.icon" />
        <span>
          Category:
          <b>{{ data?.data.categories.find((c) => c.id === product.categoryId)?.name ?? '—' }}</b>
        </span>
      </div>

      <div :class="$style.item">
        <Package :size="16" :class="$style.icon" />
        <span>
          Brand:
          <b>{{ data?.data.brands.find((b) => b.id === product.brandId)?.name ?? '—' }}</b>
        </span>
      </div>

      <div :class="$style.item">
        <Calendar :size="16" :class="$style.icon" />
        <span> Created: {{ formatDate(new Date(product.createdAt).toISOString()) }} </span>
      </div>

      <div :class="$style.item">
        <Calendar :size="16" :class="$style.icon" />
        <span> Updated: {{ formatDate(new Date(product.updatedAt).toISOString()) }} </span>
      </div>
    </div>

    <div v-if="product.tags.length" :class="$style.tags">
      <span v-for="tag in product.tags" :key="tag" :class="$style.tag"> #{{ tag }} </span>
    </div>

    <div :class="$style.footer">
      <span>ID: {{ product.id }}</span>
    </div>
  </article>
</template>

<style module>
.card {
  border-radius: 16px;
  background: white;
  padding: 16px;
  border: 1px solid #eee;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-width: 300px;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.info {
  min-width: 0;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.statusRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
}

.active {
  background: #dcfce7;
  color: #166534;
}

.deleted {
  background: #fee2e2;
  color: #b91c1c;
}

.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
}

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  font-size: 12px;
  color: #475569;
}

.item {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.icon {
  color: #94a3b8;
}

.tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 12px;
  color: #2563eb;
}

.footer {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
  font-size: 12px;
  color: #94a3b8;
}
</style>
