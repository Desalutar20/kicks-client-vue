<script lang="ts" setup>
import AdminFooter from '@/modules/admin/components/AdminFooter.vue'
import AdminHeader from '@/modules/admin/components/AdminHeader.vue'
import AdminSidebar from '@/modules/admin/components/AdminSidebar.vue'
</script>

<template>
  <div :class="$style.container">
    <AdminSidebar :class="$style.sidebar" />
    <div :class="$style.innerContainer">
      <AdminHeader />

      <div :class="$style.mainContainer">
        <main :class="$style.main">
          <RouterView />
        </main>
        <AdminFooter />
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  min-height: 100vh;
}

.innerContainer {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
  min-height: 100dvh;
}

.mainContainer {
  width: calc(100vw - var(--sidebar-min-width));
  padding: 0 20px;
  display: flex;

  flex-direction: column;
  flex: 1;
  row-gap: 20px;
}

.main {
  flex: 1;
}

@media (min-width: 1280px) {
  .mainContainer {
    display: flex;
    /* padding-left: 400px; */
  }
}

@media (max-width: 1500px) {
  .sidebar {
    display: none !important;
  }

  .mainContainer {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
