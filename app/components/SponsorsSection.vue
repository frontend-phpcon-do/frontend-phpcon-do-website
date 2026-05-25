<script setup lang="ts">
import {
  manualSponsorPlansAfterApi,
  manualSponsorPlansBeforeApi,
  type SponsorPlan,
} from "../data/manual-sponsors";

type SponsorsResponse = {
  sponsor_plans: SponsorPlan[];
};

const runtimeConfig = useRuntimeConfig();
const apiBase = runtimeConfig.public.apiBase;
const { locale } = useI18n();

const { data } = await useFetch<SponsorsResponse>(`${apiBase}/sponsors`);

const plans = computed<SponsorPlan[]>(() => {
  const fromApi = (data.value?.sponsor_plans ?? [])
    .map((plan) => ({
      ...plan,
      name: plan.name.trim(),
      name_en: plan.name_en?.trim() ?? plan.name.trim(),
    }))
    .filter((plan) => plan.sponsors.length > 0)
    .filter((plan) => plan.name.toLowerCase() !== "booth");

  return [...manualSponsorPlansBeforeApi, ...fromApi, ...manualSponsorPlansAfterApi];
});

const displayPlanName = (plan: SponsorPlan): string =>
  locale.value === "en" ? (plan.name_en ?? plan.name) : plan.name;
</script>

<template>
  <SectionContainer id="sponsors" index="04" label="Sponsors">
    <h2>{{ $t("sponsors.heading") }}</h2>
    <p>{{ $t("sponsors.description") }}</p>

    <div v-if="plans.length" class="sponsors__plans">
      <section
        v-for="plan in plans"
        :key="plan.name"
        class="sponsors__plan"
        :data-tier="plan.tier ?? 'X'"
      >
        <header class="sponsors__plan-header">
          <h3 class="sponsors__plan-name">{{ displayPlanName(plan) }}</h3>
        </header>
        <ul class="sponsors__grid">
          <li v-for="sponsor in plan.sponsors" :key="sponsor.id" class="sponsors__item">
            <Sponsor :sponsor="sponsor" />
          </li>
        </ul>
      </section>
    </div>
  </SectionContainer>
</template>

<style scoped>
.sponsors__plans {
  width: 100%;
  display: grid;
  gap: 56px;
  margin-top: 8px;
}

.sponsors__plan-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-hairline);
}

.sponsors__plan-name {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.2rem, 2.4vw, 1.6rem);
  letter-spacing: 0.02em;
  text-transform: capitalize;
  color: var(--color-ink);
}

.sponsors__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
}

/* Tier-based logo width preserves the 6:4.5:3 (≈ 4:3:2) hierarchy in vertical layout. */
.sponsors__plan[data-tier="A"] {
  --sponsor-logo-width: clamp(160px, 32vw, 280px);
}

.sponsors__plan[data-tier="B"] {
  --sponsor-logo-width: clamp(120px, 24vw, 210px);
}

.sponsors__plan[data-tier="D"] {
  --sponsor-logo-width: clamp(80px, 16vw, 140px);
}

.sponsors__item {
  display: flex;
}

.sponsors__item > :deep(.sponsor) {
  width: 100%;
}

/* PC: stack each card vertically (logo / name) and arrange cards horizontally per tier (cols 3:4:6 → widths 6:4.5:3). */
@media (min-width: 1024px) {
  .sponsors__grid {
    gap: 16px;
  }

  .sponsors__plan[data-tier="A"] .sponsors__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sponsors__plan[data-tier="B"] .sponsors__grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .sponsors__plan[data-tier="D"] .sponsors__grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
