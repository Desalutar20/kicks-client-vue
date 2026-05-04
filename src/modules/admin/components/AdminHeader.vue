<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ChevronDown, ChevronRight, LogOut, Bell, Search } from '@lucide/vue'
import { Popover } from 'primevue'

import AdminSidebar from '@/modules/admin/components/AdminSidebar.vue'
import AppButton from '@/core/components/ui/AppButton.vue'

import { useGetProfile } from '@/core/composables/use-get-profile'
import { useLogout } from '@/modules/auth/composables/use-logout'
import { ROUTE_NAMES } from '@/core/const/router.const'
import { usePopover } from '@/core/composables/use-popover'

const router = useRouter()

const { user } = useGetProfile()
const { mutate, isPending } = useLogout({
  onSuccess: () => router.push({ name: ROUTE_NAMES.auth.signIn }),
})

const { refId, isOpen, toggleMenu } = usePopover()
</script>

<template>
  <header v-if="user" :class="$style.header">
    <div :class="$style.inner">
      <AdminSidebar :class="$style.sidebar" />

      <div :class="$style.actions">
        <Search :size="20" :class="$style.icon" />
        <Bell :size="20" :class="$style.icon" />
        <AppButton
          :data-open="isOpen"
          variant="third"
          type="button"
          icon="pi pi-share-alt"
          label="Share"
          @click="toggleMenu"
          >{{ user.firstName }}
          <template #icon><ChevronDown :class="$style.chevron" /></template>
        </AppButton>

        <Popover :ref="refId" :unstyled="true" @show="isOpen = true" @hide="isOpen = false">
          <template #container>
            <div :class="$style.dropdown">
              <div :class="$style.label">
                {{ user.firstName }}
              </div>

              <div :class="$style.separator" />

              <RouterLink :to="{ name: ROUTE_NAMES.auth.forgotPassword }" :class="$style.item">
                <span>Change Password</span>
                <ChevronRight :size="16" />
              </RouterLink>

              <AppButton
                :disabled="isPending"
                variant="ghost"
                :class="$style.item"
                @click="() => mutate()"
              >
                <span>Log Out</span>
                <template #icon>
                  <LogOut :size="16" />
                </template>
              </AppButton>
            </div>
          </template>
        </Popover>
      </div>
    </div>
  </header>
</template>

<style module>
.header {
  width: 100%;
  background: var(--fa-white);
  border-bottom: 1px solid rgba(35, 35, 33, 0.2);
  padding: 28px 0;
}

.inner {
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 32px;
}

.icon {
  cursor: pointer;
  color: var(--primary-150);
}

.userButton {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 16px;
  border: 1px solid rgba(35, 35, 33, 0.2);
  border-radius: 10px;

  background: transparent;
  cursor: pointer;

  transition: 0.2s;
}

.userButton:hover {
  background: var(--blue-hover);
  color: white;
  border-color: var(--blue-hover);
}

.dropdown {
  background-color: var(--white);
  width: 233px;
  padding: 16px;
  border: 1px solid var(--gray);
  border-radius: 8px;
  margin-top: 30px;
}

.chevron {
  transition: transform 0.2s ease;
}

[data-open='true'] .chevron {
  transform: rotate(180deg);
}

.label {
  font-size: 18px;
  font-weight: 600;
}

.separator {
  margin: 12px 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-transform: capitalize !important;

  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.logout {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media screen and (min-width: 1500px) {
  .sidebar {
    display: none !important;
  }
}
</style>
