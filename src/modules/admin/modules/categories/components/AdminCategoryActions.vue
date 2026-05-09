<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { usePopover } from '@/core/composables/use-popover'
import type { AdminCategory } from '@/core/types/api/admin/admin-category.type'
import CreateUpdateCategoryForm from '@/modules/admin/modules/categories/components/CreateUpdateCategoryForm.vue'
import { useDeleteCategory } from '@/modules/admin/modules/categories/composables/use-delete-category'
import { EllipsisVertical, TrashIcon, PencilIcon } from '@lucide/vue'
import { Popover, useConfirm } from 'primevue'
import { ref, useCssModule } from 'vue'

const { categoryId, categoryName } = defineProps<{
  categoryId: AdminCategory['id']
  categoryName: AdminCategory['name']
}>()

const { refId, popover, toggleMenu } = usePopover()
const { mutate, isPending } = useDeleteCategory()

const confirm = useConfirm()

const formRef = ref()

const confirmDeleteCategory = () => {
  confirm.require({
    header: 'Delete category?',
    message: 'This action will permanently delete the category and cannot be undone.',
    rejectProps: {
      label: 'Cancel',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      mutate(categoryId)
    },
  })
}

const style = useCssModule()
</script>
<template>
  <AppButton variant="ghost" type="button" icon="pi pi-share-alt" label="Share" @click="toggleMenu">
    <template #icon><EllipsisVertical :size="18" /></template>
  </AppButton>

  <CreateUpdateCategoryForm ref="formRef" :update-data="{ id: categoryId, name: categoryName }" />

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
        @click="confirmDeleteCategory"
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
