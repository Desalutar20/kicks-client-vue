<script lang="ts" setup></script>

<template>
  <section :class="$style.section">
    <div :class="$style.content">
      <p :class="$style.supTitle">Limited time only</p>
      <p :class="$style.subTitle">Get 30% off</p>
      <p :class="$style.text">
        Sneakers made with your comfort in mind so you can put all of your focus into your next
        session.
      </p>
    </div>
  </section>
</template>

<style module>
.section {
  border-radius: 64px;
  overflow: hidden;
  background-image: url('../assets/hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 45px 16px;
}

.content {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  max-width: 500px;
  width: 100%;
}

.supTitle {
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 14px;
  color: var(--gray);
}

.subTitle {
  font-weight: 600;
  font-size: 32px;
  color: var(--white);
  line-height: 130%;
}

.text {
  font-family: var(--second-family);
  font-size: 16px;
  color: var(--gray);
}

@media (min-width: 768px) {
  .section {
    padding: 102px 40px;
  }

  .supTitle {
    font-size: 24px;
  }

  .subTitle {
    font-size: 74px;
  }

  .text {
    font-size: 20px;
  }
}
</style>
