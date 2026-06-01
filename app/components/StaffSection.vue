<script setup lang="ts">
import { normalizeStaffTypes, type StaffResponse, type StaffType } from "../data/staff";

const runtimeConfig = useRuntimeConfig();
const apiBase = runtimeConfig.public.apiBase;
const { locale } = useI18n();

const { data } = await useFetch<StaffResponse>(`${apiBase}/staff`, {
  query: { type: "structured" },
});

const staffTypes = computed<StaffType[]>(() => normalizeStaffTypes(data.value?.staff_types));

const displayTypeName = (type: StaffType): string =>
  locale.value === "en" ? (type.name_en ?? type.name) : type.name;
</script>

<template>
  <SectionContainer id="staff" index="06" label="Staff">
    <h2>{{ $t("staff.heading") }}</h2>
    <p>{{ $t("staff.description") }}</p>

    <div v-if="staffTypes.length" class="staff__groups">
      <section v-for="type in staffTypes" :key="type.name" class="staff__group">
        <header class="staff__group-header">
          <h3 class="staff__group-name">{{ displayTypeName(type) }}</h3>
        </header>
        <ul class="staff__grid">
          <li v-for="member in type.staff" :key="member.id" class="staff__item">
            <Staff :member="member" />
          </li>
        </ul>
      </section>
    </div>

    <TbdBoard v-else :caption="$t('staff.caption')" :note="$t('staff.note')" tone="blue" />
  </SectionContainer>
</template>

<style scoped>
.staff__groups {
  width: 100%;
  display: grid;
  gap: 56px;
  margin-top: 8px;
}

.staff__group-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-hairline);
}

.staff__group-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.2rem, 2.4vw, 1.6rem);
  letter-spacing: 0.02em;
  color: var(--color-ink);
}

.staff__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 24px 16px;
}

@media (min-width: 640px) {
  .staff__grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

.staff__item {
  display: flex;
  justify-content: center;
}

.staff__item > :deep(.staff-member) {
  width: 100%;
}
</style>
