<script setup lang="ts">
const { t, locale } = useI18n();
const localeHead = useLocaleHead({ addSeoAttributes: true });

const SITE_URL = "https://frontend-php-con.hokkaido.jp";
const OG_IMAGE = `${SITE_URL}/og.png`;

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs ?? {},
  link: [...(localeHead.value.link ?? [])],
  meta: [...(localeHead.value.meta ?? [])],
  titleTemplate: (chunk) => (chunk ? `${chunk} | ${t("site.name")}` : t("site.name")),
}));

useSeoMeta({
  title: () => t("site.name"),
  description: () => t("site.description"),
  ogSiteName: () => t("site.name"),
  ogTitle: () => t("site.name"),
  ogDescription: () => t("site.description"),
  ogType: "website",
  ogUrl: SITE_URL,
  ogImage: OG_IMAGE,
  ogImageAlt: () => t("site.name"),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogLocale: () => (locale.value === "ja" ? "ja_JP" : "en_US"),
  twitterCard: "summary_large_image",
  twitterTitle: () => t("site.name"),
  twitterDescription: () => t("site.description"),
  twitterImage: OG_IMAGE,
  twitterImageAlt: () => t("site.name"),
  themeColor: "#ff5cb9",
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <Header />
  <NuxtPage />
  <Footer />
</template>
