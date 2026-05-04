<script lang="ts" setup>
import AppButton from '@/core/components/ui/AppButton.vue'
import { usePopover } from '@/core/composables/use-popover'
import type { AdminUser } from '@/core/types/api/admin/admin-user.type'
import { useDeleteUser } from '@/modules/admin/modules/users/composables/use-delete-user'
import { useToggleBanUser } from '@/modules/admin/modules/users/composables/use-toggle-ban-user'
import { EllipsisVertical, BanIcon, TrashIcon } from '@lucide/vue'
import { Popover, useConfirm } from 'primevue'
import { useCssModule } from 'vue'

const { userId, isBanned } = defineProps<{
  userId: AdminUser['id']
  isBanned: AdminUser['isBanned']
}>()

const { refId, toggleMenu } = usePopover()
const { mutate, isPending } = useToggleBanUser()
const { mutate: mutateDelete, isPending: isDeletePending } = useDeleteUser()
const confirm = useConfirm()

const confirmDeleteUser = () => {
  confirm.require({
    header: 'Delete user?',
    message: 'This action will permanently delete the user and cannot be undone.',
    rejectProps: {
      label: 'Cancel',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      mutateDelete(userId)
    },
  })
}

const style = useCssModule()
</script>
<template>
  <AppButton variant="ghost" type="button" icon="pi pi-share-alt" label="Share" @click="toggleMenu">
    <template #icon><EllipsisVertical :size="18" /></template>
  </AppButton>

  <Popover :ref="refId" :unstyled="true">
    <div :class="$style.dropdown">
      <AppButton
        :disabled="isPending || isDeletePending"
        @click="mutate(userId)"
        variant="ghost"
        :class="$style.btn"
      >
        <template #icon>
          <BanIcon :size="16" :class="[style.icon, { [style.isBanned]: isBanned }]" />
        </template>
        {{ isBanned ? 'Unblock' : 'Block' }}
      </AppButton>

      <AppButton
        @click="confirmDeleteUser"
        :disabled="isPending || isDeletePending"
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

.isBanned {
  color: green;
}
</style>
