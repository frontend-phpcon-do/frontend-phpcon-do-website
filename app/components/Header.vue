<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { ref } from "vue";
import { SITE_LINKS } from "../constants";

const localePath = useLocalePath();
const isOpen = ref(false);

type NavItem =
  | { kind: "anchor"; href: string; key: string }
  | { kind: "page"; to: string; key: string };

const navItems: readonly NavItem[] = [
  { kind: "anchor", href: "/#overview", key: "nav.overview" },
  { kind: "anchor", href: "/#access", key: "nav.access" },
  { kind: "anchor", href: "/#sponsors", key: "nav.sponsors" },
  { kind: "anchor", href: "/#staff", key: "nav.staff" },
  { kind: "page", to: "/timetable", key: "nav.timetable" },
  { kind: "page", to: "/job-board", key: "nav.jobBoard" },
] as const;

function close() {
  isOpen.value = false;
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink :to="localePath('/')" class="site-header__logo" @click="close">
        <span class="site-header__logo-hash">#</span>
        <span class="site-header__logo-name">frontend_phpcon</span>
        <span class="site-header__logo-tld">_do</span>
      </NuxtLink>

      <nav class="site-header__nav site-header__nav--desktop" aria-label="primary">
        <ul class="site-header__nav-list">
          <li v-for="item in navItems" :key="item.key">
            <NuxtLink
              v-if="item.kind === 'page'"
              :to="localePath(item.to)"
              class="site-header__nav-link"
            >
              {{ $t(item.key) }}
            </NuxtLink>
            <a v-else :href="item.href" class="site-header__nav-link">
              {{ $t(item.key) }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions site-header__actions--desktop">
        <a :href="SITE_LINKS.buyTicket" class="site-header__cta" target="_blank" rel="noopener">
          <span>{{ $t("cta.buyTicket") }}</span>
          <span class="site-header__cta-arrow" aria-hidden="true">→</span>
        </a>
        <LangSwitcher />
      </div>

      <button
        type="button"
        class="site-header__hamburger"
        :class="{ 'site-header__hamburger--open': isOpen }"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mobile-menu"
        @click="isOpen = !isOpen"
      >
        <span /><span /><span />
      </button>
    </div>

    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        key="backdrop"
        class="site-header__backdrop"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.2 }"
        @click="close"
      />
      <motion.nav
        v-if="isOpen"
        id="mobile-menu"
        key="drawer"
        class="site-header__drawer"
        aria-label="primary mobile"
        :initial="{ x: '100%' }"
        :animate="{ x: '0%' }"
        :exit="{ x: '100%' }"
        :transition="{ type: 'spring', stiffness: 260, damping: 30 }"
      >
        <p class="site-header__drawer-eyebrow">// MENU</p>
        <ul class="site-header__drawer-list">
          <motion.li
            v-for="(item, i) in navItems"
            :key="item.key"
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.15 + i * 0.06, duration: 0.3, ease: 'easeOut' }"
          >
            <NuxtLink
              v-if="item.kind === 'page'"
              :to="localePath(item.to)"
              class="site-header__drawer-link"
              @click="close"
            >
              <span>{{ $t(item.key) }}</span>
              <span class="site-header__drawer-arrow" aria-hidden="true">→</span>
            </NuxtLink>
            <a v-else :href="item.href" class="site-header__drawer-link" @click="close">
              <span>{{ $t(item.key) }}</span>
              <span class="site-header__drawer-arrow" aria-hidden="true">→</span>
            </a>
          </motion.li>
        </ul>

        <motion.div
          class="site-header__drawer-footer"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            delay: 0.15 + navItems.length * 0.06,
            duration: 0.3,
            ease: 'easeOut',
          }"
        >
          <a
            :href="SITE_LINKS.buyTicket"
            class="site-header__drawer-cta"
            target="_blank"
            rel="noopener"
            @click="close"
          >
            {{ $t("cta.buyTicket") }}
            <span aria-hidden="true">→</span>
          </a>
          <LangSwitcher />
        </motion.div>
      </motion.nav>
    </AnimatePresence>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(251, 250, 245, 0.86);
  backdrop-filter: saturate(140%) blur(10px);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--color-hairline);
  z-index: 10;
}

.site-header__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: flex;
  align-items: center;
  gap: 32px;
  height: 72px;
}

.site-header__logo {
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: var(--color-ink);
  transition: opacity 0.2s ease;
}

.site-header__logo:hover {
  opacity: 0.7;
}

.site-header__logo-hash {
  color: var(--theme-blue);
  font-size: 1.25rem;
  margin-right: 1px;
  transform: translateY(1px);
}

.site-header__logo-tld {
  color: var(--theme-pink);
}

.site-header__nav {
  flex: 1;
}

.site-header__nav-list {
  display: flex;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-header__nav-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.site-header__nav-link:hover {
  background: var(--color-soft);
  color: var(--theme-blue);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.site-header__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--color-ink);
  color: #fff;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.site-header__cta:hover {
  background: var(--theme-pink);
  transform: translateY(-1px);
  box-shadow: 0 8px 18px -8px var(--theme-pink);
}

.site-header__cta-arrow {
  transition: transform 0.2s ease;
}

.site-header__cta:hover .site-header__cta-arrow {
  transform: translateX(3px);
}

.site-header__hamburger {
  display: none;
  appearance: none;
  background: none;
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-sm);
  width: 44px;
  height: 44px;
  padding: 10px;
  margin-left: auto;
  cursor: pointer;
  position: relative;
  z-index: 30;
  background: var(--color-paper);
}

.site-header__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-ink);
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
  transform-origin: center;
}

.site-header__hamburger span + span {
  margin-top: 6px;
}

.site-header__hamburger--open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.site-header__hamburger--open span:nth-child(2) {
  opacity: 0;
}

.site-header__hamburger--open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.site-header__backdrop {
  position: fixed;
  inset: 0;
  height: 100vh;
  height: 100dvh;
  background: rgba(14, 14, 26, 0.45);
  z-index: 20;
}

.site-header__drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(86vw, 360px);
  height: 100vh;
  height: 100dvh;
  background: var(--color-paper);
  z-index: 25;
  padding: 88px 28px max(28px, env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: -16px 0 40px rgba(14, 14, 26, 0.18);
  border-left: 1px solid var(--color-line);
  overflow-y: auto;
}

.site-header__drawer-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-pink);
  margin: 0;
}

.site-header__drawer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.site-header__drawer-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 4px;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px dashed var(--color-hairline);
  transition: color 0.2s ease;
}

.site-header__drawer-link:hover {
  color: var(--theme-blue);
}

.site-header__drawer-arrow {
  margin-left: auto;
  font-size: 1.1rem;
  color: var(--theme-pink);
}

.site-header__drawer-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.site-header__drawer-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: var(--theme-pink);
  color: #fff;
  border-radius: var(--radius-pill);
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: var(--shadow-pop);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.site-header__drawer-cta:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 var(--color-line);
}

@media (max-width: 860px) {
  .site-header__nav--desktop,
  .site-header__actions--desktop {
    display: none;
  }

  .site-header__hamburger {
    display: block;
  }

  .site-header__inner {
    height: 64px;
  }
}

@media (min-width: 861px) {
  .site-header__backdrop,
  .site-header__drawer {
    display: none;
  }
}
</style>
