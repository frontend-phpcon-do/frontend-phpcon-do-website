<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink
        :to="localePath('/')"
        class="site-header__logo"
      >
        {{ $t('site.name') }}
      </NuxtLink>

      <nav
        class="site-header__nav"
        aria-label="primary"
      >
        <ul class="site-header__nav-list">
          <li><a href="#overview">{{ $t('nav.overview') }}</a></li>
          <li><a href="#access">{{ $t('nav.access') }}</a></li>
          <li><a href="#sponsors">{{ $t('nav.sponsors') }}</a></li>
          <li><a href="#staff">{{ $t('nav.staff') }}</a></li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a
          href="#"
          class="site-header__cta"
        >
          {{ $t('cta.buyTicket') }}
        </a>
        <LangSwitcher />
      </div>
    </div>
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
</style>
