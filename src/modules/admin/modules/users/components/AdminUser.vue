<script setup lang="ts">
import AppButton from '@/core/components/ui/AppButton.vue'
import type { AdminUser } from '@/core/types/api/admin/admin-user.type'
import AdminUserActions from '@/modules/admin/modules/users/components/AdminUserActions.vue'
import { Calendar, Mail, UserCheck, User as UserIcon, UsersRound, UserX } from '@lucide/vue'
import { computed, useCssModule } from 'vue'
import { toast } from 'vue-toastflow'

const props = defineProps<{
  user: AdminUser
}>()

const style = useCssModule()

const handleCopyEmail = async () => {
  try {
    await navigator.clipboard.writeText(props.user.email)
    toast.success('Email is copied')
  } catch (err) {
    toast.error('Error', {
      description: err instanceof Error ? err.message : 'Something went wrong',
    })
  }
}

const getInitials = computed(() => {
  const { firstName, lastName } = props.user
  if (!firstName && !lastName) return '-'
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`
})

const fullName = computed(() => {
  const { firstName, lastName, email } = props.user
  if (firstName || lastName) {
    return `${firstName ?? ''} ${lastName ?? ''}`.trim()
  }
  return email
})
</script>

<template>
  <article :class="$style.card">
    <div :class="style.row">
      <div :class="style.avatar">
        {{ getInitials }}
      </div>

      <div :class="style.content">
        <div :class="style.header">
          <div :class="style.userInfo">
            <h3 :class="style.name">
              {{ fullName }}
            </h3>

            <p :class="style.email">
              {{ user.email }}
            </p>

            <div :class="style.badges">
              <span v-if="user.googleId" :class="style.badge">Google</span>
              <span v-if="user.facebookId" :class="style.badge">Facebook</span>
            </div>
          </div>

          <div :class="style.actions">
            <span :class="[style.status, user.isBanned ? style.banned : style.active]">
              <UserX v-if="user.isBanned" :size="12" />
              <UserCheck v-else :size="12" />
              {{ user.isBanned ? 'Banned' : 'Active' }}
            </span>
            <AdminUserActions :user-id="user.id" :is-banned="user.isBanned" />
          </div>
        </div>

        <div :class="style.grid">
          <div :class="style.item">
            <Mail :size="14" />
            <span>{{ user.email }}</span>
          </div>

          <div :class="style.item">
            <Calendar :size="14" />
            <div style="display: flex; flex-direction: column; row-gap: 1px">
              <span style="line-height: 20px">
                Created: {{ new Date(user.createdAt).toLocaleString() }}
              </span>
              <span style="line-height: 20px">
                Updated: {{ new Date(user.updatedAt).toLocaleString() }}
              </span>
            </div>
          </div>

          <div :class="style.item">
            <UserIcon :size="14" />
            <span>
              Role: <b>{{ user.role }}</b>
            </span>
          </div>

          <div :class="style.item">
            <UsersRound :size="14" />
            <span>
              Gender: <b>{{ user.gender ?? '—' }}</b>
            </span>
          </div>
        </div>

        <div :class="style.footerActions">
          <AppButton variant="ghost" :class="style.button" @click="handleCopyEmail">
            <Mail :size="14" />
            Copy email
          </AppButton>
        </div>
      </div>
    </div>

    <div :class="style.bottom">
      <span :class="style.id"> ID: {{ user.id }} </span>
    </div>
  </article>
</template>

<style module>
.card {
  border-radius: 16px;
  background: white;
  min-width: 300px;
  max-width: 550px;
  width: 100%;
  height: 100%;
  padding: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.row {
  display: flex;
  gap: 16px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(#f5f5f5, #e5e5e5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.content {
  flex: 1;
  min-width: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.userInfo {
  min-width: 0;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.email {
  font-size: 12px;
  color: #666;
  margin: 2px 0 6px;
}

.badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  background: #eef6ff;
  color: #2563eb;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
}

.actions {
  display: flex;
  align-items: center;
}

.status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
}

.active {
  background: #dcfce7;
  color: #166534;
}

.banned {
  background: #fee2e2;
  color: #991b1b;
}

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  font-size: 12px;
  color: #555;
}

.item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.footerActions {
  margin-top: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px !important;
  border-radius: 8px;
  border: 1px solid #eee !important;
  background: white;
  cursor: pointer;
  font-size: 14px;
}

.bottom {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #eee;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.id {
  background: #f1f1f1;
  padding: 2px 6px;
  border-radius: 6px;
}
</style>
