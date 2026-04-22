<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <nav
        class="site-footer__nav"
        aria-label="secondary"
      >
        <ul class="site-footer__nav-list">
          <li><a href="#overview">{{ $t('nav.overview') }}</a></li>
          <li><a href="#access">{{ $t('nav.access') }}</a></li>
          <li><a href="#sponsors">{{ $t('nav.sponsors') }}</a></li>
          <li><a href="#staff">{{ $t('nav.staff') }}</a></li>
          <li>
            <NuxtLink :to="localePath('/job-board')">
              {{ $t('nav.jobBoard') }}
            </NuxtLink>
          </li>
          <li><a href="#timetable">{{ $t('nav.timetable') }}</a></li>
          <li><a href="#blog">{{ $t('nav.blog') }}</a></li>
        </ul>
      </nav>

      <ul class="site-footer__legal">
        <li>
          <NuxtLink :to="localePath('/code-of-conduct')">
            {{ $t('legal.coc') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/privacy')">
            {{ $t('legal.privacy') }}
          </NuxtLink>
        </li>
      </ul>

      <p class="site-footer__copyright">
        {{ $t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  border-top: 1px solid #e5e5e5;
  padding-block: 40px;
}

.site-footer__inner {
  max-width: var(--site-max-width);
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.site-footer__nav-list,
.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.site-footer__nav-list a,
.site-footer__legal a {
  color: inherit;
  text-decoration: none;
}

.site-footer__copyright {
  margin: 0;
  font-size: 14px;
  opacity: 0.7;
}
</style>
