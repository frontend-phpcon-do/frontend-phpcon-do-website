<template>
  <SectionContainer id="staff" index="05" label="Staff">
    <h2>{{ $t("staff.heading") }}</h2>
    <p>{{ $t("staff.description") }}</p>
    <TbdBoard :caption="$t('staff.caption')" :note="$t('staff.note')" tone="blue" />
  </SectionContainer>
</template>
