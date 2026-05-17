<script lang="ts" setup>
import { ROUTE_NAMES } from '@/core/const/router.const'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import AdminProductSkuActions from '@/modules/admin/modules/productSkus/components/AdminProductSkuActions.vue'
import { ArrowUp } from '@lucide/vue'
import { RouterLink } from 'vue-router'

const { productSku } = defineProps<{
  productSku: AdminProductSku
}>()

const stockLabel = (qty: number) => {
  if (qty === 0) return 'Out of stock'
  if (qty < 10) return 'Low stock'

  return 'In stock'
}
</script>

<template>
  <div :class="$style.card">
    <RouterLink
      :to="{
        name: ROUTE_NAMES.admin.specificProductSku,
        params: { id: productSku.id },
      }"
      :class="$style.link"
    />

    <div :class="$style.header">
      <div :class="$style.product">
        <img
          :src="productSku.images[0]?.imageUrl"
          :alt="productSku.product.title"
          :class="$style.image"
        />

        <div :class="$style.info">
          <div :class="$style.titleContainer">
            <span :class="$style.title">
              {{ productSku.product.title }}
            </span>

            <span :class="$style.sku"> SKU: {{ productSku.sku }} </span>

            <span :class="$style.gender">
              {{ productSku.product.gender }}
            </span>
          </div>

          <span :class="$style.price">
            <template v-if="productSku.salePrice != null">
              <span :class="$style.oldPrice"> ${{ productSku.price }} </span>
              <span :class="$style.salePrice"> ${{ productSku.salePrice }} </span>
            </template>

            <template v-else> ${{ productSku.price }} </template>
          </span>
        </div>
      </div>

      <AdminProductSkuActions :class="$style.actions" :id="productSku.id" />
    </div>

    <div :class="$style.metaGrid">
      <div>
        <span :class="$style.metaLabel">Size</span>
        <span>{{ productSku.size }}</span>
      </div>

      <div>
        <span :class="$style.metaLabel">Color</span>
        <div :class="$style.colorWrapper">
          <span :style="{ backgroundColor: productSku.color }" :class="$style.colorDot" />
          {{ productSku.color }}
        </div>
      </div>

      <div>
        <span :class="$style.metaLabel">Stock</span>
        <span :class="$style.stock">
          {{ stockLabel(productSku.quantity) }}
        </span>
      </div>

      <div>
        <span :class="$style.metaLabel">Qty</span>
        <span>{{ productSku.quantity }}</span>
      </div>
    </div>

    <div v-if="productSku.product.tags?.length" :class="$style.tags">
      <span v-for="tag in productSku.product.tags.slice(0, 3)" :key="tag" :class="$style.tag">
        {{ tag }}
      </span>
    </div>

    <div :class="$style.summary">
      <span :class="$style.summaryTitle">Summary</span>

      <p :class="$style.description">
        {{ productSku.product.description }}
      </p>
    </div>

    <div :class="$style.stats">
      <div :class="$style.statRow">
        <span>Sales</span>

        <span :class="$style.sales">
          <ArrowUp :size="20" :class="$style.salesIcon" />

          <span>
            {{ productSku.quantity }}
          </span>
        </span>
      </div>

      <div :class="$style.statRow">
        <span>Remaining Products</span>

        <span>
          {{ productSku.quantity }}
        </span>
      </div>
    </div>
  </div>
</template>

<style module>
.card {
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  padding: 16px;
  background-color: var(--fa-white);
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgb(0 0 0 / 8%);
}

.link {
  cursor: pointer;
  position: absolute;
  inset: 0;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 20px;
}

.product {
  display: flex;
  align-items: center;
  column-gap: 16px;
}

.image {
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card:hover .image {
  transform: scale(1.03);
}

.info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 16px;
}

.titleContainer {
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  font-weight: 600;
}

.title {
  color: var(--primary-150);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sku {
  font-size: 12px;
  color: rgb(0 0 0 / 55%);
}

.gender {
  font-size: 12px;
  color: rgb(0 0 0 / 45%);
}

.price {
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-weight: 600;
}

.oldPrice {
  text-decoration: line-through;
  color: rgb(0 0 0 / 60%);
}

.salePrice {
  color: #ef4444;
}

.actions {
  text-align: end;
  margin-left: auto;
  z-index: 2 !important;
}

.metaGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  font-size: 13px;
}

.metaLabel {
  display: block;
  font-size: 11px;
  color: rgb(0 0 0 / 45%);
  margin-bottom: 2px;
}

.colorWrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.colorDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgb(0 0 0 / 15%);
}

.stock {
  font-weight: 600;
}

.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 6px;
  background: rgb(0 0 0 / 6%);
}

.summary {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}

.summaryTitle {
  font-weight: 600;
}

.description {
  max-width: 320px;
  font-size: 14px;
  color: rgb(35 35 33 / 60%);
}

.stats {
  border: 0.75px solid rgb(35 35 33 / 30%);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(35 35 33 / 80%);
}

.statRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16px;
}

.statRow:first-child {
  padding-bottom: 8px;
  border-bottom: 0.5px solid rgb(35 35 33 / 40%);
}

.sales {
  display: flex;
  align-items: center;
  column-gap: 4px;
}

.salesIcon {
  color: var(--yellow);
}
</style>
