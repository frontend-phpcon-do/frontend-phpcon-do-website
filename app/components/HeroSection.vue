<script setup lang="ts">
import { SITE_LINKS } from "../constants";
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__blob hero__blob--pink" />
      <span class="hero__blob hero__blob--blue" />
      <span class="hero__grid" />
    </div>

    <div class="hero__inner">
      <div class="hero__meta">
        <span class="hero__tag">// HOKKAIDO ✕ FRONTEND ✕ PHP</span>
        <span class="hero__divider" aria-hidden="true" />
        <span class="hero__tag hero__tag--muted">EDITION_2026</span>
      </div>

      <h1 class="hero__title">
        <span class="hero__title-line">Frontend</span>
        <span class="hero__title-line">
          <span class="hero__title-amp" aria-hidden="true">&amp;</span>
          PHP Conference
        </span>
        <span class="hero__title-line hero__title-line--accent">
          Hokkaido <span class="hero__title-year">/ 2026</span>
        </span>
      </h1>

      <p class="hero__lede">{{ $t("site.name") }}</p>

      <dl class="hero__facts">
        <div class="hero__fact">
          <dt>DATE</dt>
          <dd>
            <time datetime="2026-06-06T10:40">{{ $t("site.date") }}</time>
          </dd>
        </div>
        <div class="hero__fact">
          <dt>VENUE</dt>
          <dd>{{ $t("site.venue") }}</dd>
        </div>
      </dl>

      <div class="hero__actions">
        <a :href="SITE_LINKS.buyTicket" class="hero__cta" target="_blank" rel="noopener">
          <span>{{ $t("cta.buyTicket") }}</span>
          <span class="hero__cta-arrow" aria-hidden="true">→</span>
        </a>
        <a href="#overview" class="hero__secondary">
          <span class="hero__secondary-dot" aria-hidden="true" />
          <span>{{ $t("nav.overview") }}</span>
        </a>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <img src="/key-visual.svg" alt="" width="1200" height="630" loading="eager" />
      </div>
    </div>

    <div class="hero__ticker" aria-hidden="true">
      <div class="hero__ticker-track">
        <span v-for="i in 2" :key="i" class="hero__ticker-row">
          <span>2026.06.06 SAT</span>
          <span class="hero__ticker-star">✦</span>
          <span>SAPPORO CONVENTION CENTER</span>
          <span class="hero__ticker-star">✦</span>
          <span>FRONTEND × PHP</span>
          <span class="hero__ticker-star">✦</span>
          <span>#frontend_phpcon_do</span>
          <span class="hero__ticker-star">✦</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-block: clamp(64px, 10vw, 128px) clamp(0px, 4vw, 48px);
  isolation: isolate;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: hero-float 14s ease-in-out infinite;
}

.hero__blob--pink {
  width: 480px;
  height: 480px;
  background: var(--theme-pink);
  top: -120px;
  right: -80px;
}

.hero__blob--blue {
  width: 520px;
  height: 520px;
  background: var(--theme-blue);
  bottom: -200px;
  left: -120px;
  animation-delay: -4s;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-hairline) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-hairline) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 80%);
}

@keyframes hero-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -30px) scale(1.06);
  }
}

.hero__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: grid;
  gap: 28px;
}

.hero__meta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero__tag {
  color: var(--color-ink);
  font-weight: 600;
}

.hero__tag--muted {
  color: var(--color-mute);
  padding: 4px 10px;
  border: 1px dashed var(--color-hairline);
  border-radius: var(--radius-pill);
}

.hero__divider {
  width: 32px;
  height: 1px;
  background: var(--color-line);
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 9vw, 6.5rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.035em;
  margin: 0;
  display: grid;
}

.hero__title-line {
  display: block;
}

.hero__title-line--accent {
  color: var(--theme-blue);
  font-style: italic;
  font-weight: 700;
}

.hero__title-amp {
  color: var(--theme-pink);
  font-style: italic;
  margin-right: 0.05em;
}

.hero__title-year {
  font-family: var(--font-mono);
  font-style: normal;
  font-weight: 500;
  font-size: 0.4em;
  letter-spacing: 0;
  color: var(--color-mute);
  vertical-align: 0.45em;
  margin-left: 0.2em;
}

.hero__lede {
  font-size: 1.05rem;
  color: var(--color-mute);
  margin: 0;
  max-width: 28em;
}

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 4px 0 0;
}

.hero__fact {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  background: var(--color-paper);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-pop);
}

.hero__fact dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-pink);
  font-weight: 700;
}

.hero__fact dd {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 28px;
  background: var(--theme-pink);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-line);
  box-shadow: var(--shadow-pop);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease;
}

.hero__cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 0 var(--color-line);
  background: #ff7ec8;
}

.hero__cta:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 var(--color-line);
}

.hero__cta-arrow {
  transition: transform 0.18s ease;
}

.hero__cta:hover .hero__cta-arrow {
  transform: translateX(4px);
}

.hero__secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-ink);
  position: relative;
}

.hero__secondary-dot {
  width: 8px;
  height: 8px;
  background: var(--theme-blue);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(11, 148, 227, 0.18);
}

.hero__secondary::after {
  content: "";
  position: absolute;
  left: 22px;
  right: 0;
  bottom: 8px;
  height: 1px;
  background: currentColor;
  transform-origin: left;
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.hero__secondary:hover::after {
  transform: scaleX(1);
}

.hero__visual {
  margin: clamp(28px, 6vw, 64px) auto 0;
  width: min(720px, 100%);
  padding: 24px;
  background: var(--color-paper);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-pop);
  transform: rotate(-1deg);
}

.hero__visual img {
  width: 100%;
  height: auto;
  display: block;
}

.hero__ticker {
  margin-top: clamp(40px, 6vw, 72px);
  padding-block: 18px;
  background: var(--color-ink);
  color: var(--color-paper);
  border-block: 1px solid var(--color-line);
  overflow: hidden;
}

.hero__ticker-track {
  display: flex;
  width: max-content;
  animation: hero-ticker 32s linear infinite;
}

.hero__ticker-row {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  padding-right: 32px;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
}

.hero__ticker-star {
  color: var(--theme-pink);
}

.hero__ticker-row span:nth-child(7) {
  color: var(--theme-pink);
}

@keyframes hero-ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .hero__visual {
    padding: 14px;
  }
  .hero__ticker-row {
    font-size: 0.85rem;
    gap: 24px;
  }
}
</style>
