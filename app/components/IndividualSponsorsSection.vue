<script setup lang="ts">
import { individualSponsors } from "../data/individual-sponsors";

const hasAvatarError = ref<Record<string, boolean>>({});
const avatarSrc = (id: string) => `/individual-sponsors/${id}.png`;
</script>

<template>
  <SectionContainer id="individual-sponsors" index="05" label="Individual Sponsors">
    <h2>{{ $t("individualSponsors.heading") }}</h2>
    <p>{{ $t("individualSponsors.description") }}</p>

    <ul class="individual-sponsors__grid">
      <li
        v-for="sponsor in individualSponsors"
        :key="sponsor.key"
        class="individual-sponsors__item"
      >
        <div class="individual-sponsors__avatar">
          <img
            v-if="!hasAvatarError[sponsor.id]"
            :src="avatarSrc(sponsor.id)"
            :alt="sponsor.name"
            loading="lazy"
            @error="hasAvatarError[sponsor.id] = true"
          />
          <span v-else class="individual-sponsors__avatar-fallback" aria-hidden="true">
            {{ sponsor.name.charAt(0) }}
          </span>
        </div>
        <span class="individual-sponsors__name">{{ sponsor.name }}</span>
      </li>
    </ul>
  </SectionContainer>
</template>

<style scoped>
.individual-sponsors__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px 16px;
  margin-top: 8px;
}

@media (min-width: 640px) {
  .individual-sponsors__grid {
    grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  }
}

.individual-sponsors__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.individual-sponsors__avatar {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-paper);
  border: 1px solid var(--color-hairline);
  flex-shrink: 0;
}

.individual-sponsors__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.individual-sponsors__avatar-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--color-mute);
  text-transform: uppercase;
}

.individual-sponsors__name {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-ink);
  word-break: break-all;
}
</style>
