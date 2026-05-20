<script lang="ts" setup>
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.galleria">
        <Skeleton width="100%" height="273px" borderRadius="18px" />

        <div :class="$style.thumbnailRow">
          <Skeleton v-for="n in 4" :key="n" width="72px" height="72px" borderRadius="8px" />
        </div>
      </div>

      <div :class="$style.images">
        <Skeleton v-for="n in 4" :key="n" width="100%" height="100%" borderRadius="48px" />
      </div>
    </div>

    <div :class="$style.right">
      <div :class="$style.title">
        <Skeleton width="70%" height="32px" />
        <Skeleton width="120px" height="28px" />
      </div>

      <div :class="$style.colorsSizeContainer">
        <Skeleton width="70px" height="18px" />

        <div :class="$style.colors">
          <Skeleton v-for="n in 5" :key="n" shape="circle" size="32px" />
        </div>
      </div>

      <div :class="$style.colorsSizeContainer">
        <Skeleton width="60px" height="18px" />

        <div :class="$style.sizes">
          <Skeleton v-for="n in 6" :key="n" width="48px" height="48px" borderRadius="8px" />
        </div>
      </div>

      <div :class="$style.btns">
        <Skeleton width="100%" height="56px" borderRadius="16px" />
        <Skeleton width="100%" height="56px" borderRadius="16px" />
      </div>

      <div :class="$style.about">
        <Skeleton width="160px" height="18px" />

        <div :class="$style.aboutText">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="95%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="75%" height="16px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.left {
  width: 100%;
}

.galleria {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.thumbnailRow {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.images {
  display: none;
}

.right {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  max-width: 430px;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.colorsSizeContainer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aboutText {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 600px) {
  .galleria > :global(.p-skeleton) {
    height: 350px !important;
  }
}
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    column-gap: 16px;
  }

  .left {
    flex: 0 1 70%;
  }

  .right {
    flex: 1;
    row-gap: 32px;
  }

  .galleria {
    display: none;
  }

  .images {
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 429px));
    grid-template-rows: repeat(2, clamp(300px, 40vw, 510px));
    gap: 16px;
  }
}
</style>
