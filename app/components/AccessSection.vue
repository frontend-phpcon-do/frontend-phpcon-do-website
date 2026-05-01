<script setup lang="ts">
const mapHref =
  "https://www.google.com/maps/search/?api=1&query=%E6%9C%AD%E5%B9%8C%E3%82%B3%E3%83%B3%E3%83%99%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC";
const venueSiteHref = "https://www.sora-scc.jp/";
</script>

<template>
  <SectionContainer id="access" index="02" label="Access">
    <h2>{{ $t("access.heading") }}</h2>
    <p>{{ $t("access.description") }}</p>

    <div class="access__card">
      <div class="access__head">
        <p class="access__caption">// VENUE</p>
        <p class="access__venue">{{ $t("access.venueName") }}</p>
        <p class="access__address">{{ $t("access.address") }}</p>
      </div>

      <dl class="access__facts">
        <div class="access__fact">
          <dt>{{ $t("access.station.label") }}</dt>
          <dd>{{ $t("access.station.value") }}</dd>
        </div>
        <div class="access__fact">
          <dt>{{ $t("access.airport.label") }}</dt>
          <dd>{{ $t("access.airport.value") }}</dd>
        </div>
      </dl>

      <div class="access__actions">
        <a
          :href="mapHref"
          class="access__action access__action--primary"
          target="_blank"
          rel="noopener"
        >
          <span>{{ $t("access.openMap") }}</span>
          <span class="access__arrow" aria-hidden="true">→</span>
        </a>
        <a :href="venueSiteHref" class="access__action" target="_blank" rel="noopener">
          <span>{{ $t("access.venueSite") }}</span>
          <span class="access__arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </SectionContainer>
</template>

<style scoped>
.access__card {
  width: 100%;
  max-width: 760px;
  margin-top: 12px;
  padding: 28px;
  background: var(--color-paper);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-pop);
  display: grid;
  gap: 24px;
}

.access__head {
  display: grid;
  gap: 6px;
}

.access__caption {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-pink);
  margin: 0;
}

.access__venue {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.015em;
  margin: 0;
}

.access__address {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-mute);
  line-height: 1.6;
}

.access__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 0;
  padding-top: 20px;
  border-top: 1px dashed var(--color-hairline);
}

.access__fact {
  display: grid;
  gap: 6px;
}

.access__fact dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-blue);
  font-weight: 700;
}

.access__fact dd {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.55;
  white-space: pre-line;
}

.access__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.access__action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-line);
  background: var(--color-paper);
  color: var(--color-ink);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;
}

.access__action:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px -8px var(--color-line);
}

.access__action--primary {
  background: var(--color-ink);
  color: var(--color-paper);
}

.access__action--primary:hover {
  background: var(--theme-pink);
}

.access__arrow {
  transition: transform 0.18s ease;
}

.access__action:hover .access__arrow {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .access__card {
    padding: 22px;
  }
  .access__venue {
    font-size: 1.2rem;
  }
}
</style>
