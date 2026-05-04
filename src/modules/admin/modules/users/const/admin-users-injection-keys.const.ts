import type { FiltersInjectionKey } from '@/core/composables/use-filters'
import type { getAdminUsersSchema } from '@/modules/admin/modules/users/schemas/get-admin-users.schema'
import type { InjectionKey } from 'vue'

export const ADMIN_USERS_FILTERS: InjectionKey<FiltersInjectionKey<typeof getAdminUsersSchema>> =
  Symbol('ADMIN_USERS_FILTERS')
