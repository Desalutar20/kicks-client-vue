<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { usePopover } from '@/core/composables/use-popover'
import type { AdminProduct } from '@/core/types/api/admin/admin-product.type'
import { EllipsisVertical, TrashIcon, PencilIcon, RefreshCw, PlusCircle } from '@lucide/vue'
import { Popover, useConfirm } from 'primevue'
import CreateUpdateProductForm from '@/modules/admin/modules/products/components/CreateUpdateProductForm.vue'
import { useToggleProductIsDeleted } from '@/modules/admin/modules/products/composables/use-toggle-product-is-deleted'
import { ROUTE_NAMES } from '@/core/const/router.const'
import { ref } from 'vue'

const { product } = defineProps<{
  product: AdminProduct
}>()

const { refId, popover, toggleMenu } = usePopover()
const { mutate, isPending } = useToggleProductIsDeleted()

const confirm = useConfirm()
const formRef = ref()

const confirmToggleProductDeleted = () => {
  const isDeleted = product.isDeleted

  confirm.require({
    header: isDeleted ? 'Restore product?' : 'Mark product as deleted?',
    message: isDeleted
      ? 'This product will be restored and visible again.'
      : 'This product will be marked as deleted and hidden from active products.',
    rejectProps: {
      label: 'Cancel',
      outlined: true,
    },
    acceptProps: {
      label: isDeleted ? 'Restore' : 'Delete',
      severity: isDeleted ? 'contrast' : 'danger',
    },
    accept: () => {
      mutate(product.id)
    },
  })
}
</script>
<template>
  <AppButton variant="ghost" type="button" icon="pi pi-share-alt" label="Share" @click="toggleMenu">
    <template #icon><EllipsisVertical :size="18" /></template>
  </AppButton>

  <CreateUpdateProductForm
    ref="formRef"
    :update-data="{
      id: product.id,
      title: product.title,
      description: product.description,
      gender: product.gender,
      tags: product.tags,
      brandId: product.brandId ?? undefined,
      categoryId: product.categoryId ?? undefined,
    }"
  />

  <Popover :ref="refId" :unstyled="true">
    <div :class="$style.dropdown">
      <RouterLink
        :to="{
          name: ROUTE_NAMES.admin.specificProduct,
          params: { product: JSON.stringify(product) },
        }"
        :disabled="isPending"
        :class="[$style.btn, $style.link]"
      >
        <PlusCircle :size="16" :class="$style.createVariantIcon" />
        Create variant
      </RouterLink>

      <AppButton
        :disabled="isPending"
        @click="
          () => {
            formRef?.open()
            popover?.hide()
          }
        "
        variant="ghost"
        :class="$style.btn"
      >
        <template #icon>
          <PencilIcon :size="16" :class="$style.updateIcon" />
        </template>
        Update
      </AppButton>

      <AppButton
        @click="confirmToggleProductDeleted"
        :disabled="isPending"
        variant="ghost"
        :class="$style.btn"
      >
        <template #icon>
          <component
            :is="product.isDeleted ? RefreshCw : TrashIcon"
            :size="16"
            :class="[product.isDeleted ? $style.restoreIcon : $style.deleteIcon]"
          />
        </template>
        {{ product.isDeleted ? 'Restore' : 'Delete' }}
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

.createVariantIcon {
  color: silver;
}

.deleteIcon {
  color: red;
}

.restoreIcon {
  color: green;
}

.updateIcon {
  color: var(--dark-gray);
}
</style>
