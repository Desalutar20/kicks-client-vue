<script lang="ts" setup>
import Spinner from '@/core/components/ui/Spinner.vue'
import { useGetAdminUsers } from '@/modules/admin/modules/users/composables/use-get-admin-users'
import AdminUser from '@/modules/admin/modules/users/components/AdminUser.vue'
import AdminUserActions from '@/modules/admin/modules/users/components/AdminUserActions.vue'
import { CheckIcon, XIcon } from '@lucide/vue'
import AppTable from '@/core/components/ui/AppTable.vue'
import { ADMIN_USERS_FILTERS } from '@/modules/admin/modules/users/const/admin-users-injection-keys.const'
import type { GetAdminUsersInput } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'
import { useInjectFilters } from '@/core/composables/use-filters'
import AdminCursorPagination from '@/modules/admin/components/AdminCursorPagination.vue'

const { filters, setFilter } = useInjectFilters(ADMIN_USERS_FILTERS)
const { data, isPending, isFetching } = useGetAdminUsers(filters)

const navigate = (
  key: Extract<keyof GetAdminUsersInput, 'prevCursor' | 'nextCursor'>,
  cursor: string,
) => {
  setFilter(key, cursor)
}
</script>

<template>
  <div v-if="isPending" :class="$style.loadingContainer">
    <Spinner size="xl" />
  </div>

  <div
    v-if="data"
    :style="{ opacity: isFetching ? 0.6 : 1, pointerEvents: isFetching ? 'none' : 'auto' }"
  >
    <AppTable
      v-if="data"
      :data="data.data"
      :class="$style.table"
      :columns="[
        { key: 'id', header: 'ID' },
        { key: 'createdAt', header: 'Created At' },
        { key: 'updatedAt', header: 'Updated At' },
        { key: 'email', header: 'Email' },
        { key: 'firstName', header: 'First Name' },
        { key: 'lastName', header: 'Last Name' },
        { key: 'role', header: 'Role' },
        { key: 'gender', header: 'Gender' },
        { key: 'isVerified', header: 'Is Verified' },
        { key: 'isBanned', header: 'Is Banned' },
      ]"
    >
      <template #isVerified="props">
        <CheckIcon
          v-if="props.row.isVerified"
          :size="20"
          style="stroke: oklch(72.3% 0.219 149.579); margin-left: 20px"
        />
        <XIcon v-else :size="20" style="stroke: oklch(63.7% 0.237 25.331); margin-left: 20px" />
      </template>
      <template #isBanned="props">
        <CheckIcon
          v-if="props.row.isBanned"
          :size="20"
          style="stroke: oklch(72.3% 0.219 149.579); margin-left: 20px"
        />
        <XIcon v-else :size="20" style="stroke: oklch(63.7% 0.237 25.331); margin-left: 20px" />
      </template>
      <template #actions="props">
        <AdminUserActions :user-id="props.row.id" :is-banned="props.row.isBanned" />
      </template>
    </AppTable>

    <ul :class="$style.list" :style="{ opacity: isPending ? 0.8 : 1 }">
      <li v-for="value in data.data" :key="value.id">
        <AdminUser :user="value" />
      </li>
    </ul>
    <AdminCursorPagination
      :class="$style.pagination"
      :next-cursor="data.nextCursor"
      :prev-cursor="data.prevCursor"
      @prev="() => navigate('prevCursor', data!.prevCursor!)"
      @next="() => navigate('nextCursor', data!.nextCursor!)"
    />
  </div>
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 300px;
}

.list {
  display: none;
}

.pagination {
  margin-top: 40px;
}

@media screen and (max-width: 1500px) {
  .table {
    display: none !important;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    grid-auto-rows: 1fr !important;
    justify-items: center;
    gap: 24px;
  }
}

@media screen and (max-width: 500px) {
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
