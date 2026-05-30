export type IndividualSponsor = {
  name: string;
  avatarUrl?: string;
};

// 個人スポンサーのデータはここに追加してください。
// avatarUrl を省略すると、イニシャルのフォールバックアバターが表示されます。
export const individualSponsors: IndividualSponsor[] = [
  {
    name: "nobody",
    avatarUrl: "https://fortee.jp/images/avatar-blank.png",
  },
];
