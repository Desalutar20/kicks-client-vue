<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { ToastContainer } from 'vue-toastflow'
import Spinner from '@/core/components/ui/Spinner.vue'
import { useGetProfile } from '@/core/composables/use-get-profile.ts'
import { ConfirmDialog } from 'primevue'
import AppButton from '@/core/components/ui/AppButton.vue'

const { isPending, isFetching } = useGetProfile()
</script>

<template>
  <ToastContainer />
  <ConfirmDialog>
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div :class="$style.mask">
        <div :class="$style.dialog">
          <div :class="$style.content">
            <div v-if="message.icon" :class="$style.icon">
              <i :class="message.icon" />
            </div>

            <h3 :class="$style.title">{{ message.header }}</h3>
            <p :class="$style.text">{{ message.message }}</p>
          </div>

          <div :class="$style.footer">
            <AppButton :class="$style.btn" @click="rejectCallback" variant="secondary"
              >Cancel</AppButton
            >

            <AppButton
              variant="third"
              v-if="message.acceptProps?.severity !== 'danger'"
              @click="acceptCallback"
              :class="$style.btn"
            >
              {{ message.acceptProps?.label || 'Confirm' }}
            </AppButton>

            <AppButton
              variant="destructive"
              v-if="message.acceptProps?.severity === 'danger'"
              @click="acceptCallback"
              :class="$style.btn"
            >
              {{ message.acceptProps?.label || 'Delete' }}
            </AppButton>
          </div>
        </div>
      </div>
    </template>
  </ConfirmDialog>
  <div v-if="isFetching || isPending" :class="$style.loadingContainer">
    <Spinner size="xl" />
  </div>
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<style module>
.loadingContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.dialog {
  width: 360px;
  border-radius: 18px;

  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);

  border: 1px solid rgba(0, 0, 0, 0.06);

  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.18),
    0 8px 20px rgba(0, 0, 0, 0.08);

  overflow: hidden;
}

.content {
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #0f172a;
  line-height: 1.3;
}

.text {
  font-size: 14px;
  color: #64748b;
  max-width: 260px;
  margin: 0 auto;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 20px;
}

.btn {
  font-size: 14px !important;
  padding: 8px 14px !important;
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
  border: 1px solid transparent !important;
}

.reject {
  background: #eee;
  color: black;
  border-radius: 8px;
  padding: 6px 12px;
}
</style>
