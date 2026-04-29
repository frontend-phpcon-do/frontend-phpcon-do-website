<template>
  <SectionContainer id="sponsors" index="03" label="Sponsors">
    <h2>{{ $t("sponsors.heading") }}</h2>
    <p>{{ $t("sponsors.description") }}</p>
    <TbdBoard :caption="$t('sponsors.caption')" :note="$t('sponsors.note')" tone="pink" />
  </SectionContainer>
</template>
