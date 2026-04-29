<script setup lang="ts">
defineProps<{
  index?: string;
  label?: string;
  align?: "start" | "center";
}>();
</script>

<template>
  <section class="section-container">
    <div class="section-container__inner" :data-align="align ?? 'start'">
      <p v-if="label || index" class="section-container__label">
        <span v-if="index" class="section-container__index">[{{ index }}]</span>
        <span v-if="label">{{ label }}</span>
      </p>
      <div class="section-container__body">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  width: 100%;
  padding-block: clamp(64px, 8vw, 112px);
  position: relative;
}

.section-container__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: grid;
  gap: 24px;
}

.section-container__inner[data-align="center"] {
  justify-items: center;
  text-align: center;
}

.section-container__inner[data-align="center"] .section-container__body {
  display: grid;
  justify-items: center;
}

.section-container__label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink);
  margin: 0;
}

.section-container__label::after {
  content: "";
  display: inline-block;
  width: 36px;
  height: 1px;
  background: var(--color-line);
}

.section-container__index {
  font-weight: 700;
  color: var(--theme-pink);
}

.section-container__body {
  width: 100%;
}

.section-container__body :deep(h1),
.section-container__body :deep(h2) {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0 0 24px;
  max-width: 18ch;
}

.section-container__inner[data-align="center"] .section-container__body :deep(h1),
.section-container__inner[data-align="center"] .section-container__body :deep(h2) {
  margin-inline: auto;
}

.section-container__body :deep(p) {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-ink);
  max-width: var(--paragraph-max-width);
}

.section-container__inner[data-align="center"] .section-container__body :deep(p) {
  margin-inline: auto;
}
</style>
