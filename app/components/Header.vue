<script setup lang="ts">
import { motion, AnimatePresence } from "motion-v";
import { ref } from "vue";
import { SITE_LINKS } from "../constants";

const localePath = useLocalePath();
const isOpen = ref(false);

const navItems = [
  { href: "#overview", key: "nav.overview" },
  { href: "#access", key: "nav.access" },
  { href: "#sponsors", key: "nav.sponsors" },
  { href: "#staff", key: "nav.staff" },
] as const;

function close() {
  isOpen.value = false;
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink :to="localePath('/')" class="site-header__logo" @click="close">
        #frontend_phpcon_do
      </NuxtLink>

      <nav class="site-header__nav site-header__nav--desktop" aria-label="primary">
        <ul class="site-header__nav-list">
          <li v-for="item in navItems" :key="item.key">
            <a :href="item.href">{{ $t(item.key) }}</a>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions site-header__actions--desktop">
        <a :href="SITE_LINKS.buyTicket" class="site-header__cta" target="_blank" rel="noopener">
          {{ $t("cta.buyTicket") }}
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
        <ul class="site-header__drawer-list">
          <motion.li
            v-for="(item, i) in navItems"
            :key="item.key"
            :initial="{ opacity: 0, y: 16 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.15 + i * 0.06, duration: 0.3, ease: 'easeOut' }"
          >
            <a :href="item.href" class="site-header__drawer-link" @click="close">
              {{ $t(item.key) }}
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
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  z-index: 10;
}

.site-header__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
}

.site-header__logo {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}

.site-header__nav {
  flex: 1;
}

.site-header__nav-list {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-header__nav-list a {
  text-decoration: none;
  color: inherit;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.site-header__cta {
  padding: 8px 16px;
  border: 1px solid currentColor;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
}

.site-header__hamburger {
  display: none;
  appearance: none;
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  padding: 8px;
  margin-left: auto;
  cursor: pointer;
  position: relative;
  z-index: 30;
}

.site-header__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: currentColor;
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
  background: rgba(0, 0, 0, 0.4);
  z-index: 20;
}

.site-header__drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(80vw, 320px);
  background: #fff;
  z-index: 25;
  padding: 80px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.08);
}

.site-header__drawer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.site-header__drawer-link {
  display: block;
  padding: 12px 0;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #eee;
}

.site-header__drawer-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.site-header__drawer-cta {
  display: inline-block;
  text-align: center;
  padding: 12px 16px;
  background: var(--theme-pink);
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 768px) {
  .site-header__nav--desktop,
  .site-header__actions--desktop {
    display: none;
  }

  .site-header__hamburger {
    display: block;
  }
}

@media (min-width: 769px) {
  .site-header__backdrop,
  .site-header__drawer {
    display: none;
  }
}
</style>
