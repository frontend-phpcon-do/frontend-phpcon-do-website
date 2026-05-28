export type SponsorItem = {
  id: string;
  name: string;
  kana?: string;
  url?: string;
  pr?: string;
  twitter?: string;
};

export type SponsorPlan = {
  name: string;
  name_en?: string;
  tier?: string;
  sponsors: SponsorItem[];
};

// Manually-managed plans rendered ABOVE the fortee API plans.
// Logo files go in public/sponsors/<id>/logo.png (same convention as fortee).
export const manualSponsorPlansBeforeApi: SponsorPlan[] = [
  {
    name: "会場スポンサー",
    name_en: "Venue Sponsor",
    tier: "A",
    sponsors: [
      {
        id: "sapporo-engineer-base",
        name: "Sapporo Engineer Base",
        pr: "Sapporo Engineer Baseは「エンジニアが集まり、成長し、活躍する都市 さっぽろ」の実現に向け市内で活躍するエンジニア・コミュニティの支援や新たなエンジニアの集積を目指す札幌市の事業です",
        url: "https://sapporo-engineer-base.dev",
      },
    ],
  },
];

// Manually-managed plans rendered BELOW the fortee API plans.
export const manualSponsorPlansAfterApi: SponsorPlan[] = [
  {
    name: "デザインスポンサー",
    name_en: "Design Sponsor",
    tier: "D",
    sponsors: [{ id: "doke", name: "doke", url: "https://x.com/doke" }],
  },
  {
    name: "会計協力",
    name_en: "Accounting Support",
    tier: "D",
    sponsors: [{ id: "local", name: "一般社団法人LOCAL", url: "https://www.local.or.jp" }],
  },
];
