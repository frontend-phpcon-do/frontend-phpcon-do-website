<script setup lang="ts">
import { SITE_LINKS } from "../constants";

const localePath = useLocalePath();

const navItems = [
  { href: "#overview", key: "nav.overview" },
  { href: "#access", key: "nav.access" },
  { href: "#sponsors", key: "nav.sponsors" },
  { href: "#staff", key: "nav.staff" },
  { href: "#timetable", key: "nav.timetable" },
  { href: "#blog", key: "nav.blog" },
] as const;
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__stripe" aria-hidden="true">
      <span class="site-footer__stripe-block site-footer__stripe-block--blue" />
      <span class="site-footer__stripe-block site-footer__stripe-block--pink" />
      <span class="site-footer__stripe-block site-footer__stripe-block--ink" />
    </div>

    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <p class="site-footer__brand-mark">
          <span class="site-footer__hash">#</span>frontend_phpcon<span class="site-footer__tld"
            >_do</span
          >
        </p>
        <p class="site-footer__brand-line">{{ $t("site.name") }}</p>
        <p class="site-footer__brand-meta">
          <span>{{ $t("site.date") }}</span>
          <span class="site-footer__sep" aria-hidden="true">/</span>
          <span>{{ $t("site.venue") }}</span>
        </p>
      </div>

      <div class="site-footer__cols">
        <nav class="site-footer__col" :aria-label="$t('nav.overview')">
          <p class="site-footer__col-label">// SITE</p>
          <ul>
            <li v-for="item in navItems" :key="item.key">
              <a :href="item.href">{{ $t(item.key) }}</a>
            </li>
            <li>
              <NuxtLink :to="localePath('/job-board')">{{ $t("nav.jobBoard") }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav class="site-footer__col" :aria-label="$t('legal.coc')">
          <p class="site-footer__col-label">// INFO</p>
          <ul>
            <li>
              <a :href="SITE_LINKS.codeOfConduct" target="_blank" rel="noopener">
                {{ $t("legal.coc") }}
              </a>
            </li>
            <li>
              <a :href="SITE_LINKS.privacyPolicy" target="_blank" rel="noopener">
                {{ $t("legal.privacy") }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="site-footer__col">
          <p class="site-footer__col-label">// TICKET</p>
          <a :href="SITE_LINKS.buyTicket" class="site-footer__cta" target="_blank" rel="noopener">
            {{ $t("cta.buyTicket") }}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">{{ $t("footer.copyright") }}</p>
        <p class="site-footer__build" aria-hidden="true">build.0001 // sapporo</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background: var(--color-paper);
  border-top: 1px solid var(--color-line);
  margin-top: 64px;
}

.site-footer__stripe {
  display: flex;
  height: 8px;
  width: 100%;
}

.site-footer__stripe-block {
  flex: 1;
}

.site-footer__stripe-block--blue {
  background: var(--theme-blue);
}

.site-footer__stripe-block--pink {
  background: var(--theme-pink);
}

.site-footer__stripe-block--ink {
  background: var(--color-ink);
}

.site-footer__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding: 56px var(--section-padding-x) 32px;
  display: grid;
  gap: 40px;
}

.site-footer__brand {
  display: grid;
  gap: 8px;
}

.site-footer__brand-mark {
  font-family: var(--font-mono);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
}

.site-footer__hash {
  color: var(--theme-blue);
}

.site-footer__tld {
  color: var(--theme-pink);
}

.site-footer__brand-line {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin: 0;
  max-width: 24em;
}

.site-footer__brand-meta {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin: 4px 0 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--color-mute);
}

.site-footer__sep {
  color: var(--theme-pink);
}

.site-footer__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 32px;
  padding-block: 24px;
  border-block: 1px dashed var(--color-hairline);
}

.site-footer__col-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-pink);
  margin: 0 0 14px;
}

.site-footer__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.site-footer__col ul a {
  text-decoration: none;
  color: var(--color-ink);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.18s ease;
  position: relative;
}

.site-footer__col ul a:hover {
  color: var(--theme-blue);
}

.site-footer__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: var(--color-ink);
  color: var(--color-paper);
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.site-footer__cta:hover {
  background: var(--theme-pink);
  transform: translateY(-1px);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.site-footer__copyright {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-mute);
}

.site-footer__build {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-mute);
  opacity: 0.7;
}
</style>
