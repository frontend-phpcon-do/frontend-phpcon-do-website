<script setup lang="ts">
type SponsorItem = {
  id: string;
  name: string;
  url?: string;
};

const props = defineProps<{
  sponsor: SponsorItem;
}>();

const hasLogoError = ref(false);
const logoSrc = computed(() => `/sponsors/${props.sponsor.id}/logo.png`);
</script>

<template>
  <component
    :is="sponsor.url ? 'a' : 'div'"
    :href="sponsor.url"
    :target="sponsor.url ? '_blank' : undefined"
    :rel="sponsor.url ? 'noopener' : undefined"
    class="sponsor"
  >
    <span class="sponsor__logo">
      <img
        v-if="!hasLogoError"
        :src="logoSrc"
        :alt="sponsor.name"
        loading="lazy"
        @error="hasLogoError = true"
      />
      <span v-else class="sponsor__logo-fallback" aria-hidden="true">
        {{ sponsor.name }}
      </span>
    </span>
    <span class="sponsor__name">{{ sponsor.name }}</span>
  </component>
</template>

<style scoped>
.sponsor {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 14px 18px;
  background: var(--color-paper);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-md);
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
  height: 100%;
}

a.sponsor:hover {
  transform: translateY(-2px);
  border-color: var(--color-line);
  box-shadow: 4px 4px 0 0 var(--color-line);
}

.sponsor__logo {
  position: relative;
  width: var(--sponsor-logo-width, clamp(120px, 22vw, 200px));
  aspect-ratio: 3 / 2;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.sponsor__logo img,
.sponsor__logo-fallback {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  object-fit: contain;
}

.sponsor__logo-fallback {
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  line-height: 1.2;
  color: var(--color-mute);
  text-align: center;
}

@media (min-width: 1024px) {
  .sponsor {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 12px;
    padding: 18px 18px 16px;
  }

  .sponsor__logo {
    width: 100%;
  }

  .sponsor__logo img,
  .sponsor__logo-fallback {
    inset: 12px;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
  }

  .sponsor__name {
    text-align: center;
  }
}

.sponsor__name {
  font-size: clamp(0.95rem, 1.4vw, 1.05rem);
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
  color: var(--color-ink);
}
</style>
