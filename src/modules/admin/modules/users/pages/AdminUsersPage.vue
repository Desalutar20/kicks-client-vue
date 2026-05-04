<script lang="ts" setup>
import { useProviderFilters } from '@/core/composables/use-filters'
import { ROUTE_NAMES } from '@/core/const/router.const'
import AdminFilters from '@/modules/admin/components/AdminFilters.vue'
import AdminHeading from '@/modules/admin/components/AdminHeading.vue'

import { ADMIN_USERS_FILTERS } from '@/modules/admin/modules/users/const/admin-users-injection-keys.const'
import { getAdminUsersSchema } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'
import { UserGender } from '../../../../../core/types/api/user.type'
import { GET_ADMIN_USERS_MAX_LIMIT } from '../const/admin-users-schemas.const'
import AdminUsersWrapper from '@/modules/admin/modules/users/components/AdminUsersWrapper.vue'

useProviderFilters(getAdminUsersSchema, ROUTE_NAMES.admin.users, ADMIN_USERS_FILTERS)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <AdminHeading title="Users List" :breadcrumb="['Home', 'Users']" />
      <AdminFilters
        :injection-key="ADMIN_USERS_FILTERS"
        title="User filters"
        :keys="[
          {
            key: 'search',
            label: 'Search',
            placeholder: 'Serach by name or email',
            type: { inputType: 'input' },
            transform: (val) => val,
          },
          {
            key: 'isVerified',
            label: 'Verified',
            placeholder: 'Verification status',
            type: {
              inputType: 'select',
              options: [
                { label: 'All', value: 'all' },
                { label: 'Verified', value: 'true' },
                { label: 'Not verified', value: 'false' },
              ],
            },
            transform: (val) => (val === 'all' ? undefined : val === 'true'),
          },
          {
            key: 'isBanned',
            label: 'Banned',
            placeholder: 'Ban status',
            type: {
              inputType: 'select',
              options: [
                { label: 'All', value: 'all' },
                { label: 'Banned', value: 'true' },
                { label: 'Not banned', value: 'false' },
              ],
            },
            transform: (val) => (val === 'all' ? undefined : val === 'true'),
          },
          {
            key: 'gender',
            label: 'Gender',
            placeholder: 'Gender',
            type: {
              inputType: 'select',
              options: [
                { label: 'All', value: 'all' },
                ...Object.values(UserGender).map((g) => ({ value: g, label: g })),
              ],
            },
            transform: (val) => (val === 'all' ? undefined : (val as UserGender)),
          },
          {
            key: 'limit',
            label: 'Rows per page',
            placeholder: 'Rows per page',
            type: {
              inputType: 'select',
              options: Array.from(
                { length: Math.floor(GET_ADMIN_USERS_MAX_LIMIT / 25) },
                (_, i) => (i + 1) * 25,
              ).map((v) => ({ value: v.toString(), label: v.toString() })),
            },
            transform: (val) => Number(val),
          },
        ]"
      />
    </div>
    <AdminUsersWrapper />
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 40px;
}
</style>
