<script setup lang="ts">
import { computed } from "vue";

const { locale, locales, setLocale } = useI18n();

const items = computed(() =>
  (locales.value as readonly { code: string }[]).map((l) => ({
    code: l.code,
    label: l.code.toUpperCase(),
  })),
);

const activeIndex = computed(() => items.value.findIndex((i) => i.code === locale.value));
</script>

<template>
  <div
    class="lang-toggle"
    role="group"
    aria-label="language"
    :style="{
      '--lang-toggle-count': items.length,
      '--lang-toggle-index': activeIndex,
    }"
  >
    <span class="lang-toggle__thumb" aria-hidden="true" />
    <button
      v-for="item in items"
      :key="item.code"
      type="button"
      class="lang-toggle__option"
      :class="{ 'lang-toggle__option--active': item.code === locale }"
      :aria-pressed="item.code === locale"
      @click="setLocale(item.code)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-toggle {
  --lang-toggle-pad: 4px;
  position: relative;
  display: inline-flex;
  padding: var(--lang-toggle-pad);
  background: var(--color-soft);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  isolation: isolate;
}

.lang-toggle__thumb {
  position: absolute;
  top: var(--lang-toggle-pad);
  left: var(--lang-toggle-pad);
  height: calc(100% - var(--lang-toggle-pad) * 2);
  width: calc((100% - var(--lang-toggle-pad) * 2) / var(--lang-toggle-count));
  background: var(--theme-pink);
  border-radius: var(--radius-pill);
  box-shadow: 0 2px 8px -2px rgba(255, 92, 185, 0.55);
  transform: translateX(calc(100% * var(--lang-toggle-index)));
  transition:
    transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.2s ease;
  z-index: 0;
}

.lang-toggle__option {
  appearance: none;
  background: none;
  border: none;
  width: calc((100% - var(--lang-toggle-pad) * 2) / var(--lang-toggle-count));
  cursor: pointer;
  padding: 5px 12px;
  min-width: 36px;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-mute);
  border-radius: var(--radius-pill);
  position: relative;
  z-index: 1;
  transition: color 0.2s ease;
}

.lang-toggle__option:hover {
  color: var(--color-ink);
}

.lang-toggle__option--active {
  color: #fff;
}

.lang-toggle__option--active:hover {
  color: #fff;
}

.lang-toggle__option:focus-visible {
  outline: 2px solid var(--theme-blue);
  outline-offset: 2px;
}
</style>
