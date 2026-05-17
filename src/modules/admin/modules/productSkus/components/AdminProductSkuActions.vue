<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { usePopover } from '@/core/composables/use-popover'
import type { AdminProductSku } from '@/core/types/api/admin/admin-product.type'
import { EllipsisVertical, TrashIcon } from '@lucide/vue'
import { Popover } from 'primevue'
import { useDeleteProductSku } from '../composables/use-delete-product-sku'
import { useAttrs } from 'vue'

const { id } = defineProps<{
  id: AdminProductSku['id']
}>()

const attrs = useAttrs()

const { refId, toggleMenu } = usePopover()
const { handleDelete, isPending } = useDeleteProductSku(id)
</script>

<template>
  <AppButton
    variant="ghost"
    type="button"
    icon="pi pi-share-alt"
    label="Share"
    @click="toggleMenu"
    :class="attrs.class"
  >
    <template #icon><EllipsisVertical :size="18" /></template>
  </AppButton>

  <Popover :ref="refId" :unstyled="true">
    <div :class="$style.dropdown">
      <AppButton @click="handleDelete" :disabled="isPending" variant="ghost" :class="$style.btn">
        <template #icon>
          <component :is="TrashIcon" :size="16" :class="$style.deleteIcon" />
        </template>
        Delete
      </AppButton>
    </div>
  </Popover>
</template>

<style module>
.dropdown {
  width: 160px;
  padding: 4px;
  background-color: var(--white);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid oklch(96.8% 0.007 247.896);
  border-radius: 12px;
}

.link {
  display: flex;
  align-items: center;
  flex-direction: row !important;
  justify-content: space-between;
  font-weight: 500;
  letter-spacing: 0.02em;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.btn {
  width: 100%;
  padding: 12px 8px !important;
  font-size: 14px;
  text-transform: capitalize !important;
  gap: 8px !important;
  flex-direction: row-reverse;

  &:hover {
    background-color: oklch(98.4% 0.003 247.858) !important;
  }
}

.deleteIcon {
  color: red;
}
</style>
