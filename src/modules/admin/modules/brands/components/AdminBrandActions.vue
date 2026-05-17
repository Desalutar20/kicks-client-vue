<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { usePopover } from '@/core/composables/use-popover'
import type { AdminBrand } from '@/core/types/api/admin/admin-brand.type'
import CreateUpdateBrandForm from '@/modules/admin/modules/brands/components/CreateUpdateBrandForm.vue'
import { useDeleteBrand } from '@/modules/admin/modules/brands/composables/use-delete-brand'
import { EllipsisVertical, TrashIcon, PencilIcon } from '@lucide/vue'
import { Popover, useConfirm } from 'primevue'
import { useCssModule, useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

const { brandId, brandName } = defineProps<{
  brandId: AdminBrand['id']
  brandName: AdminBrand['name']
}>()

const { refId, popover, toggleMenu } = usePopover()
const { mutate, isPending } = useDeleteBrand()

const confirm = useConfirm()

const formRef = useTemplateRef<ComponentExposed<typeof CreateUpdateBrandForm>>('formRef')

const confirmDeleteBrand = () => {
  confirm.require({
    header: 'Delete brand?',
    message: 'This action will permanently delete the brand and cannot be undone.',
    rejectProps: {
      label: 'Cancel',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      mutate(brandId)
    },
  })
}

const style = useCssModule()
</script>
<template>
  <AppButton variant="ghost" type="button" icon="pi pi-share-alt" label="Share" @click="toggleMenu">
    <template #icon><EllipsisVertical :size="18" /></template>
  </AppButton>

  <CreateUpdateBrandForm ref="formRef" :update-data="{ id: brandId, name: brandName }" />

  <Popover :ref="refId" :unstyled="true">
    <div :class="$style.dropdown">
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
          <PencilIcon :size="16" :class="[style.icon, style.updateIcon]" />
        </template>
        Update
      </AppButton>

      <AppButton
        @click="confirmDeleteBrand"
        :disabled="isPending"
        variant="ghost"
        :class="$style.btn"
      >
        <template #icon>
          <TrashIcon :size="16" :class="$style.icon" />
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

.btn {
  width: 100%;
  padding: 12px 8px !important;
  font-size: 14px;
  text-transform: capitalize !important;
  gap: 8px !important;
  flex-direction: row-reverse;
  transition: background-colors 0.3s ease;

  &:hover {
    background-color: oklch(98.4% 0.003 247.858) !important;
  }
}

.icon {
  color: red;
}

.updateIcon {
  color: var(--dark-gray);
}
</style>
